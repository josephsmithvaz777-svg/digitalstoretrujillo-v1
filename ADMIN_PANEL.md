# 📊 Panel de Administración - DigitalStore

## Descripción General

El panel de administración de DigitalStore es una interfaz completa para gestionar tu tienda de productos digitales. Incluye gestión de productos, órdenes, clientes y estadísticas en tiempo real.

## 🎯 Características Principales

### 1. **Dashboard Principal** (`/dashboard`)
- Vista general de métricas clave
- Ingresos totales, suscriptores activos
- Ventas por método de pago (Hotmart y Crypto)
- Acciones rápidas
- Registro de actividad en tiempo real

### 2. **Gestión de Órdenes** (`/dashboard/ordenes`)
- ✅ Tabla completa de todas las órdenes
- 📊 Estadísticas de órdenes (Total, Completadas, Pendientes, Ingresos)
- 🔍 Filtros por estado y método de pago
- 💳 Indicadores visuales de método de pago (Crypto/Hotmart)
- 📅 Ordenamiento por fecha
- 👁️ Vista detallada de cada orden
- ✏️ Edición de estado de órdenes

**Estados de Órdenes:**
- `completed` - Completado (verde)
- `pending` - Pendiente (amarillo)
- `failed` - Fallido (rojo)
- `refunded` - Reembolsado (gris)

**Métodos de Pago:**
- `crypto` - Criptomonedas (morado)
- `hotmart` - Hotmart (naranja)

### 3. **Gestión de Productos** (`/dashboard/productos`)
- 📦 Vista de tabla con todos los productos
- 📊 Estadísticas de inventario (Total productos, Activos, Stock total)
- 🏷️ Categorización por tipo (Streaming, Creative, Software, Security)
- 💰 Precios con descuentos visuales
- 📈 Indicadores de stock
- ➕ Crear nuevos productos
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos

**Categorías de Productos:**
- `streaming` - Servicios de streaming (rojo)
- `creative` - Herramientas creativas (morado)
- `software` - Software general (azul)
- `security` - Seguridad y VPN (verde)

## 📁 Estructura de Archivos

```
src/
├── data/
│   ├── products.ts      # Modelo y datos de productos
│   └── orders.ts        # Modelo y datos de órdenes (NUEVO)
├── pages/
│   ├── dashboard.astro  # Dashboard principal
│   └── dashboard/
│       ├── ordenes.astro    # Gestión de órdenes (NUEVO)
│       └── productos.astro  # Gestión de productos
└── components/
    ├── Header.astro
    ├── Footer.astro
    └── ProductCard.astro
```

## 🗄️ Modelos de Datos

### Order (Orden)
```typescript
interface Order {
    id: string;                    // ID único de la orden
    customerName: string;          // Nombre del cliente
    customerEmail: string;         // Email del cliente
    productId: string;             // ID del producto
    productName: string;           // Nombre del producto
    amount: number;                // Monto de la orden
    paymentMethod: 'crypto' | 'hotmart';  // Método de pago
    status: 'pending' | 'completed' | 'failed' | 'refunded';  // Estado
    createdAt: Date;               // Fecha de creación
    updatedAt: Date;               // Última actualización
    deliveryEmail?: string;        // Email de entrega (opcional)
    transactionId?: string;        // ID de transacción (opcional)
}
```

### Product (Producto)
```typescript
interface Product {
    id: string;                    // ID único del producto
    name: string;                  // Nombre del producto
    description: string;           // Descripción corta
    price: number;                 // Precio actual
    originalPrice?: number;        // Precio original (opcional)
    duration: string;              // Duración (mes, año)
    badge?: string;                // Etiqueta promocional
    badgeColor?: string;           // Color de la etiqueta
    gradient: string;              // Gradiente de color
    logo?: string;                 // URL del logo
    features: string[];            // Características
    category: string;              // Categoría
    stock: number;                 // Stock disponible
    isActive: boolean;             // Estado activo/inactivo
    createdAt: Date;               // Fecha de creación
}
```

## 🎨 Diseño y UX

### Características de Diseño:
- ✨ **Modo Oscuro Completo** - Soporte nativo para tema oscuro
- 📱 **Responsive Design** - Optimizado para móvil, tablet y desktop
- 🎯 **Navegación Intuitiva** - Sidebar con iconos Material Symbols
- 📊 **Tarjetas de Estadísticas** - Métricas visuales con iconos
- 🎨 **Sistema de Colores Consistente** - Paleta de colores profesional
- ⚡ **Transiciones Suaves** - Animaciones y efectos hover

### Paleta de Colores:
- **Primary**: `#6366f1` (Indigo)
- **Success**: Verde para estados completados
- **Warning**: Amarillo para estados pendientes
- **Error**: Rojo para estados fallidos
- **Info**: Azul para información general

## 🚀 Próximas Funcionalidades

### Funcionalidades Planeadas:
1. **Filtros Avanzados**
   - Filtrar órdenes por fecha
   - Filtrar por método de pago
   - Búsqueda por cliente

2. **Exportación de Datos**
   - Exportar órdenes a CSV
   - Exportar reportes a PDF
   - Estadísticas descargables

3. **Gestión de Clientes**
   - Lista completa de clientes
   - Historial de compras por cliente
   - Métricas de clientes

4. **Notificaciones**
   - Alertas de nuevas órdenes
   - Notificaciones de stock bajo
   - Recordatorios de pagos pendientes

5. **Formularios de Edición**
   - Modal para editar órdenes
   - Formulario para crear/editar productos
   - Validación de datos

6. **Integración con APIs**
   - Conexión con Hotmart API
   - Integración con wallets crypto
   - Envío automático de emails

## 📝 Uso del Panel

### Acceder al Panel:
1. Navega a `/dashboard`
2. Visualiza las métricas generales
3. Usa el sidebar para navegar entre secciones

### Gestionar Órdenes:
1. Ve a `/dashboard/ordenes`
2. Visualiza todas las órdenes en la tabla
3. Usa los botones de acción para ver detalles o editar
4. Filtra por estado o método de pago

### Gestionar Productos:
1. Ve a `/dashboard/productos`
2. Visualiza el catálogo completo
3. Crea nuevos productos con el botón "Agregar Producto"
4. Edita o elimina productos existentes

## 🔧 Personalización

### Agregar Nuevas Órdenes:
Edita `src/data/orders.ts` y agrega nuevos objetos al array `orders`:

```typescript
{
    id: 'ORD-009',
    customerName: 'Nuevo Cliente',
    customerEmail: 'cliente@email.com',
    productId: 'producto-id',
    productName: 'Nombre del Producto',
    amount: 9.99,
    paymentMethod: 'crypto',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
    transactionId: 'TXN-XXX-009'
}
```

### Agregar Nuevos Productos:
Edita `src/data/products.ts` y agrega nuevos productos al array `products`.

## 🎯 Mejores Prácticas

1. **Mantén los datos actualizados** - Actualiza regularmente el stock y precios
2. **Monitorea las órdenes pendientes** - Revisa diariamente las órdenes pendientes
3. **Responde rápido** - Atiende las órdenes fallidas lo antes posible
4. **Mantén el inventario** - Asegúrate de tener stock suficiente
5. **Usa las estadísticas** - Toma decisiones basadas en los datos

## 🛠️ Tecnologías Utilizadas

- **Astro** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Material Symbols** - Iconografía
- **Responsive Design** - Mobile-first approach

## 📞 Soporte

Para soporte o preguntas sobre el panel de administración, contacta al equipo de desarrollo.

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2026
