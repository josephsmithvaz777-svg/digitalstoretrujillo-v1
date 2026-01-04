// Test de conexión a Supabase con las nuevas keys
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vmbupmwlyfjmxjmenyid.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYnVwbXdseWZqbXhqbWVueWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTQ3NDMsImV4cCI6MjA4MzEzMDc0M30.A7aVUEhr_QvHAz1lDuBdqxSzXtb5cA5lZmntZ1STS9w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔍 Probando conexión a Supabase...\n');

async function testSupabase() {
    try {
        // 1. Test de conexión básica
        console.log('1️⃣ Probando conexión básica...');
        const { data: healthCheck, error: healthError } = await supabase
            .from('products')
            .select('count')
            .limit(1);

        if (healthError) throw healthError;
        console.log('   ✅ Conexión exitosa\n');

        // 2. Obtener productos
        console.log('2️⃣ Obteniendo productos...');
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*')
            .eq('is_active', true);

        if (productsError) throw productsError;
        console.log(`   ✅ ${products.length} productos encontrados:`);
        products.forEach(p => {
            console.log(`      📦 ${p.name} - $${p.price} (Stock: ${p.stock})`);
        });
        console.log('');

        // 3. Test de Storage
        console.log('3️⃣ Probando Storage...');
        const { data: buckets, error: bucketsError } = await supabase
            .storage
            .listBuckets();

        if (bucketsError) throw bucketsError;
        console.log(`   ✅ ${buckets.length} buckets encontrados:`);
        buckets.forEach(b => {
            console.log(`      📁 ${b.name} (${b.public ? 'público' : 'privado'})`);
        });
        console.log('');

        // 4. Resumen
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎉 ¡TODO FUNCIONA CORRECTAMENTE!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n✅ Supabase está configurado y funcionando');
        console.log('✅ Base de datos accesible');
        console.log('✅ Tablas creadas correctamente');
        console.log('✅ Storage configurado');
        console.log('\n🚀 Listo para desarrollar tu ecommerce!\n');

    } catch (error) {
        console.error('\n❌ ERROR:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error(error.message);
        console.error('\n💡 Posibles causas:');
        console.error('   1. Verifica que ejecutaste el SQL en Supabase Dashboard');
        console.error('   2. Confirma que las credenciales en .env son correctas');
        console.error('   3. Revisa que las tablas se crearon sin errores\n');
        process.exit(1);
    }
}

testSupabase();
