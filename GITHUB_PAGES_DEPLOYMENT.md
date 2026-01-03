# 🚀 Guía de Deployment a GitHub Pages

## Configuración Completada ✅

Tu proyecto Astro ya está configurado para deployarse automáticamente en GitHub Pages. Los siguientes archivos han sido creados/modificados:

### Archivos Configurados:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow
2. **`astro.config.mjs`** - Configuración de Astro para GitHub Pages
3. **`public/.nojekyll`** - Archivo para evitar procesamiento de Jekyll

## 📋 Pasos para Activar GitHub Pages

### 1. Configurar GitHub Pages en tu Repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/josephsmithvaz777-svg/digitalstoretrujillo-v1`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source** (Fuente), selecciona:
   - **Source**: `GitHub Actions`
   
### 2. Hacer Push de los Cambios

Los cambios ya están listos para ser subidos:

```bash
git add .
git commit -m "Configurar deployment a GitHub Pages"
git push
```

### 3. Verificar el Deployment

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (tarda 2-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   
   **🌐 https://josephsmithvaz777-svg.github.io/digitalstoretrujillo-v1/**

## 🔧 Cambios Realizados

### `astro.config.mjs`
```javascript
export default defineConfig({
  site: 'https://josephsmithvaz777-svg.github.io',
  base: '/digitalstoretrujillo-v1',
  output: 'static',  // Cambiado de 'server' a 'static'
  // ... resto de la configuración
});
```

**Cambios importantes:**
- ✅ Cambiado de SSR (`output: 'server'`) a SSG (`output: 'static'`)
- ✅ Agregado `site` con tu URL de GitHub Pages
- ✅ Agregado `base` con el nombre de tu repositorio
- ✅ Removido el adapter de Node.js (no necesario para sitios estáticos)

### `.github/workflows/deploy.yml`
Workflow automático que:
- Se ejecuta en cada push a `main`
- Instala dependencias
- Construye el proyecto Astro
- Deploya a GitHub Pages

### `public/.nojekyll`
Archivo vacío que previene que GitHub Pages intente procesar el sitio con Jekyll.

## 🌐 URLs del Proyecto

- **Repositorio**: https://github.com/josephsmithvaz777-svg/digitalstoretrujillo-v1
- **Sitio Web**: https://josephsmithvaz777-svg.github.io/digitalstoretrujillo-v1/
- **Dashboard**: https://josephsmithvaz777-svg.github.io/digitalstoretrujillo-v1/dashboard

## 🔄 Actualizaciones Futuras

Cada vez que hagas push a la rama `main`, el sitio se actualizará automáticamente:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de tus cambios"
git push
```

El deployment se ejecutará automáticamente y tu sitio se actualizará en 2-3 minutos.

## ⚠️ Notas Importantes

### Limitaciones de GitHub Pages:

1. **Solo sitios estáticos** - No puede ejecutar código del servidor
2. **No hay base de datos** - Los datos están en archivos TypeScript
3. **No hay autenticación del servidor** - Necesitarías un servicio externo

### Para Funcionalidades Dinámicas:

Si necesitas funcionalidades del servidor (autenticación, base de datos, APIs), considera deployar en:

- **Vercel** (Recomendado para Astro)
- **Netlify**
- **Cloudflare Pages**
- **Railway**
- **Render**

## 🐛 Solución de Problemas

### El sitio no se muestra correctamente:

1. Verifica que GitHub Pages esté configurado en **Settings > Pages**
2. Asegúrate de que la fuente sea **GitHub Actions**
3. Revisa la pestaña **Actions** para ver si hay errores

### Error 404 en las rutas:

- Asegúrate de que `base: '/digitalstoretrujillo-v1'` esté en `astro.config.mjs`
- Verifica que todos los enlaces internos usen rutas relativas

### El workflow falla:

1. Ve a **Actions** en GitHub
2. Haz clic en el workflow fallido
3. Revisa los logs para ver el error específico

## 📞 Soporte

Si tienes problemas con el deployment, revisa:
- [Documentación de Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Documentación de GitHub Pages](https://docs.github.com/en/pages)

---

**Última actualización:** Enero 2026
