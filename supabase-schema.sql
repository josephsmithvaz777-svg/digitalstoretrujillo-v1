-- Esquema de base de datos para ecommerce
-- Ejecuta este SQL en Supabase SQL Editor

-- ============================================
-- TABLA: products (Productos)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    images TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);

-- ============================================
-- TABLA: orders (Órdenes)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL,
    total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas para products
-- Todos pueden leer productos activos
CREATE POLICY "Anyone can read active products"
    ON products FOR SELECT
    USING (is_active = true);

-- Solo admins pueden insertar/actualizar/eliminar productos
-- (Necesitarás crear una tabla de roles o usar claims en JWT)
CREATE POLICY "Service role can manage products"
    ON products FOR ALL
    USING (auth.role() = 'service_role');

-- Políticas para orders
-- Los usuarios solo pueden ver sus propias órdenes
CREATE POLICY "Users can read own orders"
    ON orders FOR SELECT
    USING (auth.uid() = user_id);

-- Los usuarios pueden crear órdenes
CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Service role puede gestionar todas las órdenes
CREATE POLICY "Service role can manage all orders"
    ON orders FOR ALL
    USING (auth.role() = 'service_role');

-- ============================================
-- DATOS DE EJEMPLO (Opcional)
-- ============================================

-- Insertar algunos productos de ejemplo
INSERT INTO products (name, slug, description, price, category, stock, images) VALUES
('Laptop Gaming Pro', 'laptop-gaming-pro', 'Laptop de alto rendimiento para gaming', 1299.99, 'electronics', 15, ARRAY['https://via.placeholder.com/400']),
('Mouse Inalámbrico', 'mouse-inalambrico', 'Mouse ergonómico inalámbrico', 29.99, 'accessories', 50, ARRAY['https://via.placeholder.com/400']),
('Teclado Mecánico RGB', 'teclado-mecanico-rgb', 'Teclado mecánico con iluminación RGB', 89.99, 'accessories', 30, ARRAY['https://via.placeholder.com/400']),
('Monitor 4K 27"', 'monitor-4k-27', 'Monitor 4K UHD de 27 pulgadas', 399.99, 'electronics', 20, ARRAY['https://via.placeholder.com/400']),
('Auriculares Gaming', 'auriculares-gaming', 'Auriculares con sonido envolvente 7.1', 79.99, 'accessories', 40, ARRAY['https://via.placeholder.com/400'])
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- STORAGE BUCKETS (Para imágenes)
-- ============================================

-- Crear bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Política de storage: Todos pueden leer
CREATE POLICY "Public can read product images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'products');

-- Solo service role puede subir imágenes
CREATE POLICY "Service role can upload product images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'products' AND auth.role() = 'service_role');
