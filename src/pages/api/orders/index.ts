import type { APIRoute } from 'astro';
import { getServerSupabase } from '../../../lib/supabase';

// GET - Obtener todas las órdenes
export const GET: APIRoute = async ({ request }) => {
    try {
        const supabase = getServerSupabase();

        // Obtener user_id del header de autenticación si existe
        const authHeader = request.headers.get('Authorization');
        let query = supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        // Si hay autenticación, filtrar por usuario
        // De lo contrario, devolver todas (solo para admin/service role)

        const { data: orders, error } = await query;

        if (error) throw error;

        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(
            JSON.stringify({
                error: 'Error al obtener órdenes',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST - Crear nueva orden
export const POST: APIRoute = async ({ request }) => {
    try {
        const orderData = await request.json();
        const supabase = getServerSupabase();

        // Generar número de orden único
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const newOrder = {
            user_id: orderData.user_id, // Debe venir del usuario autenticado
            order_number: orderNumber,
            items: orderData.items,
            total: orderData.total,
            status: orderData.status || 'pending',
            shipping_address: orderData.shipping_address
        };

        const { data, error } = await supabase
            .from('orders')
            .insert([newOrder])
            .select()
            .single();

        if (error) throw error;

        return new Response(
            JSON.stringify({
                success: true,
                order: data
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(
            JSON.stringify({
                error: 'Error al crear orden',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
