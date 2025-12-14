
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Department } from '../types';

export const useDepartments = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDepartments = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('departments')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                const mappedDepts: Department[] = data.map((d: any) => ({
                    id: d.id,
                    name: d.name,
                    leader: d.leader || '',
                    membersCount: d.members_count || 0,
                    description: d.description || '',
                    nextMeeting: d.next_meeting || '',
                    budget: d.budget
                }));
                setDepartments(mappedDepts);
            }
        } catch (err: any) {
            console.error('Erro ao buscar departamentos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addDepartment = async (dept: Omit<Department, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('departments')
                .insert([{
                    name: dept.name,
                    leader: dept.leader,
                    members_count: dept.membersCount,
                    description: dept.description,
                    next_meeting: dept.nextMeeting,
                    budget: dept.budget
                }])
                .select()
                .single();

            if (error) throw error;
            await fetchDepartments();
            return data;
        } catch (err: any) {
            console.error('Erro ao adicionar departamento:', err);
            throw err;
        }
    };

    const updateDepartment = async (id: number, updates: Partial<Department>) => {
        try {
            const dbUpdates: any = {};
            if (updates.name) dbUpdates.name = updates.name;
            if (updates.leader) dbUpdates.leader = updates.leader;
            if (updates.membersCount !== undefined) dbUpdates.members_count = updates.membersCount;
            if (updates.description) dbUpdates.description = updates.description;
            if (updates.nextMeeting) dbUpdates.next_meeting = updates.nextMeeting;
            if (updates.budget) dbUpdates.budget = updates.budget;

            const { error } = await supabase
                .from('departments')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;
            await fetchDepartments();
        } catch (err: any) {
            console.error('Erro ao atualizar departamento:', err);
            throw err;
        }
    };

    const deleteDepartment = async (id: number) => {
        try {
            const { error } = await supabase
                .from('departments')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setDepartments(current => current.filter(d => d.id !== id));
        } catch (err: any) {
            console.error('Erro ao excluir departamento:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    return {
        departments,
        loading,
        error,
        fetchDepartments,
        addDepartment,
        updateDepartment,
        deleteDepartment
    };
};
