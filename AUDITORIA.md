# Auditoría de antlopsou.dev

11 de noviembre de 2026. Revisión del portfolio de Antonio López Soult en español e inglés. La referencia inicial es el despliegue del commit `6d85dce`. El objetivo del rediseño es que una persona interesada pueda entender qué desarrolla Antonio, examinar una muestra de su trabajo y contactar con él.

## Hallazgos y correcciones

| Área | Observación inicial | Cambio comprobado |
| --- | --- | --- |
| Presentación profesional | El titular genérico ocupaba la portada y había que recorrer varias secciones para encontrar el contacto. | La portada identifica al profesional, su especialidad y su ubicación. Los accesos a proyectos y contacto aparecen desde la primera pantalla. La sección de servicios concreta qué trabajo se puede contratar. |
| Credibilidad | El carrusel llegaba a mostrar diez copias de un mismo testimonio. Dos proyectos mostraban claves de traducción y las dos demos existentes devolvían 500. | Tres fichas en ambos idiomas describen lo que se desarrolló y lo ilustran con capturas. ConsultIA enlaza a su demostración pública. Kollab y Meridian se pueden examinar dentro del portfolio. La trayectoria identifica los clientes finales y las funciones que figuran en los CV actualizados. |
| Navegación y contacto | Había cuatro elementos de enlace sin destino ni texto y botones anidados en enlaces. | Cada tarjeta enlaza a una ficha con URL propia. Se puede pasar al siguiente caso, regresar a la colección, descargar el CV del idioma elegido, abrir el correo o copiar su dirección. |
| Accesibilidad | La portada tenía 15 encabezados de primer nivel. El lila sobre blanco del titular alcanzaba 1,94:1. El contenido dependía en parte de animaciones de entrada. | Cada página tiene un único H1. Hay salto al contenido, regiones de navegación, foco visible, textos alternativos, dos temas y soporte para movimiento reducido. El menú y la búsqueda en la terminal se pueden usar con teclado. |
| Rendimiento | El fondo SVG transfería por sí solo unos 2,59 MiB. El inicio cargaba WebGL, notificaba errores geométricos y precargaba dos imágenes inexistentes. | La página se genera estáticamente. El ordenador de portada y las capturas se sirven en WebP, las fuentes se alojan en el proyecto y la interacción principal funciona sin WebGL. |
| Buscadores y enlaces compartidos | El título y la descripción repetían «antlopsou porfolio». Faltaban URL canónicas, tarjetas sociales, sitemap y robots.txt. | Las ocho páginas tienen títulos y descripciones propios, URL canónicas y alternancias de idioma. Se verificaron el sitemap, robots.txt y las tarjetas sociales. |
| Dependencias | El análisis del manifiesto original identificó 13 paquetes de producción afectados, uno de gravedad crítica. | Next.js 16.4.6, React 19.3.1 y un lockfile reproducible. npm audit informó de cero vulnerabilidades conocidas en el árbol instalado en la fecha de la revisión. |

## Medición de carga inicial del primer rediseño

| Medida | Web anterior | Rediseño | Reducción |
| --- | ---: | ---: | ---: |
| Total, escritorio en español | 4.102,5 KiB | 268,2 KiB | 93,5 % |
| Total, móvil en inglés | 4.102,3 KiB | 235,5 KiB | 94,3 % |
| JavaScript, ambos tamaños | 792,1 KiB | 144,4 KiB | 81,8 % |
| Recursos solicitados, además del documento | 35 | 15 | 57,1 % |

## Cómo se verificó

- Chromium en contextos nuevos, con escritorio de 1365 × 900 y móvil de 390 × 844. La comparación de carga usa los bytes transferidos por el documento y los recursos durante los primeros 5,5 segundos, sin desplazamiento. Las mediciones corresponden al despliegue anterior y a una compilación local de producción del rediseño.
- Se comprobó el comportamiento entre 320 y 1920 píxeles, la navegación con teclado, el foco al cerrar el menú y la terminal, la búsqueda sin resultados y el acceso a un proyecto mediante Intro.
- Se recorrieron las dos portadas y las seis fichas, se probaron el cambio de idioma dentro de un caso, la persistencia del tema, la copia de correo y las descargas de ambos PDF. Se verificaron las respuestas 404 de idioma y proyecto inexistentes.
- Se ejecutaron ESLint, comprobación de tipos, compilación de producción y npm audit. Doce comprobaciones con axe sobre la portada, la terminal abierta y la ficha de ConsultIA en ambos idiomas y temas dieron cero infracciones automáticas. Las pruebas de contacto comprobaron los destinos y el portapapeles, sin enviar mensajes.

