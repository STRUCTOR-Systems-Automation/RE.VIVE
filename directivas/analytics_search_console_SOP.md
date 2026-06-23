# SOP: Google Analytics 4 y Google Search Console

Referencia operativa para el seguimiento, mantenimiento y uso de las herramientas de medición y posicionamiento del sitio RE·VIVE (`https://www.valeriagym.com`).

---

## 1. Credenciales e IDs

| Herramienta | Identificador | Valor |
|---|---|---|
| Google Analytics 4 | Measurement ID | `G-864XC1WLKF` |
| GA4 | Stream ID | `15125362431` |
| GA4 | Nombre del stream | `Valeriagym \| RE·VIVE` |
| Search Console | Propiedad | `https://www.valeriagym.com/` (Prefijo URL) |
| Search Console | Método de verificación | Google Analytics (automático vía gtag.js) |

> La verificación de Search Console depende del tag GA4 en el HTML. **Nunca eliminar el script de gtag.js** sin antes añadir otro método de verificación en Search Console (Impostazioni → Verifica della proprietà).

---

## 2. Instalación del tag GA4

El tag está insertado en el `<head>` de los 4 archivos HTML, como **primer elemento** tras `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-864XC1WLKF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-864XC1WLKF');
</script>
```

**Archivos que contienen el tag:**
- `index.html`
- `privacidad.html`
- `cookies.html`
- `aviso-legal.html`

Si se añade una nueva página HTML al proyecto, copiar el bloque anterior como primer elemento del `<head>`.

---

## 3. Cookies instaladas por GA4

| Cookie | Finalidad | Duración |
|---|---|---|
| `_ga` | Distingue usuarios únicos | 2 años |
| `_gid` | Identifica la sesión activa | 24 horas |
| `_ga_864XC1WLKF` | Estado de sesión para esta propiedad | 2 años |

Estas cookies están documentadas en `cookies.html` (sección 3). Si cambia el Measurement ID, actualizar también los nombres de cookies en esa página.

---

## 4. Configuración de GA4

| Ajuste | Estado |
|---|---|
| Misurazione avanzata | Activada |
| Eventos automáticos | Páginas vistas, scroll, clics de salida, búsquedas internas |
| Vinculación con Search Console | Activa desde 21 jun 2026 |
| IPs anonimizadas | Sí (comportamiento por defecto en GA4) |

---

## 5. Configuración de Search Console

| Ajuste | Valor |
|---|---|
| Propiedad | `https://www.valeriagym.com/` |
| Tipo | Prefijo URL |
| Sitemap enviado | `/sitemap.xml` — estado: Riuscita (1 página indexada) |
| Vinculación con GA4 | Activa desde 21 jun 2026 |

**Páginas excluidas del sitemap a propósito** (tienen `noindex`):
- `privacidad.html`
- `cookies.html`
- `aviso-legal.html`

---

## 6. Dónde ver los datos

### En Google Analytics 4
- **Tiempo real**: Rapporti → Tempo reale (visitantes activos ahora mismo)
- **Tráfico orgánico de búsqueda**: Rapporti → Acquisizione → Acquisizione traffico → filtrar por "Organic Search"
- **Datos de Search Console dentro de GA4**: Rapporti → Raccolta → Search Console (disponible ~48h tras la vinculación)

### En Google Search Console
- **Rendimiento en búsqueda**: Rendimento → Ricerca Web (impresiones, clics, CTR, posición media)
- **Indexación**: Indicizzazione → Pagine
- **Core Web Vitals**: Esperienza → Core Web Vitals

---

## 7. Mantenimiento periódico

| Frecuencia | Tarea |
|---|---|
| Mensual | Revisar Search Console → Rendimento: ¿qué keywords generan más impresiones? ¿ha bajado el CTR? |
| Mensual | Revisar Search Console → Indicizzazione → Pagine: ¿hay errores de indexación? |
| Mensual | Revisar GA4 → Tempo reale o Panoramica: confirmar que sigue recibiendo datos |
| Trimestral | Actualizar `<lastmod>` en `sitemap.xml` si se han hecho cambios relevantes en el contenido |
| Si se añade una página | Añadirla al `sitemap.xml` (solo si es indexable) y al tag GA4 en su `<head>` |

---

## 8. Cómo verificar que el tag funciona

1. Abre `https://www.valeriagym.com` en el navegador.
2. Ve a GA4 → Rapporti → Tempo reale.
3. Deberías aparecer como 1 usuario activo.

Alternativa con extensión de Chrome: instalar **Google Analytics Debugger** o usar las DevTools → Network → filtrar por `google-analytics` o `gtag`.

---

## 9. Trampas conocidas

- **No eliminar el script gtag.js**: Search Console usa ese tag para mantener la verificación de la propiedad. Si se elimina sin añadir otro método, se pierde el acceso.
- **Cambio de dominio**: Si el dominio cambia, hay que crear una nueva propiedad en Search Console y actualizar el Measurement ID o el canonical en GA4.
- **Datos vacíos las primeras 48 h**: Normal. Los informes de GA4 y la vinculación con Search Console tardan 24–48 horas en mostrar datos históricos.
- **Filtrar el tráfico propio**: Para evitar que las visitas del equipo contaminen los datos, añadir la IP de oficina como filtro en GA4 → Admin → Filtri dati → Filtro IP interno.
