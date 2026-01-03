import { MongoClient } from 'mongodb';

const MONGODB_URI = import.meta.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = import.meta.env.MONGODB_DB || 'digitalstore';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;
let isConnecting = false;

async function createConnection(retries = 3): Promise<{ client: MongoClient; db: any }> {
    // Opciones de conexión con SSL configurado para Windows y Node.js 22
    const options: any = {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 2,
        // Deshabilitar validación estricta de SSL para desarrollo
        checkServerIdentity: () => undefined,
    };

    for (let i = 0; i < retries; i++) {
        try {
            console.log(`🔄 Intento de conexión ${i + 1}/${retries} a MongoDB Atlas...`);
            const client = await MongoClient.connect(MONGODB_URI, options);
            const db = client.db(MONGODB_DB);

            // Verificar que la conexión funciona
            await db.admin().ping();

            console.log('✅ Conectado exitosamente a MongoDB Atlas');
            return { client, db };
        } catch (error) {
            console.error(`❌ Error en intento ${i + 1}:`, error instanceof Error ? error.message : error);

            if (i === retries - 1) {
                throw error;
            }

            // Esperar antes de reintentar
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }

    throw new Error('No se pudo conectar a MongoDB después de varios intentos');
}

export async function connectToDatabase() {
    // Si ya tenemos una conexión válida, usarla
    if (cachedClient && cachedDb) {
        try {
            // Verificar que la conexión sigue activa
            await cachedDb.admin().ping();
            return { client: cachedClient, db: cachedDb };
        } catch (error) {
            console.log('⚠️ Conexión caché inválida, reconectando...');
            cachedClient = null;
            cachedDb = null;
        }
    }

    // Si ya hay una conexión en progreso, esperar
    if (isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return connectToDatabase();
    }

    // Crear nueva conexión
    isConnecting = true;
    try {
        const { client, db } = await createConnection();
        cachedClient = client;
        cachedDb = db;
        return { client, db };
    } finally {
        isConnecting = false;
    }
}

export async function getCollection(collectionName: string) {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
}
