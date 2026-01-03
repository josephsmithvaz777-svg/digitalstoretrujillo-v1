# 🚀 Guía de Deployment en Coolify con MongoDB

## 📋 Requisitos Previos

- VPS con Coolify instalado
- Acceso a Coolify dashboard
- Repositorio de GitHub configurado
- Cuenta de MongoDB Atlas (opcional) o MongoDB en Coolify

---

## 🗄️ Paso 1: Configurar MongoDB

### Opción A: MongoDB en Coolify (Recomendado)

1. En Coolify, ve a **Resources** → **+ Add Resource**
2. Selecciona **Database** → **MongoDB**
3. Configura:
   - **Name**: `digitalstore-mongodb`
   - **Version**: `7.0` (última estable)
   - **Root Password**: Genera una contraseña segura
   - **Database Name**: `digitalstore`
4. Haz clic en **Deploy**
5. Espera a que el contenedor esté corriendo
6. Anota la **Connection String** que aparecerá

### Opción B: MongoDB Atlas (Cloud)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (tier gratuito disponible)
4. Configura:
   - **Database User**: Crea usuario y contraseña
   - **Network Access**: Agrega `0.0.0.0/0` (permite todas las IPs)
5. Obtén la **Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/digitalstore?retryWrites=true&w=majority
   ```

---

## 🚢 Paso 2: Configurar la Aplicación en Coolify

### 1. Crear Nueva Aplicación

1. En Coolify, ve a **Projects** → Tu proyecto → **+ Add Resource**
2. Selecciona **Application**
3. Configura:
   - **Name**: `digitalstore`
   - **Source**: GitHub
   - **Repository**: `josephsmithvaz777-svg/digitalstoretrujillo-v1`
   - **Branch**: `main`
   - **Build Pack**: Dockerfile

### 2. Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```bash
# Entorno
NODE_ENV=production

# MongoDB (usa la connection string de Paso 1)
MONGODB_URI=mongodb://username:password@digitalstore-mongodb:27017/digitalstore?authSource=admin
MONGODB_DB=digitalstore

# URL del sitio (tu dominio)
PUBLIC_SITE_URL=https://tu-dominio.com

# Hotmart (configura después)
HOTMART_API_KEY=tu_hotmart_api_key
HOTMART_CLIENT_ID=tu_hotmart_client_id
HOTMART_CLIENT_SECRET=tu_hotmart_client_secret
HOTMART_WEBHOOK_SECRET=tu_webhook_secret

# JWT (genera uno seguro)
JWT_SECRET=genera_un_string_aleatorio_muy_largo_y_seguro_aqui

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu_password_de_aplicacion
EMAIL_FROM=noreply@tu-dominio.com

# Puerto (Coolify lo asigna automáticamente)
PORT=3000
HOST=0.0.0.0
```

### 3. Configurar Dominio

1. En **Domains**, agrega tu dominio:
   - Ejemplo: `store.tudominio.com`
2. Coolify generará automáticamente certificado SSL con Let's Encrypt
3. Configura el DNS de tu dominio:
   - Tipo: `A`
   - Name: `store` (o `@` para dominio raíz)
   - Value: IP de tu VPS

### 4. Configurar Health Check

1. En **Health Check**, configura:
   - **Path**: `/`
   - **Port**: `3000`
   - **Interval**: `30s`

---

## 🔧 Paso 3: Deploy

1. Haz clic en **Deploy**
2. Coolify hará:
   - ✅ Clonar el repositorio
   - ✅ Construir la imagen Docker
   - ✅ Iniciar el contenedor
   - ✅ Configurar el proxy inverso
   - ✅ Generar certificado SSL

3. Monitorea el progreso en **Logs**

---

## 📊 Paso 4: Inicializar la Base de Datos

Una vez que la aplicación esté corriendo, necesitas poblar la base de datos con datos iniciales.

### Opción 1: Script de Inicialización (Recomendado)

Crea un endpoint API para inicializar datos:

1. Accede a: `https://tu-dominio.com/api/init-db`
2. Esto creará las colecciones y datos de ejemplo

