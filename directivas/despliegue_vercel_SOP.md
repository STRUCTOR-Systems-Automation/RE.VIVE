# SOP: Despliegue de Sitio Estático en Vercel

## Objetivo
Desplegar de manera exitosa y profesional el sitio web estático RE·VIVE en la plataforma Vercel, asegurando que todos los recursos (HTML, CSS, JS, Assets) se carguen correctamente y el sitio sea accesible para el cliente.

## Entradas
- Archivos estáticos en la raíz: `index.html`, `styles.css`, `script.js`.
- Carpeta de recursos: `assets/`.
- Archivos legales y SEO: `aviso-legal.html`, `cookies.html`, `privacidad.html`, `robots.txt`, `sitemap.xml`.

## Lógica y Pasos
1. **Validación de Estructura**: Asegurar que todos los enlaces en el HTML sean relativos y correctos para un entorno de producción.
2. **Configuración de Vercel**:
    - Crear un archivo `vercel.json` en la raíz para optimizar el rendimiento (caching) y asegurar que las rutas funcionen sin extensiones .html si se desea (Clean URLs).
3. **Automatización de GitHub**:
    - Inicializar Git localmente.
    - Crear un archivo `.gitignore` para evitar subir archivos temporales o innecesarios.
    - Usar la GitHub CLI (`gh`) para crear el repositorio remoto.
    - Realizar el primer commit y push.
4. **Despliegue**:
    - Una vez en GitHub, conectar con Vercel para despliegue automático.

## Restricciones / Casos Borde
- **Autenticación**: El script fallará si el usuario no ha iniciado sesión en `gh` (GitHub CLI).
- **Nombre del Repo**: El nombre debe ser único en la cuenta de GitHub del usuario.
- **Git Config**: Se asume que `git config --global user.email` y `name` están configurados.
- **Rutas de Imágenes**: Vercel distingue entre mayúsculas y minúsculas en sus servidores. Asegurar que `Assets/Logo.png` no se llame `assets/logo.png` en el código.
- **Cache**: Si se actualizan estilos, el navegador puede cachear el CSS viejo. Se recomienda usar versionado o headers de cache cortos durante la fase de feedback con el cliente.
- **404 Custom**: Vercel buscará un archivo `404.html` por defecto. Si no existe, mostrará la página estándar de Vercel.

## Trampas Conocidas
- Olvidar incluir la carpeta `assets/` en el despliegue si se hace manualmente.
- No configurar las "Clean URLs", lo que obliga al usuario a escribir `.html` al final de la URL.
