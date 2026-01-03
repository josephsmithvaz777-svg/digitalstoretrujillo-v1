# 🚀 DEPLOYMENT EN COOLIFY - GUÍA RÁPIDA

## ✅ Estado Actual
- ✅ MongoDB Atlas conectado y funcionando
- ✅ Proyecto en GitHub actualizado
- ✅ Configuración SSL resuelta
- ✅ Health check funcionando

---

## 📋 PASOS PARA DEPLOYAR EN COOLIFY

### 1️⃣ Accede a tu Coolify
- URL: `https://tu-vps-ip:8000` (o tu dominio de Coolify)
- Login con tus credenciales

### 2️⃣ Crear Nueva Aplicación

1. **Projects** → Selecciona tu proyecto o crea uno nuevo
2. Click en **"+ Add Resource"**
3. Selecciona **"Application"**

### 3️⃣ Configurar la Aplicación

**Configuración Básica:**
- **Name**: `digitalstore`
- **Source**: GitHub
- **Repository**: `josephsmithvaz777-svg/digitalstoretrujillo-v1`
- **Branch**: `main`
- **Build Pack**: `Dockerfile`

### 4️⃣ Variables de Entorno

En la sección **"Environment Variables"**, agrega estas variables:

```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://digitalstoretrujillo_db_user:gmluw3GUDQK95htq@digitalstoredb.6wrm1re.mongodb.net/digitalstore
MONGODB_DB=digitalstore

# Producción
NODE_ENV=production
PUBLIC_SITE_URL=https://tu-dominio.com

# JWT Secret (genera uno nuevo)
JWT_SECRET=GENERA_UNO_NUEVO_AQUI

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu_password_app
EMAIL_FROM=noreply@tu-dominio.com

# Puerto (Coolify lo asigna automáticamente)
PORT=3000
HOST=0.0.0.0
```

**⚠️ IMPORTANTE:** Genera un JWT Secret seguro:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5️⃣ Configurar Dominio

1. En la sección **"Domains"**
2. Agrega tu dominio: `store.tudominio.com`
3. Coolify generará automáticamente el certificado SSL

**Configurar DNS en Cloudflare:**
1. Ve a Cloudflare → Tu dominio → DNS
2. Agrega un registro:
   - **Type**: `A`
   - **Name**: `store` (o el subdominio que quieras)
   - **IPv4 address**: IP de tu VPS
   - **Proxy status**: ⚠️ **DNS only** (nube gris, NO naranja)
   - **TTL**: Auto

### 6️⃣ Health Check (Opcional pero Recomendado)

En **"Health Check"**:
- **Path**: `/api/health`
- **Port**: `3000`
- **Interval**: `30s`

### 7️⃣ Deploy

1. Click en **"Deploy"**
2. Coolify hará:
   - ✅ Clonar el repositorio
   - ✅ Construir la imagen Docker
   - ✅ Iniciar el contenedor
   - ✅ Configurar el proxy inverso
   - ✅ Generar certificado SSL

3. **Monitorea el progreso** en la pestaña **"Logs"**

### 8️⃣ Verificar Deployment

Una vez completado (2-3 minutos):

1. **Health Check**: `https://tu-dominio.com/api/health`
   - Debería mostrar: `{"status":"ok","database":"connected",...}`

2. **Home**: `https://tu-dominio.com/`

3. **Dashboard**: `https://tu-dominio.com/dashboard`

---

## 🔄 Deployment Automático

### Configurar Webhook de GitHub

1. En Coolify, copia el **Webhook URL**
2. Ve a GitHub → Tu repositorio → **Settings** → **Webhooks**
3. Click en **"Add webhook"**
4. Pega la URL de Coolify
5. **Content type**: `application/json`
6. **Events**: Selecciona `push`
7. Click en **"Add webhook"**

Ahora cada `git push` desplegará automáticamente.

---

## 🧪 Verificación Post-Deployment

### 1. Health Check
```bash
curl https://tu-dominio.com/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-01-03T...",
  "environment": "production"
}
```

### 2. Páginas Principales
- ✅ Home: `https://tu-dominio.com/`
- ✅ Tienda: `https://tu-dominio.com/tienda`
- ✅ Dashboard: `https://tu-dominio.com/dashboard`
- ✅ Órdenes: `https://tu-dominio.com/dashboard/ordenes`
- ✅ Productos: `https://tu-dominio.com/dashboard/productos`

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que `MONGODB_URI` esté correcta en Coolify
- Verifica Network Access en MongoDB Atlas (debe permitir `0.0.0.0/0`)

### Error: "Port already in use"
- Coolify asigna puertos automáticamente, no cambies el PORT manualmente

### Error: "Build failed"
- Revisa los logs de build en Coolify
- Verifica que el Dockerfile sea correcto

### La aplicación no carga
- Verifica el Health Check en Coolify
- Revisa los logs de la aplicación
- Verifica que el dominio esté configurado correctamente en Cloudflare

### SSL no funciona
- Espera 2-3 minutos después del deployment
- Verifica que el DNS esté en modo "DNS only" (gris) en Cloudflare
- Coolify genera el certificado automáticamente con Let's Encrypt

---

## 📊 Monitoreo

### Logs en Tiempo Real
En Coolify:
1. Ve a tu aplicación
2. Click en **"Logs"**
3. Selecciona **"Follow"** para ver logs en tiempo real

### Métricas
Coolify muestra automáticamente:
- CPU usage
- Memory usage
- Network traffic
- Uptime

---

## 🎯 Próximos Pasos

Después del deployment:

1. ✅ Verificar que todo funcione
2. ⏭️ Poblar MongoDB con productos reales
3. ⏭️ Configurar Hotmart API keys
4. ⏭️ Configurar emails transaccionales
5. ⏭️ Agregar autenticación de admin
6. ⏭️ Configurar backups de MongoDB

---

## 📞 Recursos

- **Documentación Completa**: `COOLIFY_DEPLOYMENT.md`
- **Panel Admin**: `ADMIN_PANEL.md`
- **Resumen**: `RESUMEN_COOLIFY.md`

---

**Tiempo estimado de deployment:** 10-15 minutos

**¡Listo para deployar!** 🚀

---

**Última actualización:** Enero 2026  
**Versión:** 2.1.0 (MongoDB Atlas + Coolify)
