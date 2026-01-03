// Test de conexión a MongoDB
import { connectToDatabase } from './src/lib/mongodb.ts';

async function testConnection() {
    console.log('🔍 Probando conexión a MongoDB Atlas...\n');

    try {
        const { db } = await connectToDatabase();
        console.log('✅ Conexión exitosa a MongoDB Atlas!');

        // Hacer un ping
        await db.admin().ping();
        console.log('✅ Ping exitoso a la base de datos');

        // Listar colecciones
        const collections = await db.listCollections().toArray();
        console.log(`\n📊 Colecciones encontradas: ${collections.length}`);
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });

        console.log('\n🎉 Todo funciona correctamente!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:');
        console.error(error);
        process.exit(1);
    }
}

testConnection();
