# Especificación visual — Bitaxus

## Referencia de diseño

La imagen `frame.webp` de Figma es la especificación visual definitiva. La implementación debe reproducir su landing page corporativa oscura y editorial, respetando el contenido, la jerarquía y la secuencia de secciones originales. Se conservarán los recursos extraídos de Figma y se convertirán las capas absolutas en estructuras flexibles y semánticas, sin alterar la voz de marca ni la copia.

## Dirección seleccionada: fidelidad Figma

**Movimiento de diseño.** Interfaz fintech de alto contraste con un lenguaje técnico-editorial: negro profundo, luz rojiza difusa, paneles de producto y superficies blancas intercaladas.

**Principios rectores.** Se mantiene una narrativa vertical de producto; las pantallas, fotografías y patrones originales son el foco visual; las áreas rojas funcionan como guía de atención; el espacio negativo negro preserva la sensación premium y tecnológica.

**Filosofía de color.** El negro absoluto sostiene la profundidad y hace que los blancos de los paneles de producto se perciban nítidos. El rojo Bitaxus `#ba0b0d` se reserva para llamadas a la acción, detalles luminosos y zonas de transición para no competir con los contenidos.

**Paradigma de composición.** Secciones de ancho completo en una columna narrativa, con composiciones asimétricas: hero dividido entre mensaje y producto, alternancia de franjas claras y oscuras, y módulos flotantes sobre fondos con textura.

**Elementos distintivos.** Ondas y patrones rojizos de bajo contraste, esquinas redondeadas de gran radio en los paneles clave, y bordes finos semitransparentes que encuadran los controles.

**Interacción.** Los elementos que aparentan ser interactivos serán botones o enlaces semánticos, con respuesta visual breve, desplazamiento interno donde corresponde y estados de foco visibles.

**Animación.** Transiciones contenidas de opacidad y desplazamiento menor a 300 ms, con respeto por `prefers-reduced-motion`. Ninguna animación altera la composición de Figma.

**Tipografía.** Belamor para titulares en mayúscula y Montserrat/Inter para interfaz y cuerpo, con pesos que preservan la jerarquía capturada en Figma.

**Esencia de marca.** Bitaxus conecta recaudos, pagos y movimientos para que negocios y personas operen con claridad. Personalidad: técnica, directa y confiable.

**Voz de marca.** Frases funcionales y resolutivas, con energía comercial sin exageración. Ejemplos: “Vendiste como nunca. ¿Y la plata?” y “Tu operación, conectada.”

**Logotipo y color distintivo.** Se utiliza el logotipo blanco exportado desde Figma. El rojo Bitaxus `#ba0b0d` conserva la función de firma visual de la marca.

## Decisiones de estilo

- La composición de `frame.webp` prevalece sobre convenciones genéricas de landing pages.
- Los textos, colores, sombras y recursos exportados se mantienen sin sustituciones estéticas.
- La adaptación móvil apila las composiciones evitando recortes de contenido, mientras conserva fondo oscuro, énfasis rojo y contraste alto.

## Rediseño editorial del hero del Blog

### Tres direcciones exploradas

| Tema | Introducción breve | Probabilidad |
|---|---|---:|
| **Mesa de control** | Una portada editorial organizada como una mesa de trabajo: gran titular, herramientas de lectura y una única historia ancla. Busca claridad antes que espectáculo. | 0.04 |
| **Índice de claridad** | Un hero casi tipográfico, de tono sobrio, que presenta el Blog como un índice de decisiones operativas. | 0.08 |
| **Recibos nocturnos** | Una composición de documentos, números y marcas rojas sobre negro, más expresiva y densa. | 0.03 |

### Dirección elegida: Mesa de control

**Movimiento de diseño.** Editorial fintech contemporáneo: información estructurada, espacio negativo controlado y una historia principal presentada como objeto de lectura.

**Principios rectores.** La jerarquía se expresa primero por tipografía; el rojo Bitaxus funciona como señal puntual, no como relleno; la imagen de portada se usa una sola vez como ancla; los controles se integran en una franja de trabajo discreta.

**Filosofía de color.** Negro cálido para profundidad, blanco suave para legibilidad y rojo `#ba0b0d` reservado para el estado activo y el CTA. Las superficies no compiten con la lectura.

**Paradigma de composición.** Hero asimétrico de dos columnas: texto y herramientas de exploración a la izquierda; una tarjeta editorial vertical contenida a la derecha. Sin capturas de pantalla a escala completa.

**Elementos distintivos.** Rótulo de edición en mayúscula pequeña, línea vertical de señal y marco de lectura con numeración editorial.

**Interacción y animación.** Búsqueda, filtros y CTA mantienen comportamiento real. Los estados cambian en menos de 200 ms mediante color, borde y desplazamiento mínimo; se respeta `prefers-reduced-motion`.

**Tipografía.** BELAMOR en titular de cuatro líneas y numeración editorial; Inter/Montserrat para navegación, búsqueda y texto de apoyo.

**Esencia y voz.** Bitaxus traduce movimientos del negocio en decisiones más claras. Personalidad: precisa, serena y directa. La voz evita promesas grandilocuentes: “Entender también es operar mejor.” y “Una lectura para la siguiente decisión.”

**Marca.** El logotipo blanco conservado desde Figma y el rojo Bitaxus como firma funcional completan el sistema.
