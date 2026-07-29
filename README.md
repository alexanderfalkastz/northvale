# Northvale — Setup

Este repo ya tiene: estructura del proyecto, migraciones de base de datos, el
script del agente Scout+Analyst v1, y la landing page. Lo que falta es conectar
tus propias cuentas — son 3 pasos, ~15 minutos en total.

## 1. Crear proyecto en Supabase (5 min)

1. Ve a https://supabase.com → crea una cuenta si no tienes → "New Project"
2. Nombra el proyecto "northvale", elige una región cercana a tus clientes
   objetivo (ej. EU si apuntas a España/UK primero)
3. Cuando termine de crearse, ve a **SQL Editor** y pega el contenido de
   `supabase/migrations/0001_properties.sql`, ejecuta. Repite con
   `supabase/migrations/0002_contacts.sql`
4. Ve a **Project Settings → API** y copia:
   - `Project URL` → pégalo en tu `.env` como `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (no la `anon` key) → pégalo como `SUPABASE_SERVICE_ROLE_KEY`

## 2. Crear API key de Anthropic (2 min)

1. Ve a https://console.anthropic.com → API Keys → Create Key
2. Pégala en tu `.env` como `ANTHROPIC_API_KEY`

## 3. Instalar y correr localmente

```bash
cp .env.example .env
# completa .env con los valores de arriba
npm install
npm run dev
```

Abre http://localhost:3000 — deberías ver la landing.

## 4. Probar el agente Scout+Analyst v1

```bash
npm run add-property -- \
  --name "Villa Serena" \
  --company "Coastal Retreats" \
  --country "Portugal" \
  --city "Lagos" \
  --price 850 \
  --url "https://airbnb.com/rooms/EJEMPLO123" \
  --notes "Fotos actuales oscuras, propiedad frente al mar con potencial alto"
```

Esto guarda la propiedad en Supabase con un Score calculado automáticamente.
Revisa la tabla `properties` en el dashboard de Supabase para verla.

## 5. Deploy a Vercel (5 min, cuando quieras salir a producción)

1. Sube este repo a GitHub (crea un repo nuevo en github.com, sigue las
   instrucciones de "push an existing repository")
2. Ve a https://vercel.com → "Add New Project" → importa el repo
3. En "Environment Variables" pega las mismas 3 variables de tu `.env`
4. Deploy. Vercel te da una URL — luego conectas el dominio `northvale.com`
   desde Project Settings → Domains

## 6. Dominio y correo (pendiente, tu decisión)

- Dominio: registra `northvale.com` en Namecheap (o el TLD que esté libre)
- Correo: Google Workspace con `hello@northvale.com`, o Zoho Mail (gratis
  para 1 usuario) si quieres arrancar sin costo mensual

---

Siguiente paso una vez tengas esto corriendo: pega en Claude Code

```
Lee CLAUDE.md. Ya tengo la Fase 1 (estructura, base de datos, agente Scout+Analyst
v1, landing) funcionando localmente. Vamos a mejorar la landing con las 7 secciones
completas del manual de marca y preparar el deploy a Vercel.
```
