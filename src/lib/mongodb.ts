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

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export async function getCollection(collectionName: string) {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
}
