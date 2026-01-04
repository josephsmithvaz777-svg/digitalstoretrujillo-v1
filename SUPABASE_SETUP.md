# 🚀 Configuración de Supabase - Guía Completa

## ✅ Pasos completados:

1. ✅ Instalado `@supabase/supabase-js`
2. ✅ Creado cliente de Supabase (`src/lib/supabase.ts`)
3. ✅ Generado esquema SQL (`supabase-schema.sql`)
4. ✅ Migradas APIs de productos y órdenes

---

## 📋 Próximos pasos:

### **1. Actualizar tu archivo `.env`**

Copia el contenido de `.env.example` a tu `.env` y actualiza con tus credenciales:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://vmbupmwlyfjmxjmenyid.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_8Y2H1QNlfybv0DXUg7YAzA_poWAGmnI
```

### **2. Crear las tablas en Supabase**

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto: `vmbupmwlyfjmxjmenyid`
3. Ve a **SQL Editor**
4. Copia y pega todo el contenido de `supabase-schema.sql`
5. Click en **Run** para ejecutar el SQL

Esto creará:
- ✅ Tabla `products` con índices
- ✅ Tabla `orders` con índices
- ✅ Row Level Security (RLS)
- ✅ Storage bucket para imágenes
- ✅ 5 productos de ejemplo

### **3. Probar las APIs**

Una vez creadas las tablas, prueba las APIs:

```bash
# Obtener productos
curl http://localhost:4321/api/products

# Crear un producto (requiere service role)
curl -X POST http://localhost:4321/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto de prueba",
    "slug": "producto-prueba",
    "description": "Descripción del producto",
    "price": 99.99,
    "category": "test",
    "stock": 10
  }'
```

---

## 📊 Estructura de la base de datos:

### **Tabla: products**
```sql
- id (UUID, PK)
- name (TEXT)
- slug (TEXT, UNIQUE)
- description (TEXT)
- price (DECIMAL)
- images (TEXT[])
- category (TEXT)
- stock (INTEGER)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **Tabla: orders**
```sql
- id (UUID, PK)
- user_id (UUID, FK → auth.users)
- order_number (TEXT, UNIQUE)
- items (JSONB)
- total (DECIMAL)
- status (TEXT)
- shipping_address (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔐 Seguridad (Row Level Security)

Las tablas tienen RLS habilitado:

- **Products**: Todos pueden leer productos activos
- **Orders**: Los usuarios solo ven sus propias órdenes
- **Service Role**: Acceso completo a todo

---

## 📁 Storage para imágenes

Bucket creado: `products`

**Subir imagen:**
```typescript
import { supabase } from './lib/supabase';

const { data, error } = await supabase.storage
  .from('products')
  .upload('producto-1.jpg', file);
```

**URL pública:**
```typescript
const url = supabase.storage
  .from('products')
  .getPublicUrl('producto-1.jpg').data.publicUrl;
```

---

## 🎯 Siguiente paso:

**Ejecuta el SQL en Supabase Dashboard** para crear las tablas y luego prueba las APIs.

¿Necesitas ayuda con algún paso?
