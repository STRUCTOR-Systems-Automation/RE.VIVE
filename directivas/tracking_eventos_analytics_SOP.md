# SOP: Tracking de Eventos Personalizados en Google Analytics 4

Este procedimiento detalla la implementación y el registro de eventos de conversión (leads y chats de WhatsApp) en Google Analytics 4 (GA4) para el sitio de RE·VIVE.

## Objetivos
1. **Trackeo de Leads**: Registrar un evento `generate_lead` en GA4 cuando un usuario envía exitosamente el formulario de contacto.
2. **Trackeo de WhatsApp**: Registrar un evento `contact` con el método `WhatsApp` en GA4 cuando un usuario hace clic en el botón flotante de WhatsApp.
3. **Mantenimiento**: Mantener la coherencia del sistema y documentar estos eventos para futuras referencias.

## Entradas
- Archivo `script.js`
- Archivo `directivas/analytics_search_console_SOP.md`

## Salidas
- Archivo `script.js` modificado con los eventos de GA4.
- Archivo `directivas/analytics_search_console_SOP.md` actualizado para incluir la documentación de los eventos personalizados.

## Pasos Lógicos
1. **Modificación de script.js (Formulario)**:
   - Localizar el callback de éxito de envío del formulario de contacto (`contactForm.addEventListener("submit", ...)` donde se comprueba `res.ok`).
   - Agregar el evento `generate_lead` a GA4 utilizando `gtag("event", "generate_lead", { ... })` tras verificar que `gtag` está definido en el ámbito global.
2. **Modificación de script.js (WhatsApp)**:
   - Localizar el listener de clic en `waBubble` (`waBubble.addEventListener("click", ...)`).
   - Agregar el evento `contact` con el parámetro `{ method: "WhatsApp" }` a GA4 utilizando `gtag("event", "contact", { ... })`.
3. **Actualización de Documentación**:
   - Modificar la directiva `directivas/analytics_search_console_SOP.md` para incluir la sección de eventos personalizados configurados, describiendo los nombres y el comportamiento de `generate_lead` y `contact`.

## Restricciones y Casos Borde
- **Verificación de la función `gtag`**: Antes de invocar `gtag()`, comprobar siempre `typeof gtag === "function"` para evitar errores de ejecución en navegadores con bloqueadores de anuncios o si el usuario rechazó las cookies (en cuyo caso GA4 no se inicializa).
- **Consentimiento de Cookies**: Asegurarse de que el código solo se ejecuta si GA4 ha sido cargado. La lógica de consentimiento existente en `script.js` ya se encarga de esto llamando a `loadAnalytics()` si el consentimiento es "all".
