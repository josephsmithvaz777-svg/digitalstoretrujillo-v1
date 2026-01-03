import type { APIRoute } from 'astro';
import { connectToDatabase } from '../../lib/mongodb';

export const GET: APIRoute = async () => {
    try {
        // Intentar conectar a MongoDB
        const { db } = await connectToDatabase();

        // Hacer un ping simple
        await db.admin().ping();

        return new Response(
            JSON.stringify({
                status: 'ok',
                database: 'connected',
                timestamp: new Date().toISOString(),
                environment: import.meta.env.MODE
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                status: 'error',
                database: 'disconnected',
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
};
