# Northvale — Contexto del proyecto

Este archivo es la memoria persistente del proyecto. Léelo por completo antes de ejecutar cualquier tarea.

## Qué es esta empresa

Northvale NO es una empresa de IA ni un editor de video. Es una **agencia premium de marketing visual** para propiedades de lujo. Transformamos fotos de propiedades premium en contenido cinematográfico (video, foto mejorada, reels) que genera atención y deseo.

Visión de mediano plazo: no competir con editores de video, sino con agencias de marketing premium — ofreciendo estrategia de anuncio, contenido, automatización de publicaciones y dashboard de rendimiento, no solo videos sueltos.

**Reglas de marca (nunca romper):**
- Nunca comunicar como empresa de IA o de video. Somos una agencia de marketing premium que usa la mejor tecnología disponible.
- Tono: profesional, directo, seguro, premium. Nunca informal ("hola amigo").
- Nunca competir por precio. Nunca enviar mensajes masivos sin personalizar. Nunca trabajar sin CRM.

## Stack técnico

- Next.js + TypeScript
- Supabase (base de datos + auth)
- Vercel (deploy)
- Claude Code como entorno principal de desarrollo y automatización

## Fase actual del proyecto

**Estamos en: Fundación técnica (Días 1-2 del roadmap comprimido).**

Orden de construcción decidido (por leverage, NO en el orden del manual original):
1. ✅ Estructura de carpetas y base de datos → EN CURSO
2. ⬜ Agente Scout (encuentra propiedades premium)
3. ⬜ Agente Analyst (calcula Score automático)
4. ⬜ Landing page (7 secciones)
5. ⬜ Portafolio de 10 propiedades conceptuales
6. ⬜ Agente Sales (genera outreach personalizado)
7. ⬜ Resto de agentes (Creative Director, Producer, CRM Manager, Finance, Dashboard) — no antes de tener leads reales corriendo por el sistema

No construir agentes fuera de este orden sin justificar el cambio de prioridad.

## Schema de base de datos (Supabase) — tabla `properties`

| Campo | Tipo | Notas |
|---|---|---|
| id | uuid | PK |
| name | text | Nombre de la propiedad |
| company | text | Empresa o agente inmobiliario dueño del listing |
| country | text | |
| city | text | |
| price | numeric | |
| score | text | A+, A, B, C — calculado por el Analyst |
| status | text | Pipeline: Nuevo → Analizado → Aprobado → Demo → Mensaje → Respuesta → Reunión → Cliente → Entrega → Seguimiento → Upsell |
| notes | text | |
| history | jsonb | Log de cambios de estado |
| last_contact | timestamptz | |
| owner | text | Responsable interno del lead |
| source_url | text | Link original de donde se encontró |
| photos | jsonb | URLs de fotos originales |
| created_at | timestamptz | default now() |

Regla: nunca borrar filas. Solo cambiar `status`.

## SOP-001 — Cómo debe operar el agente Scout

Objetivo: agregar leads de propiedades premium de forma constante.

Por cada propiedad encontrada:
1. Buscar (portales inmobiliarios premium, cuentas de Instagram de agencias de lujo, sitios de hoteles boutique)
2. Guardar en `properties` con status `Nuevo`
3. Extraer: nombre, empresa, país, ciudad, precio, fotos, source_url
4. No duplicar — verificar por source_url antes de insertar

Tiempo objetivo: máximo 3 minutos de procesamiento por lead (si es manual/semi-automático).

**Foco de captación actual: anfitriones/gestoras de Airbnb.** Airbnb se usa como
RADAR para *encontrar y calificar* propiedades premium, NO como canal de contacto
(Airbnb no expone el contacto del host y filtra datos en su chat). El mejor patrón
de lead: propiedad de alto valor + fotos actuales flojas (gap visual = score A+ y
mejor gancho de venta). Priorizar gestoras/property managers (cartera + presupuesto)
por sobre hosts hobbistas de una sola propiedad barata.

## SOP-003 — Enriquecimiento de contacto (Airbnb no lo da)

Como Airbnb no expone el contacto, por cada lead calificado hay que encontrar al
dueño/gestora por fuera antes de poder contactar:
1. Buscar el nombre de la propiedad en Google → web de reserva directa o Instagram.
2. Búsqueda inversa de imagen con una foto del listing → dónde más está publicada.
3. Detectar si hay una gestora detrás (un contacto = varias propiedades).
4. Guardar el canal y handle de contacto en el lead (usar `notes` por ahora, o la
   tabla `contacts`). El contacto se hace SIEMPRE por fuera de Airbnb.

## SOP-004 — Outreach demo-first (agente Sales)

Nunca contactar con solo texto. Cada primer mensaje va con un **demo real hecho
con una foto propia del prospecto** (antes/después cinematográfico). El demo es el
grueso de la conversión. Guion y plantillas (IG DM + email): ver
`docs/outreach-demo-first.md`. Reglas: personalizar siempre, nunca liderar con
precio, nunca decir "IA" ni "video", un solo follow-up. Medir enviados → respondidos
→ reunión → cliente en el CRM.

## SOP-002 — Checklist que debe usar el agente Analyst

Al calcular el Score de una propiedad, evaluar:
- Precio (¿está en rango premium para su mercado?)
- Calidad de las fotos actuales (¿son buenas o desaprovechan la propiedad?)
- Ubicación
- Potencial de mejora visual (mientras peores sean las fotos actuales vs. el valor real de la propiedad, mayor el potencial)
- Empresa o propietario (¿tiene presupuesto y perfil para contratar un servicio premium?)

Output: Score A+, A, B o C. Actualizar status a `Analizado`.

## Estructura de carpetas del proyecto (por cliente, una vez haya clientes)

```
/clientes
  /{nombre-cliente}
    /proyecto
      /fotos
      /prompts
      /videos-ia
      /edicion
      /entrega
```

Nomenclatura de archivos: `{año}/{ciudad}/{nombre-propiedad}/{V01, V02...}/Final`

## Reglas inquebrantables (de todo el manual, aplican siempre)

- Nunca competir por precio
- Nunca enviar mensajes masivos
- Nunca trabajar sin CRM
- Nunca improvisar procesos — todo debe documentarse
- Todo debe medirse
- Todo debe poder automatizarse eventualmente
- Cada error debe convertirse en un procedimiento (SOP nuevo o actualizado)

## Próxima acción concreta

Construir el agente Scout: un script que busque propiedades premium, extraiga los campos del schema de arriba, y las inserte en Supabase evitando duplicados por `source_url`.
