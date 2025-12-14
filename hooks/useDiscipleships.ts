
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { DiscipleshipGroup } from '../types';

export const useDiscipleships = () => {
    const [groups, setGroups] = useState<DiscipleshipGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGroups = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('discipleship_groups')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                const mappedGroups: DiscipleshipGroup[] = data.map((g: any) => ({
                    id: g.id,
                    name: g.name,
                    leader: g.leader || '',
                    meetingDay: g.meeting_day || '',
                    meetingTime: g.meeting_time || '',
                    location: g.location || '',
                    membersCount: g.members_count || 0,
                    targetAudience: g.target_audience || ''
                }));
                setGroups(mappedGroups);
            }
        } catch (err: any) {
            console.error('Erro ao buscar grupos de discipulado:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addGroup = async (group: Omit<DiscipleshipGroup, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('discipleship_groups')
                .insert([{
                    name: group.name,
                    leader: group.leader,
                    meeting_day: group.meetingDay,
                    meeting_time: group.meetingTime,
                    location: group.location,
                    members_count: group.membersCount,
                    target_audience: group.targetAudience
                }])
                .select()
                .single();

            if (error) throw error;
            await fetchGroups();
            return data;
        } catch (err: any) {
            console.error('Erro ao adicionar grupo:', err);
            throw err;
        }
    };

    const updateGroup = async (id: number | string, updates: Partial<DiscipleshipGroup>) => {
        try {
            const dbUpdates: any = {};
            if (updates.name) dbUpdates.name = updates.name;
            if (updates.leader) dbUpdates.leader = updates.leader;
            if (updates.meetingDay) dbUpdates.meeting_day = updates.meetingDay;
            if (updates.meetingTime) dbUpdates.meeting_time = updates.meetingTime;
            if (updates.location) dbUpdates.location = updates.location;
            if (updates.membersCount !== undefined) dbUpdates.members_count = updates.membersCount;
            if (updates.targetAudience) dbUpdates.target_audience = updates.targetAudience;

            const { error } = await supabase
                .from('discipleship_groups')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;
            await fetchGroups();
        } catch (err: any) {
            console.error('Erro ao atualizar grupo:', err);
            throw err;
        }
    };

    const deleteGroup = async (id: number | string) => {
        try {
            const { error } = await supabase
                .from('discipleship_groups')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setGroups(current => current.filter(g => g.id !== id));
        } catch (err: any) {
            console.error('Erro ao excluir grupo:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);



    const addMembersToGroup = useCallback(async (groupId: number | string, memberIds: (number | string)[]) => {
        try {
            const records = memberIds.map(memberId => ({
                group_id: groupId,
                member_id: memberId,
                role: 'Participante'
            }));

            const { error } = await supabase
                .from('discipleship_members')
                .insert(records);

            if (error) throw error;
        } catch (err: any) {
            console.error('Erro ao adicionar membros ao grupo:', err);
            throw err;
        }
    }, []);

    const getGroupMembers = useCallback(async (groupId: number | string) => {
        try {
            const { data, error } = await supabase
                .from('discipleship_members')
                .select(`
                    member_id,
                    role,
                    members (
                        id,
                        name,
                        email,
                        avatar_url
                    )
                `)
                .eq('group_id', groupId);

            if (error) throw error;
            return data.map((d: any) => ({
                ...d.members,
                role: d.role
            }));
        } catch (err: any) {
            console.error('Erro ao buscar membros do grupo:', err);
            throw err;
        }
    }, []);

    const removeMemberFromGroup = useCallback(async (groupId: number | string, memberId: number | string) => {
        try {
            const { error } = await supabase
                .from('discipleship_members')
                .delete()
                .match({ group_id: groupId, member_id: memberId });

            if (error) throw error;
        } catch (err: any) {
            console.error('Erro ao remover membro do grupo:', err);
            throw err;
        }
    }, []);


    const saveSession = useCallback(async (groupId: number | string, data: { id?: number; date: string; lessonName: string; presentMemberIds: (number | string)[] }) => {
        try {
            let sessionId = data.id;

            if (sessionId) {
                // Update existing session
                const { error: sessionError } = await supabase
                    .from('discipleship_sessions')
                    .update({
                        date: data.date,
                        lesson_name: data.lessonName
                    })
                    .eq('id', sessionId);

                if (sessionError) throw sessionError;

                // For simplicity, delete all attendance and re-insert (or optimize later)
                await supabase.from('discipleship_attendance').delete().eq('session_id', sessionId);
            } else {
                // Create new session
                const { data: sessionData, error: sessionError } = await supabase
                    .from('discipleship_sessions')
                    .insert([{
                        group_id: groupId,
                        date: data.date,
                        lesson_name: data.lessonName
                    }])
                    .select()
                    .single();

                if (sessionError) throw sessionError;
                sessionId = sessionData.id;
            }

            if (data.presentMemberIds.length > 0) {
                const attendanceRecords = data.presentMemberIds.map(memberId => ({
                    session_id: sessionId,
                    member_id: memberId,
                    status: 'Presente'
                }));

                const { error: attendanceError } = await supabase
                    .from('discipleship_attendance')
                    .insert(attendanceRecords);

                if (attendanceError) throw attendanceError;
            }

            return sessionId;

        } catch (err: any) {
            console.error('Erro ao salvar chamada:', err);
            throw err;
        }
    }, []);

    const getGroupSessions = useCallback(async (groupId: number | string) => {
        try {
            const { data, error } = await supabase
                .from('discipleship_sessions')
                .select(`
                    *,
                    discipleship_attendance (
                        member_id
                    )
                `)
                .eq('group_id', groupId)
                .order('date', { ascending: false });

            if (error) throw error;

            return data.map((session: any) => ({
                id: session.id,
                date: session.date,
                lessonName: session.lesson_name,
                presentMemberIds: session.discipleship_attendance.map((a: any) => a.member_id),
                totalMembers: 0 // This needs to be calculated or passed from context, or we can fetch group distinct members count
            }));
        } catch (err: any) {
            console.error('Erro ao buscar histórico de chamadas:', err);
            throw err;
        }
    }, []);

    return {
        groups,
        loading,
        error,
        fetchGroups,
        addGroup,
        updateGroup,
        deleteGroup,
        addMembersToGroup,
        getGroupMembers,
        removeMemberFromGroup,
        saveSession,
        getGroupSessions
    };
};
