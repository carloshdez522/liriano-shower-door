# Plan de Acción SEO - Liriano & Son Shower Doors Corp

Basado en la guía "Mini Guía de Posicionamiento en Google" de Juanes Digital y el análisis del sitio web.

---

## Diagnóstico inicial

**URL actual:** https://lirianosonglassprofessional.com
**Hosting:** HostingMontevideo
**Stack:** HTML/CSS/JS estático + PHP (app admin) + GitHub Actions → FTP
**Idiomas:** Inglés (principal) + Español (conmutador JS)

### Lo que ya está bien
- Google Analytics instalado
- Google Fonts optimizado con preconnect
- Imágenes en WebP
- Lazy loading en galería
- Diseño responsive (mobile-friendly)
- HTTPS (seguro)
- Tiene sitemap.xml
- Tiene Google Business Profile (por las citaciones en redes)
- Velocidad parece buena (CSS/JS no excesivos)

### Lo que hay que mejorar (priorizado)

---

## FASE 1 - SEMANA 1: Investigación de Palabras Clave

### 1.1 Keyword Research
Usa estas herramientas gratuitas:
- **Google Keyword Planner** (ads.google.com/home/tools/keyword-planner/)
- **AnswerThePublic** (3 búsquedas gratis/día)
- **Google Autocomplete** (escribe en Google y mira sugerencias)

Busca keywords de tipo **long-tail** (3+ palabras) con estas categorías:

| Categoría | Ejemplos de keywords |
|-----------|---------------------|
| **Servicio + ubicación** | "shower door installation Miami", "glass shower doors Miami-Dade", "puertas de ducha Miami" |
| **Problema + solución** | "custom shower door installation Broward", "glass repair Miami" |
| **Intención transaccional** | "free estimate shower door Miami", "shower door company near me" |
| **Intención informacional** | "frameless vs framed shower door", "how much do shower doors cost Miami" |

**Acción concreta:** Encuentra 10-15 keywords y documéntalas en una hoja de cálculo con:
- Keyword
- Volumen de búsqueda
- Intención (informacional / transaccional / comercial)
- Página del sitio a la que asignarla (keyword mapping)

---

## FASE 2 - SEMANA 2: SEO On-Page (Otimización del sitio)

### 2.1 Arreglar Meta Tags Críticos

#### En `index.html` (página principal):

**Meta Title actual:**
```html
<title>Liriano &amp; Son Shower Doors Corp</title>
```
Debe ser (ejemplo con keywords):
```html
<title>Shower Door Installation Miami | Liriano &amp; Son | Free Estimate</title>
```

**Meta Description actual:**
```html
<meta name="description" content="Liriano &amp; Son Shower Doors Corp — Glass installation in Miami...">
```
Mejorar con más keywords y llamado a la acción:
```html
<meta name="description" content="Premium shower door installation in Miami, Miami-Dade &amp; Broward since 2019. Frameless glass, custom cabinets, railings &amp; mirrors. Free estimate — call +1 (786) 222-4264.">
```

**HTML lang para SEO multilingüe:**
```html
<html lang="en">
```
Agregar etiqueta hreflang para españ
```html
<link rel="alternate" hreflang="en" href="https://lirianosonglassprofessional.com/">
<link rel="alternate" hreflang="es" href="https://lirianosonglassprofessional.com/?lang=es">
```

#### En `reviews.html`:
**Title actual:**
```html
<title>Share Your Experience - Liriano &amp; Son Shower Doors Corp</title>
```
Mejorar:
```html
<title>Reviews: Liriano &amp; Son Shower Doors Corp | Miami Glass Installers</title>
```

### 2.2 Arreglar Jerarquía de Encabezados (H1, H2, H3)

**H1 actual:** `"Glass Solutions"` — muy genérico, no tiene ubicación ni keyword principal.

Debe ser algo como:
```
H1: Custom Shower Door Installation in Miami & South Florida
```

**H2s actuales:** Revisar que cada sección tenga un H2 descriptivo con keywords secundarias.

### 2.3 Mejorar Alt Texts de Imágenes

Las imágenes de la galería tienen alt texts genéricos como "Instalación de ducha", "Baño moderno". Mejorar incluyendo keywords:

- `"Frameless shower door installation Miami bathroom"` en vez de `"Instalación de ducha"`
- `"Custom glass shower enclosure Miami-Dade"` en vez de `"Baño moderno"`

### 2.4 Agregar Enlaces Internos

- El menú de navegación debería incluir un link a `reviews.html`
- Agregar enlaces de texto descriptivo entre secciones (ej: en "About" enlazar a servicios)

### 2.5 Agregar Schema Markup (Datos Estructurados)

Este es uno de los cambios más importantes para SEO local. Agregar este JSON-LD en el `<head>` de `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Liriano & Son Shower Doors Corp",
  "image": "https://lirianosonglassprofessional.com/images/logo.webp",
  "description": "Custom shower door installation and glass solutions in Miami, Miami-Dade and Broward.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "telephone": "+1-786-222-4264",
  "email": "misaelliriano75@gmail.com",
  "url": "https://lirianosonglassprofessional.com",
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50"
  },
  "areaServed": [
    {"@type": "City", "name": "Miami"},
    {"@type": "City", "name": "Miami-Dade"},
    {"@type": "City", "name": "Broward"}
  ]
}
</script>
```

> **Nota:** Cambia `ratingValue` y `reviewCount` cuando tengas reseñas reales.

