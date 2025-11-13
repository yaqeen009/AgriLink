import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// for dev only 
export const checkSupabaseConnection = async () => {
  if (import.meta.env.DEV) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1);
      if (error) throw error;
      console.log('✅ Supabase connection successful:', data);
    } catch (err) {
      console.error('❌ Supabase connection failed:', err.message);
    }
  }
};