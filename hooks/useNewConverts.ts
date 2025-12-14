
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { NewConvert } from '../types';

export const useNewConverts = () => {
    const [converts, setConverts] = useState<NewConvert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConverts = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('new_converts')
                .select('*')
                .order('name');

            if (error) throw error;

            if (data) {
                const mappedConverts: NewConvert[] = data.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    email: c.email || '',
                    phone: c.phone || '',
                    conversionDate: c.conversion_date,
                    status: c.status,
                    avatar: c.avatar_url || `https://ui-avatars.com/api/?name=${c.name}&background=random`
                }));
                setConverts(mappedConverts);
            }
        } catch (err: any) {
            console.error('Erro ao buscar novos convertidos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addConvert = async (convert: Omit<NewConvert, 'id'>) => {
        try {
            const { data, error } = await supabase
                .from('new_converts')
                .insert([{
                    name: convert.name,
                    email: convert.email,
                    phone: convert.phone,
                    conversion_date: convert.conversionDate,
                    status: convert.status,
                    avatar_url: convert.avatar
                }])
                .select()
                .single();

            if (error) throw error;
            await fetchConverts();
            return data;
        } catch (err: any) {
            console.error('Erro ao adicionar novo convertido:', err);
            throw err;
        }
    };

    const updateConvert = async (id: number | string, updates: Partial<NewConvert>) => {
        try {
            const dbUpdates: any = {};
            if (updates.name) dbUpdates.name = updates.name;
            if (updates.email) dbUpdates.email = updates.email;
            if (updates.phone) dbUpdates.phone = updates.phone;
            if (updates.conversionDate) dbUpdates.conversion_date = updates.conversionDate;
            if (updates.status) dbUpdates.status = updates.status;
            if (updates.avatar) dbUpdates.avatar_url = updates.avatar;

            const { error } = await supabase
                .from('new_converts')
                .update(dbUpdates)
                .eq('id', id);

            if (error) throw error;
            await fetchConverts();
        } catch (err: any) {
            console.error('Erro ao atualizar novo convertido:', err);
            throw err;
        }
    };

    const deleteConvert = async (id: number | string) => {
        try {
            const { error } = await supabase
                .from('new_converts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setConverts(current => current.filter(c => c.id !== id));
        } catch (err: any) {
            console.error('Erro ao excluir novo convertido:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchConverts();
    }, [fetchConverts]);

    return {
        converts,
        loading,
        error,
        fetchConverts,
        addConvert,
        updateConvert,
        deleteConvert
    };
};
