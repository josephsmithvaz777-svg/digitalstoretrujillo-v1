# 🚀 Guía de Deployment con Dokploy

## Requisitos Previos
- ✅ Dokploy instalado en tu VPS
- ✅ Repositorio en GitHub
- ✅ Dominio apuntando a tu VPS (opcional)

## Paso 1: Crear Base de Datos en Dokploy

1. Accede a tu panel de Dokploy: `https://tu-vps-ip:3000`
2. Ve a **Databases** → **Create Database**
3. Selecciona **PostgreSQL**
4. Configura:
   - **Name**: `ecommerce_db`
   - **Username**: `ecommerce_user`
   - **Password**: (genera una segura)
   - **Database Name**: `ecommerce`
5. Click en **Create**
6. **Guarda la URL de conexión** que aparece (la necesitarás)

Ejemplo de URL:
```
postgresql://ecommerce_user:password@postgres:5432/ecommerce
```

## Paso 2: Crear Aplicación en Dokploy

1. Ve a **Applications** → **Create Application**
2. Selecciona **GitHub Repository**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `ecommerce-astro`
   - **Branch**: `main` (o tu rama principal)
   - **Build Type**: `Dockerfile`
   - **Port**: `4321`

## Paso 3: Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```env
NODE_ENV=production
DATABASE_URL=postgresql://ecommerce_user:password@postgres:5432/ecommerce
PUBLIC_SITE_URL=https://tu-dominio.com
HOTMART_API_KEY=tu_api_key_aqui
STRIPE_SECRET_KEY=tu_stripe_key_aqui
```

## Paso 4: Configurar Dominio (Opcional)

1. Ve a la pestaña **Domains**
2. Click en **Add Domain**
3. Ingresa tu dominio: `tu-dominio.com`
4. Dokploy configurará automáticamente:
   - ✅ SSL con Let's Encrypt
   - ✅ Redirección HTTPS
   - ✅ Reverse proxy

## Paso 5: Deploy

1. Click en **Deploy**
2. Dokploy automáticamente:
   - Clonará tu repositorio
   - Construirá la imagen Docker
   - Desplegará la aplicación
   - Configurará SSL

## Paso 6: Crear Tablas en la Base de Datos

### Opción A: Desde Dokploy UI
1. Ve a **Databases** → Tu base de datos
2. Click en **Console**
3. Ejecuta el SQL de creación de tablas

### Opción B: Desde tu aplicación
Crea un archivo de migración que se ejecute al iniciar.

## SQL para Crear Tablas

```sql
-- Productos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  duration VARCHAR(50),
  category VARCHAR(100),
  badge VARCHAR(100),
  badge_color VARCHAR(50),
  gradient TEXT,
  logo_url TEXT,
  features JSONB,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuarios
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items del pedido
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
```

## Paso 7: Insertar Productos Iniciales

```sql
-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, original_price, duration, category, badge, badge_color, gradient, logo_url, features, stock, is_active)
VALUES 
('Spotify Premium', 'Plan Individual • Sin Anuncios', 2.50, 4.99, 'mes', 'streaming', '-50% OFF', 'green', 'bg-gradient-to-br from-[#1DB954] to-[#116e32]', 'https://lh3.googleusercontent.com/...', '["12 Meses", "Garantía"]'::jsonb, 100, true),
('Netflix Premium', '4K UHD • 1 Pantalla • Privado', 3.99, 9.99, 'mes', 'streaming', '-60% OFF', 'red', 'bg-gradient-to-br from-[#E50914] to-[#8c060c]', 'https://lh3.googleusercontent.com/...', '["1 Mes", "Renovable"]'::jsonb, 50, true);
-- Agregar más productos según necesites
```

## Paso 8: Verificar Deployment

1. Accede a tu aplicación: `https://tu-dominio.com`
2. Verifica que todo funcione correctamente
3. Revisa los logs en Dokploy si hay errores

## Comandos Útiles en Dokploy

### Ver Logs
- Ve a tu aplicación → **Logs**
- Logs en tiempo real del contenedor

### Rebuild
- Click en **Rebuild** para reconstruir desde cero

### Restart
- Click en **Restart** para reiniciar la aplicación

### Rollback
- Dokploy guarda versiones anteriores
- Puedes hacer rollback si algo falla

## Auto-Deploy desde GitHub

Dokploy puede configurarse para auto-deploy cuando haces push:

1. Ve a **Settings** → **GitHub Integration**
2. Activa **Auto Deploy on Push**
3. Cada vez que hagas push a `main`, se desplegará automáticamente

## Backups Automáticos

1. Ve a **Databases** → Tu base de datos
2. Click en **Backups**
3. Configura backups automáticos:
   - Frecuencia: Diaria
   - Retención: 7 días
   - Ubicación: Local o S3

## Monitoreo

Dokploy incluye monitoreo básico:
- CPU usage
- Memory usage
- Network traffic
- Logs en tiempo real

## Troubleshooting

### Error: No se puede conectar a la base de datos
- Verifica que la URL de conexión sea correcta
- Asegúrate de que el contenedor de la DB esté corriendo

### Error: Build failed
- Revisa los logs de build
- Verifica que el Dockerfile sea correcto
- Asegúrate de que todas las dependencias estén en package.json

### Error: 502 Bad Gateway
- La aplicación no está escuchando en el puerto correcto
- Verifica que el puerto en Dockerfile sea 4321
- Revisa los logs de la aplicación

## Próximos Pasos

1. ✅ Configurar dominio personalizado
2. ✅ Habilitar SSL automático
3. ✅ Configurar backups automáticos
4. ✅ Implementar CI/CD con GitHub
5. ✅ Agregar monitoreo avanzado
6. ✅ Configurar emails transaccionales
7. ✅ Implementar sistema de pagos

## Recursos

- [Documentación de Dokploy](https://docs.dokploy.com)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**¡Listo!** Tu e-commerce estará desplegado y funcionando en tu VPS con Dokploy. 🚀
