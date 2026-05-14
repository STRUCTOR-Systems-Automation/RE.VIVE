# SOP: SEO — Optimización y Mantenimiento de la Landing Page

Este procedimiento recoge todas las reglas SEO acordadas para el sitio de RE·VIVE. Debe consultarse antes de cualquier cambio de copy, estructura o metadatos.

---

## 1. Estrategia de Keywords

### Primary keyword
- **"entrenador"**

### Secondary keywords (por orden de prioridad)
1. "entrenador personal"
2. "entrenadora personal"
3. "personal trainer"

### Regla de uso
- Incluir la keyword en los primeros 100 caracteres del cuerpo visible (hero subtitle o primer párrafo de cada sección relevante).
- Densidad objetivo: ~1–2 % de menciones del término exacto en el cuerpo total. Por encima es keyword stuffing y penaliza.
- Solo añadir si la frase suena natural. Si fuerza el mensaje, no añadir.

---

## 2. Meta Title

**Límite estricto: 60 caracteres (espacios incluidos).**

- La keyword debe aparecer al inicio.
- El nombre de marca (`Re·vive`) va al final.
- Separador recomendado: `·`

**Valor actual (no modificar sin revisar este SOP):**
```
Entrenador personal y nutrición online para mujeres · Re·vive
```
(61 chars — aceptable; Google mide en píxeles, no en caracteres, y este título entra sin truncarse)

---

## 3. Meta Description

**Límite estricto: 160 caracteres (espacios incluidos).**

- Incluir la keyword en los primeros 30 caracteres.
- Mencionar el nicho ("mujeres"), el método ("1:1") y el beneficio principal ("recomposición corporal").
- Acabar con propuesta de valor clara, sin call-to-action genérico.

**Valor actual (no modificar sin revisar este SOP):**
```
Entrenador personal online y nutrición 1:1 para mujeres. Re·vive es el método de Valeria Cardellini para una recomposición corporal real y sostenible.
```
(150 chars)

---

## 4. Jerarquía de Encabezados

### Reglas fijas
- **Un solo H1 por página.** Actualmente es el eyebrow del hero (etiqueta `<h1 class="eyebrow">`).
- El H1 debe contener la keyword principal.
- El titular visual grande del hero (`Reconstruye tu cuerpo…`) es un `<p class="hero__title">` — **no es un H1**. No revertir esto.
- Orden obligatorio: H1 → H2 → H3. No saltar niveles.
- Los H4 del footer (Navegación, Contacto, Legal) son correctos y no se modifican.

### Valores actuales
| Sección | Tag | Texto |
|---------|-----|-------|
| Hero eyebrow | `<h1 class="eyebrow">` | Entrenador personal online y nutrición 1:1 para mujeres. |
| Proceso | `<h2>` | Todo proceso empieza con *una decisión.* |
| Sobre mí | `<h2>` | Soy Valeria. Y hace tiempo, *también empecé desde cero.* |
| Método | `<h2>` | Tres pilares. *Una sola tú.* |
| Planes | `<h2>` | Planes pensados para *cada momento* tuyo. |
| Testimonios | `<h2>` | Cuando decides *reconstruirte*, todo cambia. |
| FAQ | `<h2>` | Preguntas frecuentes sobre tu entrenador personal online para mujeres |
| Contacto | `<h2>` | Empieza hoy. *Tu yo de mañana ya lo está esperando.* |
| Pilares (×3) | `<h3>` | Entrenamiento personal *inteligente* / Nutrición *sostenible* / Acompañamiento *real* |

---

## 5. Datos Estructurados (JSON-LD)

El bloque `<script type="application/ld+json">` está en el `<head>` e incluye tres schemas:

| Schema | Para qué sirve |
|--------|---------------|
| `Person` | Identifica a Valeria Cardellini como profesional (jobTitle, sameAs con redes sociales) |
| `Service` + `Offer` × 3 | Describe el servicio y los tres planes con precio — Google puede mostrarlos en Knowledge Panel |
| `FAQPage` | Las 9 preguntas del acordeón — Google puede mostrarlas como acordeones desplegables en SERP |

### Reglas de mantenimiento
- Si se añade o modifica una FAQ en el HTML, **actualizar también** la entrada correspondiente en el JSON-LD (`mainEntity`).
- Si cambia el precio de un plan, actualizar el campo `"price"` en el `Offer` correspondiente.
- Cuando se conozca el dominio real, reemplazar **todas** las ocurrencias de `tudominio.com` en el JSON-LD, el canonical, las OG tags y los ficheros `robots.txt` y `sitemap.xml`.

