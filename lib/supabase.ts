
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Erro Crítico: As variáveis de ambiente do Supabase estão faltando!');
    console.error('Certifique-se de que o arquivo .env.local existe e contém VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY');
}

// Fallback prevent crash on empty/invalid url constructor
const validUrl = supabaseUrl || 'https://placeholder.supabase.co';
const validKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(validUrl, validKey);