### Opción 2: MongoDB Compass (Manual)

1. Descarga [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Conecta usando tu connection string
3. Crea las colecciones:
   - `products`
   - `orders`
   - `users`
4. Importa los datos desde `src/data/`

---

## 🔄 Actualizaciones Automáticas

### Configurar Webhook de GitHub

1. En Coolify, copia el **Webhook URL**
2. Ve a tu repositorio en GitHub
3. **Settings** → **Webhooks** → **Add webhook**
4. Pega la URL de Coolify
5. Selecciona eventos: `push`

Ahora cada vez que hagas `git push`, Coolify desplegará automáticamente.

---

## 🧪 Verificación

### 1. Verificar que la App Está Corriendo

```bash
curl https://tu-dominio.com
```

### 2. Verificar Conexión a MongoDB

Accede a: `https://tu-dominio.com/api/health`

Debería retornar:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### 3. Verificar Dashboard

Accede a: `https://tu-dominio.com/dashboard`

---

## 📝 Estructura de Datos en MongoDB

### Colección: `products`
```javascript
{
  _id: ObjectId,
  id: "netflix-premium",
  name: "Netflix Premium",
  description: "4K UHD • 1 Pantalla • Privado",
  price: 3.99,
  originalPrice: 9.99,
  duration: "mes",
  category: "streaming",
  stock: 50,
  isActive: true,
  features: ["1 Mes", "Renovable"],
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Colección: `orders`
```javascript
{
  _id: ObjectId,
  id: "ORD-001",
  customerName: "Juan Pérez",
  customerEmail: "juan@email.com",
  productId: "netflix-premium",
  productName: "Netflix Premium",
  amount: 3.99,
  paymentMethod: "crypto" | "hotmart",
  status: "pending" | "completed" | "failed" | "refunded",
  createdAt: ISODate,
  updatedAt: ISODate,
  transactionId: "TXN-XXX-001"
}
```

---

## 🔐 Seguridad

### Variables de Entorno Sensibles

⚠️ **NUNCA** subas estas variables al repositorio:
- `MONGODB_URI`
- `JWT_SECRET`
- `HOTMART_API_KEY`
- `SMTP_PASSWORD`

Todas deben estar configuradas en Coolify.

### Generar JWT Secret Seguro

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"

1. Verifica que MongoDB esté corriendo en Coolify
2. Revisa la `MONGODB_URI` en variables de entorno
3. Verifica los logs de MongoDB en Coolify

### Error: "Port already in use"

- Coolify asigna puertos automáticamente
- No necesitas cambiar el PORT manualmente

### Error: "Build failed"

1. Revisa los logs de build en Coolify
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que el Dockerfile sea correcto

### La aplicación no carga

1. Verifica el Health Check en Coolify
2. Revisa los logs de la aplicación
3. Verifica que el dominio esté configurado correctamente

---

## 📊 Monitoreo

### Logs en Tiempo Real

En Coolify:
1. Ve a tu aplicación
2. Click en **Logs**
3. Selecciona **Follow** para ver logs en tiempo real

### Métricas

Coolify muestra automáticamente:
- CPU usage
- Memory usage
- Network traffic
- Uptime

---

## 🔄 Backup de MongoDB

### Backup Manual

```bash
# Conecta a tu VPS
ssh user@tu-vps

# Backup de MongoDB
docker exec digitalstore-mongodb mongodump --out /backup

# Descargar backup
scp -r user@tu-vps:/backup ./local-backup
```

### Backup Automático (Recomendado)

Usa MongoDB Atlas que incluye backups automáticos en el plan gratuito.

---

## 📞 Próximos Pasos

1. ✅ Configurar MongoDB
2. ✅ Deployar en Coolify
3. ✅ Configurar dominio y SSL
4. ⏭️ Poblar base de datos con productos
5. ⏭️ Configurar Hotmart para pagos
6. ⏭️ Configurar emails transaccionales
7. ⏭️ Agregar autenticación de admin

---

**¿Necesitas ayuda?** Revisa los logs en Coolify o contacta al soporte.

**Última actualización:** Enero 2026
