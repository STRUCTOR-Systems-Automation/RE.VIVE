# SOP: Meta Pixel

Referencia operativa para el seguimiento, mantenimiento y uso del Píxel de Meta en el sitio RE·VIVE (`https://www.valeriagym.com`).

---

## 1. Credenciales e IDs

| Herramienta | Identificador | Valor |
|---|---|---|
| Meta Pixel | Pixel ID | `1314889470815389` |
| Meta Pixel | Nombre del dataset | `Valeriagym_RE-VIVE` |
| Meta Business | Cuenta | `Valeria.gym (1694463681...)` |

---

## 2. Código base instalado

El siguiente bloque está insertado en el `<head>` de los 4 archivos HTML, **justo después del tag de GA4**:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1314889470815389');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1314889470815389&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

**Archivos que contienen el pixel:**
- `index.html`
- `privacidad.html`
- `cookies.html`
- `aviso-legal.html`

Si se añade una nueva página HTML al proyecto, copiar el bloque anterior después del tag de GA4 en su `<head>`.

---

## 3. Eventos configurados

| Evento | Dónde se dispara | Cómo está implementado |
|---|---|---|
| `PageView` | Todas las páginas | Automático en el código base (`fbq('track', 'PageView')`) |

### Eventos recomendados a añadir en el futuro

| Evento | Cuándo añadirlo | Código a insertar |
|---|---|---|
| `Lead` | Al enviar el formulario de contacto con éxito | `fbq('track', 'Lead');` en el callback de éxito del formulario |
| `Contact` | Al hacer clic en el email o WhatsApp | `fbq('track', 'Contact');` en el `onclick` del enlace |
| `ViewContent` | Al hacer scroll al 50% de la página principal | Implementar con IntersectionObserver |

---

## 4. Coincidencias avanzadas automáticas

Las coincidencias avanzadas permiten a Meta emparejar eventos del sitio con perfiles de usuarios mediante datos hasheados (cifrados SHA-256 antes de enviarse). Nunca se envían datos en texto plano.

**Para activarlas** (se hace desde Events Manager, no en el código):
1. Ir a **Events Manager → Datasets → Valeriagym_RE-VIVE → Settings**
2. Activar **"Automatic advanced matching"**
3. Activar los parámetros: **Email**, **Phone number**, **First and last name**
4. Dejar desactivados: Gender, City/State/ZIP, Country, Date of birth (no se recogen en el formulario)

**Qué datos recoge el formulario actual:**
- Email (`input[type="email"]`) — se hashea y envía automáticamente
- Nombre (`input[name="nombre"]`) — se hashea y envía automáticamente

> Meta cifra estos datos automáticamente mediante JavaScript antes de enviarlos. No se envían en texto plano en ningún momento.

---

## 5. Cookies instaladas por Meta Pixel

| Cookie | Finalidad | Duración |
|---|---|---|
| `_fbp` | Identifica navegadores para medir y optimizar campañas | 90 días |
| `fr` | Cookie publicitaria principal de Meta para anuncios relevantes | 90 días |

Estas cookies están documentadas en `cookies.html` (sección 3). Si cambia el Pixel ID, actualizar también los nombres/IDs en esa página.

---

## 6. Cumplimiento RGPD (obligatorio en España)

El Píxel de Meta es una cookie de **marketing**, categoría que **requiere consentimiento previo** del usuario según el RGPD y la LOPDGDD.

### Estado actual
El pixel se dispara en carga de página sin esperar consentimiento. Esto es técnicamente incompleto para el RGPD.

### Implementación correcta (pendiente)
Condicionar el disparo del pixel al consentimiento del usuario desde el banner de cookies:

```javascript
// Disparar el pixel SOLO si el usuario acepta cookies de marketing
function initMetaPixel() {
  fbq('init', '1314889470815389');
  fbq('track', 'PageView');
}

// Llamar a initMetaPixel() únicamente tras aceptar cookies de marketing
// Integrar con la lógica del banner de cookies existente en script.js
```

### Acciones pendientes para cumplimiento completo
- [ ] Condicionar `fbq('init', ...)` a la aceptación de cookies de marketing en el banner
- [ ] Añadir enlace a la política de privacidad de Meta en el banner de cookies
- [ ] Revisar y aceptar las **Meta Business Tools Terms** desde el Business Manager

---

## 7. Dónde ver los datos

### En Meta Events Manager
- **Actividad en tiempo real**: Events Manager → Datasets → Valeriagym_RE-VIVE → Overview
- **Test de eventos**: Events Manager → Test events → introducir la URL del sitio
- **Diagnóstico**: Events Manager → Diagnostics (errores o advertencias del pixel)

### En Meta Ads Manager (cuando haya campañas activas)
- Rendimiento de anuncios con atribución de conversiones
- Audiencias personalizadas basadas en visitantes del sitio

---

## 8. Verificar que el pixel funciona

**Método 1 — Events Manager:**
1. Ir a Events Manager → Datasets → Valeriagym_RE-VIVE → Test events
2. Introducir `https://www.valeriagym.com` y hacer clic en "Open website"
3. Debe aparecer el evento `PageView` en tiempo real

**Método 2 — Extensión de Chrome:**
1. Instalar **Meta Pixel Helper** (extensión oficial de Meta para Chrome)
2. Visitar `https://www.valeriagym.com`
3. El icono de la extensión debe mostrar el Pixel ID `1314889470815389` y el evento `PageView` activo

---

## 9. Trampas conocidas

- **No eliminar el bloque del pixel** — si se elimina, todas las campañas de Meta perderán atribución de conversiones y las audiencias personalizadas dejarán de actualizarse.
- **No duplicar el código** — el pixel tiene una guardia `if(f.fbq)return` pero duplicarlo puede causar doble conteo de eventos.
- **Cambio de Pixel ID** — si se crea un nuevo dataset en Meta, hay que actualizar el ID en los 4 archivos HTML y en la política de cookies.
- **Bloqueadores de anuncios** — uBlock Origin, AdBlock y similares bloquean el pixel en el navegador. Los datos de Events Manager siempre serán una estimación por debajo del tráfico real. La Conversions API (server-side) resuelve este problema si en el futuro se implementa.
- **Datos de las primeras 24–48 h** — Meta tarda hasta 48 horas en procesar y mostrar datos históricos en los informes de campañas.
