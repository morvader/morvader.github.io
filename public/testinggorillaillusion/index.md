# Testing y gorilas

<!--more-->
Imagina por un momento que estás viendo un video donde seis personas se pasan pelotas de baloncesto. Tu tarea es sencilla: contar cuántas veces se pasan la pelota las personas vestidas de blanco. Te concentras, sigues cada movimiento con atención... 15, 16, 17... Al final del video te preguntan: "¿Cuántos pases contaste?" Perfecto, tienes la respuesta exacta.

Pero entonces viene la segunda pregunta: "¿**Viste al gorila?**"

Este famoso experimento conocido como la "Monkey Business Illusion", reveló que aproximadamente **la mitad de las personas** que participaron en el estudio no vieron a un gorila que caminaba por el centro de la pantalla. La concentración en contar los pases les provocó una **visión de túnel** tan intensa que ignoraron por completo una anomalía evidente.

> Si ya conocías el experimento te reto a que [veas esta nueva versión](https://www.youtube.com/watch?v=fi2cbhDaQmU) y compruebes el resultado.

Suelo utilizar este ejemplo para hablar sobre cómo afrontar el testing de determinados contextos.

¿Qué es más importante en este contexto? ¿Contar correctamente los pases o detectar la anomalía del gorila?

La respuesta depende del objetivo, pero si llevamos esta pregunta al mundo del testing, da para reflexionar. **¿Desde qué enfoque planteas una ejecución de pruebas? ¿Rigurosa y minuciosa o dando libertad al tester para que explore? **

> ¿Alguna vez has pensado en la diferencia entre checking y testing?

Por ejemplo, ponte en esta situación.

Imagina que ejecutas perfectamente 50 casos de prueba en tu ecommerce: todos los flujos de compra funcionan, el carrito suma correctamente, los pagos se procesan bien. Pero mientras tanto, ignoras que cuando alguien intenta comprar más de 10 unidades de un producto, se produce un error de memoria que ralentiza toda la plataforma.  

La mayoría tendemos a quedarnos en nuestra tarea asignada. Reportamos que las compras están bien y seguimos adelante. Pero ese "gorila de rendimiento" que ignoramos podría suponer la pérdida de ventas, clientes y reputación.

De este experimento, podemos extrapolar dos paralelismos que afectan al testing

## La visión de túnel: el peor enemigo del testing

En el mundo de las pruebas, tenemos nuestro propio "gorila": La visión de túnel en testing es más común de lo que creemos y es exactamente lo que ocurría en el experimento del gorila. Sucede cuando nos concentramos tanto  en seguir un script detallado que perdemos la perspectiva global. Es como tener una linterna muy potente pero con un haz muy estrecho: vemos perfectamente lo que está directamente frente a nosotros, pero todo lo demás queda en la oscuridad.

Esta focalización excesiva puede llevarnos a:

- Validar funcionalidades específicas mientras ignoramos integraciones críticas
- Verificar el *happy path* mientras pasamos por alto escenarios de error evidentes
- Concentrarnos en la interfaz mientras ignoramos el rendimiento
- Seguir pasos al pie de la letra sin cuestionar si tienen sentido en el contexto actual

## El efecto pesticida: los bugs desarrollan inmunidad

Este principio establece que las pruebas repetitivas tienden a perder efectividad con el tiempo. Al igual que los insectos desarrollan resistencia a los pesticidas, los defectos "aprenden" a esconderse de nuestras pruebas rutinarias y sin variabilidad.

Cuando ejecutamos los mismos test cases una y otra vez, **nos volvemos expertos en contar pases, pero perdemos la habilidad de ver gorilas**. Nuestra atención se enfoca tanto en validar lo esperado que dejamos de percibir lo inesperado.

Imagínate probando siempre el buscador de tu ecommerce de comida con "macarrones". Funciona perfecto. Pero nunca pruebas con "yogur griego 0%" y no te das cuenta de que el sistema no gestiona correctamente productos con espacios y caracteres especiales. La variabilidad en las pruebas es un plus y favorece encontrar errores, evitando precisamente este efecto pesticida.

En definitiva, siempre nos encontraremos con dos enfoques a la hora de afrontar el testing de un sistema.

## Scripts detallados vs. libertad exploratoria

Al margen de la anécdota del gorila, lo que demuestra el experimento es cómo funciona nuestro cerebro y que el efecto de visión de túnel es real. Este auto-conocimiento de nuestra realidad humana debe servirnos para tomar las medidas para minimizar estos efectos.

Por ello, dado que ambos enfoques no son excluyentes, tendremos que saber encontrar el equilibrio entre ambos.

Veamos los pros y contras de cada enfoque con ejemplos prácticos.

### Enfoque detallado (scripted testing)

Ejemplo: "Buscar 'detergente', añadir 2 unidades al carrito, verificar que el precio total sea 18,50€"

**Ventajas**:

- **Consistencia:** Todos los testers validan exactamente lo mismo.
- **Trazabilidad:** Mapeo directo con requisitos y cobertura clara.
- **Onboarding eficiente:** Los nuevos testers pueden contribuir inmediatamente.
- **Documentación automática:** El comportamiento esperado queda registrado.

**Desventajas**:

- **Pérdida de serendipidad:** No descubres que "detergente" funciona pero "pizza 4 quesos" da error.
- **Obsolescencia rápida:** Mantener scripts detallados es costoso en entornos ágiles.
- **Falsa seguridad:** 100 casos exitosos no garantizan ausencia de problemas graves.
- **Limitación cognitiva:** El tester no puede aplicar su experiencia.

### Enfoque generalista (exploratory testing)

Ejemplo: "Valida que el buscador funcione correctamente con diferentes tipos de productos y cantidades"

**Ventajas**:

- **Flexibilidad:** El tester adapta según lo que descubre.
- **Aprovechamiento de experiencia:** Los testers senior encuentran problemas impredecibles.
- **Exploración natural:** Descubrimiento de flujos reales y casos edge.
- **Foco en valor:** Prioriza validación de negocio sobre ejecución mecánica.

**Desventajas**:

- **Variabilidad:** Diferentes testers obtienen coberturas distintas.
- **Dependencia del talento:** La efectividad depende de la experiencia.
- **Dificultad de replicación:** Reproducir bugs puede ser complejo.
- **Gaps de cobertura:** Áreas importantes pueden quedar sin validar.

## Cuándo usar cada enfoque

## Scripts detallados: cuando el conocimiento es específico

Hay escenarios donde ser preciso tiene sentido, especialmente cuando se requiere conocimiento muy profundo:

**Ejemplo - Integración con sistemas de pago:** Verificar que al procesar un pago con tarjeta Visa terminada en 4242, el sistema genere correctamente el token de seguridad y envíe los datos encriptados al gateway. El conocimiento técnico requerido hace que la especificación sea necesaria.

### Enfoque generalista: por defecto

Para la mayor parte de funcionalidades, confiar en la experiencia y autonomía del tester es más efectivo:

**Ejemplo - Búsqueda de productos**: En lugar de especificar "buscar pizza margarita", permite que el tester explore con diferentes términos: productos con espacios, caracteres especiales, búsquedas vacías, términos muy largos, etc. Aquí es donde aparecen los bugs importantes.

## Recomendaciones prácticas

- **Implementa sesiones de testing exploratorio:** Dedica tiempo específico para que los testers exploren sin restricciones.
- **Describe pasos generalistas:** Define objetivos amplios en lugar de pasos específicos.
- **Prioriza el risk-based testing:** Establece los objetivos y la prioridad de las pruebas en base a un análisis previo de riesgos.
- **Parte de criterios de aceptación claros:** Usa estos criterios como base para la variabilidad en las pruebas.
- **Utiliza herramientas de generación de datos pseudoaleatorios:** Emplea plugins de navegador, herramientas y librerías para aumentar la variabilidad de las pruebas con poco esfuerzo.
- **Mide ambos enfoques:** Compara la efectividad en términos de bugs encontrados, no solo casos ejecutados.

## Cerrando

Volviendo a nuestro experimento inicial: **ambos casos no son equivalentes**. En el contexto del testing, contar bien los pases pero no ver el gorila no es admisible.

**En el balance está la solución:** ser generalista siempre que sea posible, confiar en la experiencia y responsabilidad de los testers, y reservar los scripts concretos cuando el conocimiento sea específico y queramos verificar escenarios muy particulares para asegurar la cobertura.

En definitiva, el objetivo no es ejecutar tests al peso, sino entregar software de calidad. Y para eso, a veces necesitamos la especificidad del script, pero la mayoría de las veces, la curiosidad del tester aportará más valor.

¿Tú qué harías? ¿Contarías los pases o buscarías el gorila? En testing, la respuesta es clara: **hay que hacer ambas cosas, pero si solo puedes elegir una, siempre elige ver el gorila.**
