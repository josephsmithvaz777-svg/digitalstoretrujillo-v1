# ⚠️ Problema: API Keys Incorrectas

## 🔍 Problema identificado:

Las keys que proporcionaste son **prefijos**, no las keys completas:
- ❌ `sb_publishable_FmihHJ0kIzXm0-Gsn0tDEA_PdyM3AhW`
- ❌ `sb_secret_8Y2H1QNlfybv0DXUg7YAzA_poWAGmnI`

Supabase necesita las **keys JWT completas** que empiezan con `eyJ...`

---

## ✅ Cómo obtener las keys correctas:

### 1. Ve a Supabase Dashboard
https://supabase.com/dashboard/project/vmbupmwlyfjmxjmenyid

### 2. Ve a Settings → API

### 3. Copia las keys completas:

#### **anon public (para frontend)**
Busca: "anon public"
- Debe empezar con: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Es una key MUY LARGA (cientos de caracteres)

#### **service_role (para backend)**
Busca: "service_role"  
- Debe empezar con: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- También es MUY LARGA

---

## 📝 Formato correcto en `.env`:

```env
# Las keys deben ser así (ejemplo):
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYnVwbXdseWZqbXhqbWVueWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMTc3NzEsImV4cCI6MjA1MTU5Mzc3MX0.FmihHJ0kIzXm0-Gsn0tDEA_PdyM3AhW

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtYnVwbXdseWZqbXhqbWVueWlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjAxNzc3MSwiZXhwIjoyMDUxNTkzNzcxfQ.8Y2H1xGqZvK9wN3mP5tL7jR4sF6hD8kW2nV0cX1yE9o
```

**Nota:** Las keys tienen 3 partes separadas por puntos (`.`)

---

## 🎯 Una vez que tengas las keys:

1. Actualiza tu `.env` con las keys completas
2. Reinicia el servidor (`npm run dev`)
3. Prueba la API: `curl http://localhost:4321/api/products`

---

Por favor, comparte las keys JWT completas de Supabase para continuar.