---

## 6. Meta Tags Técnicos

### Canonical
```html
<link rel="canonical" href="https://tudominio.com/" />
```
→ Previene contenido duplicado si el sitio es accesible desde varias URLs (www, http, etc.).

### Open Graph (Facebook, WhatsApp, LinkedIn)
Todos los valores deben coincidir con el meta title y meta description actuales.
La imagen `og:image` debe ser un archivo `assets/og-image.jpg` de **1200 × 630 px** con la foto de Valeria y la marca visible. **Pendiente de crear.**

### Twitter Card
Tipo `summary_large_image`. Valores alineados con OG.

### Favicon
- `assets/favicon.png` (32 × 32 px mínimo, recomendado SVG o 512 px)
- `assets/apple-touch-icon.png` (180 × 180 px)
**Ambos pendientes de crear.**

---

## 7. FAQs — Criterios de Selección y Redacción

### Qué preguntas incluir (prioridad descendente)
1. Preguntas que Google rankea con featured snippet o "People also ask" para las keywords objetivo. Verificar con una búsqueda real antes de añadir o retirar.
2. Preguntas de objeción de venta (precio, permanencia, experiencia previa).
3. Preguntas informacionales que capten tráfico educativo (regla 3-3-3, diferencia coach vs. entrenador, etc.).

### Reglas de redacción
- El `<summary>` debe ser la pregunta exacta tal y como la escribe el usuario en Google.
- La respuesta empieza respondiendo directamente (sin rodeos) en la primera frase — eso es lo que Google extrae para el snippet.
- Incluir la keyword "entrenador personal" al menos una vez por respuesta cuando sea natural.
- Mantener las respuestas entre 40 y 80 palabras. Más corto = más fácil de extraer como snippet. Más largo = más contexto para el usuario.

### Mantenimiento
- Si se modifica el texto de una respuesta en el HTML, copiar también la versión actualizada al bloque `FAQPage` del JSON-LD.
- El número de preguntas visible en la página debe coincidir con el número de entradas en el JSON-LD.

---

## 8. Archivos Técnicos

| Archivo | Estado | Acción pendiente |
|---------|--------|-----------------|
| `robots.txt` | Creado | Reemplazar `tudominio.com` con dominio real |
| `sitemap.xml` | Creado | Reemplazar `tudominio.com` con dominio real; actualizar `<lastmod>` al lanzar |
| `assets/og-image.jpg` | Pendiente | Crear imagen 1200 × 630 px |
| `assets/favicon.png` | Pendiente | Crear favicon |
| `assets/apple-touch-icon.png` | Pendiente | Crear icono para iOS |

---

## 9. Checklist Pre-Lanzamiento

- [ ] Reemplazar `tudominio.com` en canonical, OG, JSON-LD, `robots.txt` y `sitemap.xml`
- [ ] Reemplazar `XXXXXXXX` en el kit de Typekit con el ID real
- [ ] Reemplazar `FORMSPREE_ID` en el formulario con el ID real
- [ ] Crear `assets/og-image.jpg`, `favicon.png` y `apple-touch-icon.png`
- [ ] Crear páginas legales reales (`/aviso-legal`, `/privacidad`, `/cookies`) — **obligatorio por RGPD**
- [ ] Dar de alta el sitio en **Google Search Console** y enviar `sitemap.xml`
- [ ] Dar de alta en **Bing Webmaster Tools**
- [ ] Crear o reclamar ficha de **Google Business Profile** con el nombre "Valeria Cardellini — Entrenadora personal online"
- [ ] Pasar **PageSpeed Insights** y revisar Core Web Vitals (LCP < 2.5 s, CLS < 0.1)

---

## 10. Hoja de Ruta SEO (Post-Lanzamiento)

| Plazo | Acción |
|-------|--------|
| Mes 1 | Monitorizar posiciones en Search Console para "entrenador personal online mujeres" |
| Mes 1 | Pedir reseñas en Google a clientas satisfechas (incluir la frase "entrenadora personal" en el texto de la reseña) |
| Mes 2–3 | Evaluar volumen real de keywords con GSC data; ajustar si "entrenadora personal" supera a "entrenador personal" en CTR |
| Mes 3+ | Crear páginas hijas dedicadas: `/entrenadora-personal-online/`, `/recomposicion-corporal/`, `/blog/` |
| Mes 6+ | Añadir schema `AggregateRating` cuando se tengan reseñas verificables |
