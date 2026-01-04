import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno (soporta tanto frontend como backend)
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://vmbupmwlyfjmxjmenyid.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYnVwbXdseWZqbXhqbWVueWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTQ3NDMsImV4cCI6MjA4MzEzMDc0M30.A7aVUEhr_QvHAz1lDuBdqxSzXtb5cA5lZmntZ1STS9w';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Cliente de Supabase para el frontend (usa anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Para uso en el servidor (API routes), usa la service role key
export function getServerSupabase() {
    const serviceRoleKey = import.meta.env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYnVwbXdseWZqbXhqbWVueWlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzU1NDc0MywiZXhwIjoyMDgzMTMwNzQzfQ.7ajyT1mHiyc-NH6f0nB9rCXWeNquoyWReCm8T_SKnoo';

    if (!serviceRoleKey) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. Required for server-side operations.');
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

// Tipos de base de datos (se generarán automáticamente después)
export type Database = {
    public: {
        Tables: {
            products: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    price: number;
                    images: string[];
                    category: string;
                    stock: number;
                    is_active: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['products']['Insert']>;
            };
            orders: {
                Row: {
                    id: string;
                    user_id: string;
                    order_number: string;
                    items: any[];
                    total: number;
                    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
                    shipping_address: any;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['orders']['Insert']>;
            };
        };
    };
};
