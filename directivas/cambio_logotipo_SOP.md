# SOP: Cambio de Logotipo

Este procedimiento detalla los pasos para actualizar el logotipo en el proyecto RE.VIVE.

## Objetivos
- Sustituir el logotipo actual (`assets/re · vive 2.png`) por la nueva versión (`revive logo 3.png`).
- Eliminar el fondo blanco del nuevo logotipo para que sea transparente y se integre con el diseño.
- Mantener la organización de archivos moviendo el nuevo logo a la carpeta `assets/`.
- Asegurar que todas las referencias en el HTML apunten al nuevo archivo.

## Entradas
- Nuevo archivo de imagen: `assets/revive logo 3.png` (se encontraba inicialmente en la carpeta de assets).

## Salidas
- Archivo movido y procesado: `assets/revive-logo-transparent.png` (sin fondo).
- Archivo modificado: `index.html`.

## Pasos Lógicos
1. **Preparación de Archivo**:
   - Renombrar y mover `revive logo 3.png` a `assets/revive-logo-3.png` para evitar problemas con espacios en URLs y mantener el orden.
2. **Actualización de Referencias**:
   - Buscar todas las etiquetas `<img>` que actúan como logo (clases `nav__logo` y `footer__logo`).
   - Cambiar el atributo `src` de `assets/re · vive 2.png` a `assets/revive-logo-3.png`.
3. **Verificación**:
   - Comprobar visualmente que el logo carga correctamente en el encabezado y pie de página.

## Restricciones y Casos Borde
- **Ubicación inicial**: El archivo puede estar en la raíz o en `assets/`. El script debe verificar ambas.
- **Espacios en nombres**: Los archivos con espacios como `revive logo 3.png` causan problemas en URLs. Se debe normalizar a `revive-logo-3.png`.
- **Fondo Blanco**: El archivo original puede venir con un fondo blanco sólido. Se debe procesar con un script de Python (Pillow) para convertir el fondo blanco en transparencia (canal Alpha).
- **Cache del navegador**: Cambiar el nombre del archivo es la mejor forma de invalidar la cache.
- **Alt Text**: Mantener el texto alternativo descriptivo "RE.vive".
