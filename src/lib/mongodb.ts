import { MongoClient } from 'mongodb';

const MONGODB_URI = import.meta.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = import.meta.env.MONGODB_DB || 'digitalstore';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    // Opciones de conexión con SSL configurado para Windows y Node.js 22
    const options: any = {
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        // Deshabilitar validación estricta de SSL para desarrollo
        checkServerIdentity: () => undefined,
    };

    try {
        const client = await MongoClient.connect(MONGODB_URI, options);
        const db = client.db(MONGODB_DB);

        cachedClient = client;
        cachedDb = db;

        console.log('✅ Conectado exitosamente a MongoDB Atlas');
        return { client, db };
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        throw error;
    }
}


export async function getCollection(collectionName: string) {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
}
