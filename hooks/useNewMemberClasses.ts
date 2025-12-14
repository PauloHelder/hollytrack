import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Member } from '../types';
import { NewMemberClass, ClassLesson } from '../components/NewMemberClassDetails';

export const useNewMemberClasses = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchClasses = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('new_member_classes')
                .select(`
                    *,
                    new_member_lessons (*),
                    new_member_class_students (
                        member: members (*)
                    )
                `)
                .order('start_date', { ascending: false });

            if (error) throw error;

            if (!data) return [];

            return data.map((cls: any) => ({
                id: cls.id,
                name: cls.name,
                startDate: cls.start_date,
                status: cls.status || 'Em Andamento',
                lessons: cls.new_member_lessons.map((l: any) => ({
                    id: l.id,
                    title: l.title,
                    date: l.date,
                    completed: l.completed,
                    attendanceCount: 0 // logic to count can be added if we fetch attendance too
                })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()),
                students: cls.new_member_class_students.map((s: any) => s.member)
            }));
        } catch (err: any) {
            console.error('Erro ao buscar turmas:', err);
            setError(err.message);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const createClass = async (name: string, startDate: string, status: string = 'Em Andamento') => {
        try {
            setLoading(true);
            // 1. Create Class
            const { data: classData, error: classError } = await supabase
                .from('new_member_classes')
                .insert([{ name, start_date: startDate, status }])
                .select()
                .single();

            if (classError) throw classError;

            // 2. Create 8 default lessons
            const startDateObj = new Date(startDate);
            const lessons = Array.from({ length: 8 }).map((_, i) => {
                const lessonDate = new Date(startDateObj);
                lessonDate.setDate(startDateObj.getDate() + (i * 7));
                return {
                    class_id: classData.id,
                    title: `Aula ${i + 1}: Tema a definir`,
                    date: lessonDate.toISOString(),
                    completed: false
                };
            });

            const { error: lessonsError } = await supabase
                .from('new_member_lessons')
                .insert(lessons);

            if (lessonsError) throw lessonsError;

            return classData;
        } catch (err: any) {
            console.error('Erro ao criar turma:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateClass = async (id: number, updates: { name?: string; startDate?: string; status?: string }) => {
        try {
            setLoading(true);
            const dbUpdates: any = {};
            if (updates.name) dbUpdates.name = updates.name;
            if (updates.startDate) dbUpdates.start_date = updates.startDate;
            if (updates.status) dbUpdates.status = updates.status;

            const { data, error } = await supabase
                .from('new_member_classes')
                .update(dbUpdates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (err: any) {
            console.error('Erro ao atualizar turma:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async (classId: number, memberId: string | number) => {
        try {
            const { error } = await supabase
                .from('new_member_class_students')
                .insert([{ class_id: classId, member_id: memberId }]);

            if (error) throw error;
        } catch (err: any) {
            console.error('Erro ao adicionar aluno:', err);
            throw err;
        }
    };

    const getAttendance = async (lessonId: number) => {
        try {
            const { data, error } = await supabase
                .from('new_member_attendance')
                .select('*')
                .eq('lesson_id', lessonId);

            if (error) throw error;
            return data;
        } catch (err: any) {
            console.error('Erro ao buscar presença:', err);
            throw err;
        }
    };

    const saveAttendance = async (lessonId: number, presentIds: (string | number)[], summaryDoneIds: (string | number)[]) => {
        try {
            // Upsert attendance
            // Since we have multiple fields (present, summary_done), simplest is to allow upsert matching lesson_id and member_id
            // We need to construct records for ALL students that have either present OR summary OR neither (to clear?)
            // Actually, the UI passes lists of "present" and "summaryDone".

            // First, let's just handle "present" and "summary" updates.
            // We can iterate over the union of IDs or just handle them.

            // A better approach for bulk update might be to delete previous for this lesson and re-insert?
            // Or upsert.

            // Let's assume we want to save records for students who are present OR have summary done.
            // If a student is neither, we might delete their record or set both to false.

            const distinctIds = Array.from(new Set([...presentIds, ...summaryDoneIds]));

            const upsertData = distinctIds.map(id => ({
                lesson_id: lessonId,
                member_id: id,
                present: presentIds.includes(id),
                summary_done: summaryDoneIds.includes(id)
            }));

            //  We first delete existing for this lesson to clean up unchecks?
            //  Or use upsert. If we use upsert, we need to handle "unchecking" (removing presence).
            //  Ideally we upsert for ALL students in the class, setting false if not in list.
            //  But to save bandwidth, maybe delete all for lesson and insert new ones is easier if the count is small.

            await supabase.from('new_member_attendance').delete().eq('lesson_id', lessonId);

            if (upsertData.length > 0) {
                const { error } = await supabase
                    .from('new_member_attendance')
                    .insert(upsertData);
                if (error) throw error;
            }

            // Also update lesson completion status potentially?
            const { error: lessonError } = await supabase
                .from('new_member_lessons')
                .update({ completed: true }) // Mark as completed if attendance saved? Or explicit toggle?
                .eq('id', lessonId);
            if (lessonError) throw lessonError;

        } catch (err: any) {
            console.error('Erro ao salvar presença:', err);
            throw err;
        }
    };

    const getClass = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('new_member_classes')
                .select(`
                    *,
                    new_member_lessons (*),
                    new_member_class_students (
                        member: members (*)
                    )
                `)
                .eq('id', id)
                .single();

            if (error) throw error;

            return {
                id: data.id,
                name: data.name,
                startDate: data.start_date,
                status: data.status || 'Em Andamento',
                lessons: data.new_member_lessons.map((l: any) => ({
                    id: l.id,
                    title: l.title,
                    date: l.date,
                    completed: l.completed,
                    attendanceCount: 0
                })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()),
                students: data.new_member_class_students.map((s: any) => s.member)
            };
        } catch (err: any) {
            console.error('Erro ao buscar turma:', err);
            throw err;
        }
    };

    return {
        loading,
        error,
        fetchClasses,
        getClass,
        createClass,
        updateClass,
        addStudent,
        getAttendance,
        saveAttendance
    };
};
