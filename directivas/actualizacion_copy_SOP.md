# SOP: Actualización de Copy en Landing Page

Este procedimiento detalla la actualización de textos específicos en la landing page de RE.VIVE para reflejar la nueva propuesta de valor.

## Objetivos
1. Actualizar el mensaje de la sección de pilares para enfatizar la educación en hábitos y la sostenibilidad a largo plazo.

## Entradas
- Archivo `index.html`.

## Salidas
- Archivo `index.html` con los textos actualizados.

## Pasos Lógicos
1. **Identificar el Texto Actual**:
   - Buscar el párrafo con clase `section-lead` que contiene: "No vendemos rutinas genéricas. Construimos un sistema vivo, hecho a tu medida, que evoluciona contigo cada semana."
2. **Reemplazar el Texto**:
   - Sustituir el lead de pilares por: "No trabajamos con rutinas genéricas. Construimos un sistema a tu medida que evoluciona contigo y te enseña a crear hábitos que puedas mantener toda la vida."
   - Sustituir el título de FAQ por: "Preguntas frecuentes sobre entrenador personal"

## Restricciones y Casos Borde
- **Preservación de Clases**: No modificar la clase `section-lead` ni la estructura HTML circundante.
- **Codificación**: Asegurar que los caracteres especiales (tildes, etc.) se guarden correctamente en formato UTF-8.
- **Idempotencia**: El script debe poder ejecutarse varias veces sin causar daños si el texto ya ha sido cambiado.
- **Formato de Testimonios**: Los testimonios reales no incluyen el texto de duración en meses (ej. `<span>4 meses</span>`). El avatar utiliza la etiqueta `<img>` vinculada a `assets/Testimonios/profile pics/Nombre.jpg` en lugar de un círculo div con iniciales, y las partes clave del texto se resaltan usando `<mark>`.
