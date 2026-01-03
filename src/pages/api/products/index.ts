import type { APIRoute } from 'astro';
import { getCollection } from '../../../lib/mongodb';

// GET - Obtener todos los productos
export const GET: APIRoute = async () => {
    try {
        const productsCollection = await getCollection('products');
        const products = await productsCollection.find({ isActive: true }).toArray();

        return new Response(JSON.stringify(products), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'Error al obtener productos',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

// POST - Crear nuevo producto
export const POST: APIRoute = async ({ request }) => {
    try {
        const product = await request.json();
        const productsCollection = await getCollection('products');

        const newProduct = {
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        };

        const result = await productsCollection.insertOne(newProduct);

        return new Response(
            JSON.stringify({
                success: true,
                id: result.insertedId,
                product: newProduct
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'Error al crear producto',
                message: error instanceof Error ? error.message : 'Unknown error'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
