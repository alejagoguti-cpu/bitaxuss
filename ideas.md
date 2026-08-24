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
