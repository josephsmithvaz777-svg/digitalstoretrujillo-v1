import type { APIRoute } from 'astro';
import { getCollection } from '../../../lib/mongodb';

// GET - Obtener todas las órdenes
export const GET: APIRoute = async () => {
    try {
        const ordersCollection = await getCollection('orders');
        const orders = await ordersCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return new Response(JSON.stringify(orders), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
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
        const order = await request.json();
        const ordersCollection = await getCollection('orders');

        const newOrder = {
            ...order,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: order.status || 'pending'
        };

        const result = await ordersCollection.insertOne(newOrder);

        return new Response(
            JSON.stringify({
                success: true,
                id: result.insertedId,
                order: newOrder
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'Error al crear orden',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
