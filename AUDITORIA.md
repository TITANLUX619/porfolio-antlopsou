# Auditoría de antlopsou.dev

11 de noviembre de 2026. Revisión del portfolio de Antonio López Soult en español e inglés. La referencia inicial es el despliegue del commit `6d85dce`. El objetivo del rediseño es que una persona interesada pueda entender qué desarrolla Antonio, examinar una muestra de su trabajo y contactar con él.

## Hallazgos y correcciones

| Área | Observación inicial | Cambio comprobado |
| --- | --- | --- |
| Presentación profesional | El titular genérico ocupaba la portada y había que recorrer varias secciones para encontrar el contacto. | La portada identifica al profesional, su especialidad y su ubicación. Los accesos a proyectos y contacto aparecen desde la primera pantalla. La sección de servicios concreta qué trabajo se puede contratar. |
| Credibilidad | El carrusel llegaba a mostrar diez copias de un mismo testimonio. Dos proyectos mostraban claves de traducción y las dos demos existentes devolvían 500. | «Proyectos» presenta ConsultIA, producto propio con demo, y Trento Consulting, con captura y enlace a [la web publicada](https://trentodesarrollo.es/). |
| Navegación y contacto | Había cuatro elementos de enlace sin destino ni texto y botones anidados en enlaces. | Cada tarjeta enlaza a una ficha con URL propia. Se puede pasar al siguiente caso, regresar a la colección, descargar el CV del idioma elegido, abrir el correo o copiar su dirección. |
| Accesibilidad | La portada tenía 15 encabezados de primer nivel. El lila sobre blanco del titular alcanzaba 1,94:1. El contenido dependía en parte de animaciones de entrada. | Cada página tiene un único H1. Hay salto al contenido, regiones de navegación, foco visible, textos alternativos y dos temas. El comando de entrada, el menú y la búsqueda en la terminal se pueden usar con teclado. |
| Rendimiento | El fondo SVG transfería por sí solo unos 2,59 MiB. El inicio cargaba WebGL, notificaba errores geométricos y precargaba dos imágenes inexistentes. | La página se genera estáticamente. La consola está dibujada con CSS. El fondo y las capturas se sirven en WebP, y las fuentes se alojan en el proyecto. |
| Buscadores y enlaces compartidos | El título y la descripción repetían «antlopsou porfolio». Faltaban URL canónicas, tarjetas sociales, sitemap y robots.txt. | Las portadas y los casos de estudio tienen títulos y descripciones propios, URL canónicas y alternancias de idioma. Se verificaron el sitemap, robots.txt y las tarjetas sociales. |
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

La entrada del 13 de noviembre muestra una ventana de terminal de fondo negro translúcido. Su ancho y su alto son un 15 % mayores que el área visible de la pantalla del diseño anterior. El comando `open antlopsou.dev` espera en la esquina superior izquierda.

Al abrir la portada o recargarla por completo, Intro ejecuta el comando en el escritorio. En móvil también se puede tocar la terminal. La consola escribe las líneas de salida y dibuja la portada real en modo oscuro por filas dentro de la ventana. La vista completa permanece quieta antes del zoom sobre la misma fotografía fija. Escape permite terminar la secuencia en curso. El ajuste de movimiento del sistema y las opciones guardadas por versiones anteriores se ignoran. El tema claro puede elegirse en la cabecera y se conserva al navegar por el portfolio durante la visita. Navegar entre secciones, volver de un proyecto o cambiar de idioma no repite la entrada. Los enlaces directos a una sección y la navegación sin JavaScript dan acceso inmediato al contenido.

En Servicios y Sobre mí, el scroll acerca los títulos desde la izquierda y los textos de cada fila desde la derecha. Sus posiciones laterales ya se ven dentro de la terminal y se conservan al terminar el zoom. Las líneas de separación permanecen fijas. El recorrido se invierte al subir, tiene un tramo quieto para leer y es más corto en móvil. Entrar desde el logo de un cliente conserva ese mismo recorrido en su ficha.

<details>
<summary>Archivo del diseño anterior del monitor Estudio (ImageGen)</summary>

> Use case: precise-object-edit. Production-ready photoreal product cutout for a personal portfolio entrance. Image 1 ("Estudio", proposal 2) is the edit target and the chosen machine. Image 2 is a reference ONLY for the keyboard visibility and key height. Keep image 1's entire ultrathin brushed silver monitor, dark inner trim, straight narrow central stem and elegant flat silver foot: no ivory computer case, no bulky chin, no LEDs or ornaments. Center the monitor precisely head-on, focal axis perpendicular: left and right edges vertical and exactly parallel, top and bottom horizontal, no yaw, no camera tilt, no keystoning. Glass remains an opaque, perfectly flat empty near-black rectangle for compositing the real webpage. Same clean proportions, screen size, complete hardware, and framed landscape composition as image 1. Replace just the keyboard with a slightly more visible compact, detached silver / pale mineral-grey keyboard, sculpted matte light grey keycaps, gently stepped rows and a clearly recognizable spacebar. Show several distinct upper key surfaces and the thin front lip like the keyboard in image 2 by gently raking only the keyboard bed toward the viewer, not tilting the monitor or the camera. Keyboard apparent height about 7.5–9% of the full image (between reference 1's 3% and reference 2's 12%), width 56–60% of the frame, centered, sitting in front of the stand with a small gap and lower margin. Keep it modern, balanced, secondary to the monitor; no retro body, huge keyboard, dark gaming keys, lights or desk props. Soft neutral studio edge light, polished photographic realism. Isolate all the equipment on a genuinely transparent alpha background, including openings around the stand and between the keyboard and foot; no room, solid backplate, floor, printed checkerboard or vignette. Keep the dark screen itself opaque. No outer rectangle, labels, branding, logos, mouse, cables, watermark or written captions. Landscape approximately 3:2, entire keyboard and stand in shot.

</details>

La franja de clientes enlaza a las cuatro fichas: Inditex, Mercedes-Benz, Santander Alemania y AESA. Después de la portada van Desarrollo a medida, Proyectos y Sobre mí, en ese mismo orden en el menú. Los paneles de servicios y trayectoria heredan el tema seleccionado y dejan entrever la fotografía fija en ambos modos.

<details>
<summary>Referencia, prompt y fondos publicados</summary>

Edición con la herramienta integrada ImageGen a partir del [fondo anterior](public/art/sevilla-canopy.webp). Exportaciones para [escritorio](public/art/optical-ribbon.webp) y [móvil](public/art/optical-ribbon-mobile.webp).

> Reinterpret the attached background as a technological macro photograph. Keep the exact low upward camera angle, 16:9 framing, broad sweeping curve through the middle, deep shadow on the left and the vanishing point low on the right. Replace the wooden waffle, intersecting square grid, columns and sky with a continuous folded ribbon of graphite micro-lamellae and smoked sapphire glass, etched with fine parallel optical traces. Make the geometry read as a close-up of a fabricated electronic material, with no identifiable building or landmark. Midnight ink-blue, cool slate and a little muted periwinkle grazing light; keep the middle-right calm and dark behind a separate warm beige CRT to be added in the webpage. Tactile, finely machined, understated editorial lighting. No letters, symbols, interface, computers, people or bright neon. Full bleed.

</details>

La experiencia de Inditex y Mercedes-Benz procede de los CV del 11 de noviembre. Se publicaron los dos PDF originales y se cotejaron sus huellas SHA-256 con los archivos de origen.