Estas cifras corresponden a la revisión `f3a8c0e`. La conversión a solicitudes de contratación requiere datos de visitas y consultas posteriores al lanzamiento.

## Revisión editorial del 12 de noviembre de 2026

La portada y las fichas comparten un fondo fijo con dos encuadres. La dirección visual toma como referencia la alternancia de imagen a toda anchura y secciones tipográficas de la [web de Inditex](https://www.inditex.com/itxcomweb/es/es/home). Usamos la foto original como referencia de cámara en ImageGen para convertir sus curvas en láminas de grafito y vidrio azul.

El nuevo terminal de aluminio parte del [terminal anterior](public/art/terminal.webp). Las versiones para [móvil](public/art/terminal-modern-640.webp) y [escritorio](public/art/terminal-modern.webp) llevan transparencia en el propio WebP. Sobre el cristal se dibuja un paisaje de líneas; al pasar el puntero, tocarlo o enfocar el botón de la terminal con el teclado se ven los nombres de los proyectos.

<details>
<summary>Prompt de la imagen de terminal elegida (ImageGen)</summary>

> Redesign the reference CRT as a contemporary standalone desktop terminal. Keep the integrated screen and sloping keyboard in one rigid desktop instrument, and the near-frontal three-quarter view with a little of the right flank visible. Use a flat widescreen OLED in a slim satin natural-aluminium surround, a shallow graphite base, closely spaced charcoal low-profile keys and a single muted lime Return key. No laptop hinge or trackpad. Keep the inside of the display opaque, almost black and blank, with just a quiet glass reflection: the website adds its own live terminal graphics. Premium realistic industrial product photography, softly lit silver edges and cool rim lighting against a future midnight-blue page. Landscape 4:3 composition, one complete object centred with slim breathing room on all sides; real alpha transparency around the silhouette. No floor, setting, furniture, cables, logos, lettering, watermark or background graphics.

</details>

La franja de clientes enlaza a las cuatro fichas: Inditex, Mercedes-Benz, Santander Alemania y AESA. Las secciones de proyectos y trayectoria heredan el tema seleccionado y dejan entrever la fotografía fija en ambos modos.

<details>
<summary>Referencia, prompt y fondos publicados</summary>

Edición con la herramienta integrada ImageGen a partir del [fondo anterior](public/art/sevilla-canopy.webp). Exportaciones para [escritorio](public/art/optical-ribbon.webp) y [móvil](public/art/optical-ribbon-mobile.webp).

> Reinterpret the attached background as a technological macro photograph. Keep the exact low upward camera angle, 16:9 framing, broad sweeping curve through the middle, deep shadow on the left and the vanishing point low on the right. Replace the wooden waffle, intersecting square grid, columns and sky with a continuous folded ribbon of graphite micro-lamellae and smoked sapphire glass, etched with fine parallel optical traces. Make the geometry read as a close-up of a fabricated electronic material, with no identifiable building or landmark. Midnight ink-blue, cool slate and a little muted periwinkle grazing light; keep the middle-right calm and dark behind a separate warm beige CRT to be added in the webpage. Tactile, finely machined, understated editorial lighting. No letters, symbols, interface, computers, people or bright neon. Full bleed.

</details>

La experiencia de Inditex y Mercedes-Benz procede de los CV del 11 de noviembre. Se publicaron los dos PDF originales y se cotejaron sus huellas SHA-256 con los archivos de origen. La interfaz mantiene una respuesta visible al puntero cuando el sistema pide movimiento reducido y permite activar las animaciones para este sitio.
