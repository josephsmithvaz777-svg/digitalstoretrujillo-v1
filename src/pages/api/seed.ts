import type { APIRoute } from 'astro';
import { getCollection } from '../../lib/mongodb';
import { products } from '../../data/products';
import { orders } from '../../data/orders';

export const POST: APIRoute = async () => {
    try {
        // Poblar productos
        const productsCollection = await getCollection('products');
        await productsCollection.deleteMany({}); // Limpiar colección
        await productsCollection.insertMany(products as any);

        // Poblar órdenes
        const ordersCollection = await getCollection('orders');
        await ordersCollection.deleteMany({}); // Limpiar colección
        await ordersCollection.insertMany(orders as any);

        return new Response(
            JSON.stringify({
                success: true,
                message: 'Base de datos poblada exitosamente',
                stats: {
                    products: products.length,
                    orders: orders.length
                }
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'Error al poblar la base de datos',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};

export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            message: 'Usa POST para poblar la base de datos',
            endpoint: '/api/seed',
            method: 'POST'
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
};