---

## FASE 3 - SEMANA 3: SEO Técnico

### 3.1 Mejorar el Sitemap (archivo `sitemap.xml`)

**Actual:** Solo 1 URL. Debe incluir:
```
https://lirianosonglassprofessional.com/          (priority 1.0)
https://lirianosonglassprofessional.com/reviews   (priority 0.7)
```

### 3.2 Verificar Core Web Vitals

Correr la página en: https://pagespeed.web.dev/
- **LCP** (< 2.5s): Revisar tamaño de hero-bg.webp
- **INP** (< 200ms): Tu JS es ligero, debería estar bien
- **CLS** (< 0.1): Verificar que no haya saltos de layout

### 3.3 Archivo robots.txt

Agregar archivo `robots.txt` en la raíz del sitio:

```
User-agent: *
Allow: /
Disallow: /app/
Sitemap: https://lirianosonglassprofessional.com/sitemap.xml
```

### 3.4 Google Search Console

Registrar el sitio en Google Search Console (https://search.google.com/search-console).
- Verificar la propiedad (puedes hacerlo por DNS, HTML tag, o Google Analytics — como ya tienes GA, es el método más fácil)
- Enviar el sitemap.xml
- Revisar si hay errores de rastreo

---

## FASE 4 - SEMANA 4: SEO Local y Autoridad

### 4.1 Optimizar Google Business Profile

Si ya tienes perfil:
- Completar TODOS los campos (horarios, servicios, fotos)
- Agregar fotos nuevas cada semana
- Responder a TODAS las reseñas
- Publicar actualizaciones (ofertas, nuevos trabajos)

### 4.2 Consistencia NAP (Name, Address, Phone)

Asegurar que en TODOS los directorios aparezca exactamente igual:
```
Liriano & Son Shower Doors Corp
+1 (786) 222-4264
misaelliriano75@gmail.com
```

### 4.3 Conseguir Reseñas

- Pedir reseñas en Google después de cada trabajo
- La página `reviews.html` ya existe úsala para recolectar testimonios
- Las reseñas = factor SEO local #1

### 4.4 Estrategia de Backlinks (sencilla para empezar)

- Registrar en directorios de la industria de construcción/Miami
- Colaborar con contratistas locales (plomeros, electricistas) para menciones mutuas
- Crear perfil en **Houzz**, **HomeAdvisor**, **Angi** (los de construcción)
- Guest blogging: escribir para blogs de remodelación del hogar en Miami

---

## FASE 5 - SEMANA 5: Contenido y SEO para IA

### 5.1 Página FAQ (Preguntas Frecuentes)

Agregar una sección FAQ en el sitio. Las IAs (ChatGPT, Gemini) usan FAQs como fuente principal.
Preguntas sugeridas:
- How much does a shower door installation cost in Miami?
- How long does a shower door installation take?
- Do you offer free estimates?
- What areas do you serve?
- Frameless vs framed shower doors — which is better?

Formato: Pregunta en H3 + respuesta clara de 40-60 palabras debajo.

### 5.2 Página "Sobre Nosotros" mejorada

Las IAs leen esta página para entender tu negocio. Asegurar que incluya:
- Historia real (2019, familiar, 1200+ proyectos)
- Servicios específicos
- Zonas de cobertura (Miami, Miami-Dade, Broward)
- Por qué confiar en ustedes

### 5.3 Estructurar para Featured Snippets

Google muestra "respuestas rápidas" en los resultados. Para aparecer:
- Usar formato de lista numerada o con viñetas
- Tablas comparativas
- Respuestas directas a preguntas comunes

---

## FASE 6 - SEO Continuo (Mantenimiento)

| Cada mes | Cada 3 meses |
|----------|-------------|
| Publicar 1-2 fotos nuevas en Google Business Profile | Actualizar páginas principales con contenido fresco |
| Responder reseñas de Google | Revisar Google Search Console (errores, consultas) |
| Revisar analytics (qué keywords traen tráfico) | Agregar 1-2 preguntas nuevas al FAQ |
| Compartir trabajos en Instagram/Facebook | Verificar backlinks nuevos |

---

## Resumen de archivos a modificar

| Archivo | Cambio necesario | Prioridad |
|---------|-----------------|-----------|
| `index.html` | Meta title, meta description, H1, hreflang, Schema JSON-LD | 🔴 Alta |
| `sitemap.xml` | Agregar más URLs | 🔴 Alta |
| `index.html` | Alt texts de imágenes con keywords | 🟡 Media |
| `index.html` | Agregar sección FAQ | 🟡 Media |
| `reviews.html` | Meta title | 🟢 Baja |
| — | Crear `robots.txt` | 🟡 Media |
| — | Google Search Console (configuración) | 🔴 Alta |
| — | Google Business Profile (optimización) | 🔴 Alta |

---

## Lista de herramientas gratuitas recomendadas

- **Google Keyword Planner** — keyword research
- **AnswerThePublic** — ideas de contenido preguntas
- **PageSpeed Insights** (pagespeed.web.dev) — velocidad
- **Google Search Console** — monitoreo de rastreo
- **Google Business Profile** — SEO local
- **Schema.org** — generador de datos estructurados
- **Yoast SEO / Rank Math** — si migras a WordPress algún día

---

*Plan basado en "Mini Guía de Posicionamiento en Google" por Juanes Digital (@juanes.digital)*
*Generado el junio 2026*
