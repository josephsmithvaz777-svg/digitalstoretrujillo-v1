# Dockerfile para Astro con Node.js
FROM node:20-alpine AS base

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
FROM base AS deps
RUN npm ci

# Build de la aplicación
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de producción
RUN npm run build

# Imagen de producción
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer puerto (Coolify lo asignará dinámicamente)
EXPOSE ${PORT}

# Comando para iniciar
CMD ["node", "./dist/server/entry.mjs"]
