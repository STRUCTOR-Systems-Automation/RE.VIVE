# SOP — Depuración de Formulario y Webhook

## Objetivo
Resolver el error en el envío del formulario de contacto y asegurar que la comunicación de error sea consistente con el diseño (email del footer).

## Entradas
- `index.html`: Contiene la estructura del formulario y el email del footer.
- `script.js`: Contiene la lógica de envío (`fetch`) y los mensajes de alerta.
- Webhook de n8n: `https://structor-systems-automation-n8n.45kxje.easypanel.host/webhook-test/RE·VIVE`.

## Lógica y Pasos
1. **Validación de Consistencia**:
   - El email en el mensaje de error (`alert`) debe ser el mismo que en el footer (`valeriagymcontact@gmail.com`).
   - Actualmente en `script.js` figura `hola@revive.coach`.

2. **Verificación del Webhook**:
   - Confirmar que el endpoint en el `action` del formulario coincide con el proporcionado por n8n.
   - Verificar si el carácter especial `·` en la URL causa problemas de codificación.
   - Comprobar la configuración de CORS en n8n si el error persiste.

3. **Pruebas de Envío**:
   - El script envía un JSON. Asegurar que el nodo Webhook en n8n esté configurado para recibir JSON (no solo Form-Data).

## Hallazgos de Investigación
- **Workflow ID**: `OQ5LFouDyxvr9Pux` ("Lead Capture - RE·VIVE Web (Notion)").
- **Estado**: **Inactivo**. Los webhooks de n8n no responden si el workflow está inactivo, a menos que sea una URL de test con un listener activo.
- **URL de Test**: La URL `.../webhook-test/...` en `index.html` es correcta según la captura, pero solo funcionará si el usuario pulsa "Listen for Test Event" en n8n.
- **Email Inconsistente**: El `alert` de error apuntaba a `hola@revive.coach`, mientras que el footer usa `valeriagymcontact@gmail.com`. Se ha corregido en `script.js`.

## Restricciones y Casos Borde
- **CORS**: Las peticiones desde dominios locales o diferentes suelen fallar si no hay cabeceras `Access-Control-Allow-Origin`. El nodo de n8n tiene `*`, lo cual es correcto.
- **N8N Test URL**: Recordar que la URL `/webhook-test/` solo funciona si el flujo está en modo "Listen" en el editor de n8n. **Para producción, se debe activar el flujo y usar `/webhook/` (sin `-test`).**
- **Caracteres Especiales**: El punto medio `·` en `RE·VIVE` es válido pero puede ser sensible a la codificación del navegador.

## Notas de Memoria
- *Por definir tras la resolución.*
