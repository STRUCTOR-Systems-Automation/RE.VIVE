# Guía: Seguridad Básica para Proyectos Web

## Objetivo
Checklist de buenas prácticas de seguridad aplicable a cualquier proyecto web (sitio estático + formulario + automatizaciones tipo n8n/Zapier/Make), basado en las medidas implementadas en RE·VIVE. Pensado para poder reutilizarse en futuros proyectos sin tener que repensar todo desde cero.

## 1. Repositorio en GitHub
- Un repositorio **público** está bien para código frontend (HTML/CSS/JS) — no es un riesgo en sí mismo, es necesario para desplegar gratis en Vercel/Netlify.
- **NUNCA subir al repo**: API keys, URLs de webhooks con tokens/IDs sensibles, contraseñas, archivos `.env`.
- `.gitignore` debe incluir siempre: `.env`, `.env.local`, `.env.*.local`, `node_modules/`.
- Si un token (Personal Access Token, API key, etc.) queda expuesto (ej. en `git remote -v`, en un commit antiguo, en una captura compartida), hay que **rotarlo** (revocarlo y generar uno nuevo) lo antes posible. Borrar el commit no basta — el historial puede seguir accesible.

## 2. Formularios y datos de usuarios
- **Nunca** apuntar el `action` de un formulario directamente a un webhook externo (n8n, Zapier, Make, etc.) desde el HTML — expone esa URL (y cualquier ID/token que contenga) a quien vea el código fuente de la página.
- Usar una **función serverless** como intermediaria (ej. `/api/contact` en Vercel): el frontend llama a esa ruta propia, y la función (que corre en el servidor, no es visible públicamente) reenvía los datos al webhook real usando variables de entorno.
- **Validar y sanitizar** todos los campos en el backend (campos requeridos, longitud máxima, tipos de dato) — nunca confiar solo en la validación del navegador, que se puede saltar fácilmente.
- Añadir un **honeypot**: un campo de formulario oculto (invisible para personas) que, si llega relleno, indica que fue un bot y se descarta el envío.

## 3. Variables de entorno y secretos
- Cualquier dato sensible (URLs de producción, contraseñas, tokens, claves de API) va en **variables de entorno**, nunca escrito directamente en el código.
- En Vercel: *Project Settings → Environment Variables*. Marcar el entorno **Production** (y Preview/Development si aplica) para que la web en vivo las use. Activar la opción **"Sensitive"** para secretos.
- Generar secretos aleatorios largos con herramientas como `openssl rand -hex 32`.
- **Guardar una copia** de los secretos en un lugar privado y seguro (gestor de contraseñas, o una nota privada con verificación en dos pasos activada) — una vez marcados como "Sensitive" en Vercel, no se pueden volver a consultar, solo cambiar.

## 4. Autenticación entre servicios (webhooks)
- Si un servicio llama a otro (frontend → n8n, n8n → Notion, etc.), proteger la llamada con un **header secreto** (ej. `x-webhook-secret`). El receptor debe rechazar cualquier petición que no incluya el valor correcto.
- Usar siempre la URL de **producción** del webhook (no la de "test"/"listen"), y mantener el flujo/automatización **activo**.

## 5. Cabeceras de seguridad HTTP (`vercel.json` o equivalente)
- `Strict-Transport-Security` (HSTS): fuerza el uso de HTTPS.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`: evita que el sitio se cargue dentro de un iframe de otra web (clickjacking).
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: deshabilitar permisos del navegador que no se usen (cámara, micrófono, geolocalización, pagos).
- Para rutas de API (`/api/*`): `Cache-Control: no-store`, para que las respuestas no se guarden en caché.

## 6. Cuentas y accesos
- Activar **verificación en dos pasos (2FA)** en todas las cuentas del proyecto: GitHub, Vercel, Notion, n8n/automatizaciones, registrador del dominio, etc.
- No compartir páginas o notas con secretos con personas que no los necesiten.
- Revisar de vez en cuando quién tiene acceso al repositorio, al proyecto de Vercel y a las bases de datos conectadas.

## 7. Entornos separados (pruebas vs producción)
- Cuando sea posible, usar webhooks/bases de datos distintos para pruebas y para producción, para no mezclar datos de prueba con datos reales de clientes.
- En Vercel, una misma variable (ej. `N8N_WEBHOOK_URL`) puede tener un valor distinto por entorno (Production / Preview / Development), así que se puede tener una versión de prueba sin tocar la real.

## Checklist rápido antes de lanzar un sitio
- [ ] `.gitignore` incluye los archivos `.env`
- [ ] No hay tokens, contraseñas ni URLs sensibles escritas en el código fuente
- [ ] El formulario pasa por una función serverless (proxy), no va directo a servicios externos
- [ ] Variables de entorno configuradas en Vercel con "Production" marcado
- [ ] Secretos guardados en un lugar seguro y privado (gestor de contraseñas)
- [ ] Webhook protegido con header secreto
- [ ] Cabeceras de seguridad configuradas en `vercel.json`
- [ ] 2FA activado en GitHub, Vercel y servicios conectados (Notion, n8n, etc.)
- [ ] Cualquier token expuesto fue rotado/revocado
