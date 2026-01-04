import type { APIRoute } from 'astro';
import { getServerSupabase } from '../../../lib/supabase';

// GET - Obtener todos los productos activos
export const GET: APIRoute = async () => {
    try {
        console.log('🔍 API Products GET - Iniciando...');
        const supabase = getServerSupabase();
        console.log('✅ Cliente Supabase creado');

        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        console.log('📊 Resultado query:', { products, error });

        if (error) {
            console.error('❌ Error de Supabase:', error);
            throw error;
        }

        console.log(`✅ ${products?.length || 0} productos obtenidos`);
        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('❌ Error en API Products:', error);
        return new Response(
            JSON.stringify({
                error: 'Error al obtener productos',
                message: error instanceof Error ? error.message : 'Unknown error',
                details: error
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST - Crear nuevo producto
export const POST: APIRoute = async ({ request }) => {
    try {
        const product = await request.json();
        const supabase = getServerSupabase();

        const newProduct = {
            name: product.name,
            slug: product.slug,
            description: product.description || null,
            price: product.price,
            images: product.images || [],
            category: product.category,
            stock: product.stock || 0,
            is_active: product.is_active !== undefined ? product.is_active : true
        };

        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select()
            .single();

        if (error) throw error;

        return new Response(
            JSON.stringify({
                success: true,
                product: data
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating product:', error);
        return new Response(
            JSON.stringify({
                error: 'Error al crear producto',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
