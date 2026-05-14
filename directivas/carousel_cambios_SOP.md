# SOP: Carousel de Transformaciones Antes/Después

Este procedimiento detalla la implementación de un carousel de fotos antes/después en la sección "Historias Re·vive" de la landing page de RE.VIVE.

## Objetivos
1. Mostrar las transformaciones físicas de las clientas en un carousel editorial con fotos antes/después.
2. El carousel se ubica entre el título de la sección Testimonios y las tarjetas de testimonio.

## Entradas
- Archivo `index.html` (sección `#testimonios`, entre líneas 390-392).
- Archivo `styles.css` (nueva sección CSS antes de TESTIMONIOS).
- Archivo `script.js` (nueva lógica de carousel).
- Carpeta `assets/Cambios/` con fotos `{Nombre} Antes.{ext}` y `{Nombre} Después.{ext}`.

## Salidas
- Los tres archivos modificados con el carousel funcional.

## Pasos Lógicos
1. **HTML**: Insertar un bloque `<div class="cambios-carousel">` con un track de tarjetas, flechas de navegación y dots indicadores.
2. **CSS**: Estilar el carousel con scroll-snap, glassmorphism, y etiquetas posicionadas absolutamente.
3. **JS**: Implementar navegación por flechas, actualización de dots, auto-scroll con pausa en hover, y soporte touch/swipe.

## Personas en el Carousel (12)
Ariadna, Aurora, Carmelo, Hannah, Liz, María, Mayte, Noelia, Octavia, Sofía, Veronica, Victoria.

## Restricciones y Casos Borde
- **Nombres de archivo con caracteres especiales**: Las fotos de Hannah, Aurora y el resto con tildes (María, Sofía, Verónica) deben coincidir exactamente con los nombres de archivo en disco (`Después`).
- **Formatos mixtos**: Hannah usa `.png` para ambas fotos. Aurora usa `.png` para el antes y `.jpg` para el después. María, Victoria y Hannah son `.png`, el resto son mayoritariamente `.jpg`.
- **Aspect ratio**: Las fotos originales pueden tener aspect ratios distintos. Usar `object-fit: cover` para normalizar.
- **Scroll-snap en Safari**: Requiere `-webkit-overflow-scrolling: touch` para suavidad en iOS.
- **Performance**: Usar `loading="lazy"` en las imágenes para evitar cargar todas al inicio.
- **Responsive**: En mobile (<600px), las tarjetas deben ocupar casi todo el ancho del viewport. En tablet (<980px), mostrar 1.5 tarjetas visibles.
