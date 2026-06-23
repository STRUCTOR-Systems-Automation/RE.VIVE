# SOP: Consentimiento de Cookies y Términos de Contratación

Procedimiento y especificación para remover el tracking no consentido e integrar los términos y condiciones de contratación en RE·VIVE.

---

## 1. Contexto y Objetivos
Para cumplir estrictamente con el RGPD, LSSI-CE y la Directiva ePrivacy en España, no se debe cargar ninguna cookie ni script de seguimiento no esencial (Google Analytics 4, Meta Pixel) antes del consentimiento expreso del usuario.

Actualmente, estos scripts se cargan estáticamente en el `<head>` de los archivos HTML auxiliares (`privacidad.html`, `cookies.html`, `aviso-legal.html`). Deben ser removidos para que la carga sea manejada dinámicamente de forma centralizada por `script.js` (solo si el consentimiento es "all").

Adicionalmente, se actualizarán los datos de contacto y se integrarán las condiciones de contratación en `aviso-legal.html` por petición de la propietaria de la web.

---

## 2. Archivos Afectados
* `aviso-legal.html`
* `cookies.html`
* `privacidad.html`

---

## 3. Especificaciones del Script de Modificación
Se creará un script de Python `scripts/consentimiento_y_terminos.py` para automatizar las siguientes modificaciones:

### A. Remoción de Tracking Estático (En todos los HTML indicados)
Buscar y eliminar los siguientes bloques del `<head>`:
1. Bloque de Google Analytics (gtag.js):
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

2. Bloque de Meta Pixel:
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

### B. Actualización de aviso-legal.html
1. **Datos Identificativos (Sección 1):**
Reemplazar la lista actual:
```html
      <ul>
        <li><strong>Titular:</strong> Valeria Cardellini</li>
        <li><strong>Actividad:</strong> Servicios de entrenamiento personal online y asesoramiento nutricional para mujeres bajo la marca Re·vive.</li>
      </ul>
```
Por los datos actualizados:
```html
      <ul>
        <li><strong>Titular:</strong> Valeria Cardellini</li>
        <li><strong>Nombre comercial:</strong> Re•Vive</li>
        <li><strong>NIE:</strong> Z0556971-P</li>
        <li><strong>Correo electrónico:</strong> valeriagymcontact@gmail.com</li>
        <li><strong>Actividad:</strong> Servicios de entrenamiento personal online y asesoramiento nutricional para mujeres bajo la marca Re·vive.</li>
      </ul>
```

2. **Términos y Condiciones de Contratación:**
Añadir antes del cierre del bloque `<div class="legal__body reveal">` (después de la sección 8 de legislación aplicable) la nueva sección de términos de contratación utilizando etiquetas semánticas y la misma estructura visual del resto del documento.

---

## 4. Verificación
* Validar que ningún archivo HTML modificado contenga los strings de tracking estáticos (`gtag`, `fbq`) en su código fuente.
* Validar que las páginas carguen correctamente y no se rompa la maquetación.
* Verificar visualmente la visualización de los datos identificativos y la nueva sección en `aviso-legal.html`.
