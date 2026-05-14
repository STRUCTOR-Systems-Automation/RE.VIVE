# SOP: Ajustes de UI y Corrección de Errores

Este procedimiento detalla los ajustes visuales solicitados para la landing page de RE.VIVE.

## Objetivos
1. **Eliminar el indicador de scroll**: Remover el elemento con clase `hero__scroll` y sus componentes internos en la sección de inicio.
2. **Corregir texto en el Hero Badge**: Asegurar que la palabra "mindset" se lea correctamente y no se corte en la esfera animada.

## Entradas
- Archivo `index.html`.

## Salidas
- Archivo `index.html` modificado.

## Pasos Lógicos
1. **Remoción de Scroll**:
   - Localizar el bloque `<a href="#manifiesto" class="hero__scroll">...</a>` al final de la sección `#inicio`.
   - Eliminar el bloque completo.
2. **Corrección de Badge**:
   - Localizar el `<textPath>` dentro de `.hero__badge-ring`.
   - Verificar por qué se corta el texto "mindset". Si el código ya contiene la "t", es posible que el `path` del SVG sea demasiado corto o que falte espacio al final del texto para evitar solapamiento.
   - Ajustar el texto o el SVG según sea necesario para asegurar la visibilidad completa.

## Restricciones y Casos Borde
- **Layout**: La eliminación del scroll no debe afectar el espaciado vertical de la sección Hero de forma negativa.
- **SVG Rendering**: En textos circulares (`textPath`), si el texto no tiene un separador y espacio suficiente al final, la última letra puede solaparse con el inicio o ser cortada. 
  - **Solución**: Usar mayúsculas para mayor claridad visual y añadir siempre un separador (ej. ` · `) y un espacio al final de la cadena de texto para cerrar el loop sin solapamientos.
