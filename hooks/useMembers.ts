
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Member } from '../types';

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('members')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                const mappedMembers: Member[] = data.map((m: any) => ({
                    id: m.id,
                    name: m.name,
                    email: m.email || '',
                    avatar: m.avatar_url || `https://ui-avatars.com/api/?name=${m.name}&background=random`,
                    phone: m.phone || '',
                    groups: m.groups || [],
                    joinDate: m.join_date,
                    status: m.status,
                }));
                setMembers(mappedMembers);
            }
        } catch (err: any) {
            console.error('Erro ao buscar membros:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addMember = async (member: Omit<Member, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('members')
                .insert([{
                    name: member.name,
                    email: member.email,
                    phone: member.phone,
                    avatar_url: member.avatar,
                    groups: member.groups,
                    join_date: member.joinDate,
                    status: member.status
                }])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                // Refresh list properly to ensure sync
                await fetchMembers();
                return data; // Return created member data implies success
            }
        } catch (err: any) {
            console.error('Erro ao adicionar membro:', err);
            throw err;
        }
    };

    const updateMember = async (id: number | string, updates: Partial<Member>) => {
        try {
            // Map frontend fields to DB columns
            const dbUpdates: any = {};

            if (updates.name) dbUpdates.name = updates.name;
            if (updates.email) dbUpdates.email = updates.email;
            if (updates.phone) dbUpdates.phone = updates.phone;
            if (updates.avatar) dbUpdates.avatar_url = updates.avatar;
            if (updates.groups) dbUpdates.groups = updates.groups;
            if (updates.joinDate) dbUpdates.join_date = updates.joinDate;
            if (updates.status) dbUpdates.status = updates.status;

            const { error } = await supabase
                .from('members')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;

            await fetchMembers();
        } catch (err: any) {
            console.error('Erro ao atualizar membro:', err);
            throw err;
        }
    };

    const deleteMember = async (id: number | string) => {
        try {
            const { error } = await supabase
                .from('members')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMembers(current => current.filter(m => m.id !== id));
        } catch (err: any) {
            console.error('Erro ao excluir membro:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return {
        members,
        loading,
        error,
        fetchMembers,
        addMember,
        updateMember,
        deleteMember
    };
};
