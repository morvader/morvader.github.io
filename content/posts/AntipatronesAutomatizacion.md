---
title: "Antipatrones en la Automatización de Pruebas: Errores Comunes y Cómo Evitarlos"
subtitle: "6 decisiones que parecen correctas pero sabotean tu estrategia de testing a largo plazo"
date: 2025-09-15T10:00:00+01:00
lastmod: 2025-09-15T10:00:00+01:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "6 decisiones que parecen correctas pero sabotean tu estrategia de testing a largo plazo"
license: ""
images: ["/images/substack/antipatrones/antipatrones-1.png"]

tags: ["Automatización", "Estrategia"]
categories: []

featuredImage: "/images/substack/antipatrones/antipatrones-1.png"
featuredImagePreview: "/images/substack/antipatrones/antipatrones-1.png"

hiddenFromHomePage: false
hiddenFromSearch: false
twemoji: false
lightgallery: true
ruby: true
fraction: true
fontawesome: true
linkToMarkdown: true
rssFullText: false

toc:
  enable: true
  auto: true
code:
  copy: true
  maxShownLines: 50
math:
  enable: false
mapbox:
share:
  enable: true
comment:
  enable: true
library:
  css:
  js:
seo:
  images: ["/images/substack/antipatrones/antipatrones-1.png"]
---

📺 Este artículo es el resumen de una charla que di en la VLCTesting en 2023. [Aquí tenéis la grabación](https://www.youtube.com/watch?v=example).

La automatización de pruebas es una herramienta fundamental para obtener confianza en lo que construimos de manera rápida y eficiente. Sin embargo, a menudo nos encontramos con prácticas que, aunque parecen beneficiosas a corto plazo, generan problemas significativos a largo plazo: los antipatrones.

## ¿Qué es un Antipatrón?

Antes de nada, vamos a empezar estableciendo lo que considero un antipatrón ya que no es simplemente una mala práctica obvia. Se caracteriza por:

- Ofrecer un beneficio inmediato e intuitivo
- Parecer la solución correcta en el momento
- Conllevar consecuencias negativas con el tiempo

Comprenderlos e identificarlos es importante para evitar la degradación de las suites de pruebas, la lentitud, los fallos inexplicables y, en última instancia, el abandono del esfuerzo de automatización.

Veamos algunos ejemplos que me he ido encontrando de manera recurrente en equipos y testers.

## 1. La Pirámide de testing como dogma

La pirámide de testing sugiere una distribución específica: muchas pruebas unitarias en la base, algunas de integración en el medio, y pocas pruebas end-to-end en la cima. El problema surge cuando se aplica como regla universal sin considerar el contexto específico del proyecto.

### ¿Por qué es un antipatrón?

La pirámide de testing se convierte en antipatrón por los siguientes beneficios aparentes a corto plazo:

- **Modelo intuitivo y visual:** Es fácil de entender y explicar a stakeholders
- **Popularidad extendida:** "Cargo cult" - si Martin Fowler lo dice, debe estar bien
- **Sensación de hacer lo correcto:** Seguir un modelo reconocido da confianza inmediata
- **Simplifica decisiones:** No hay que pensar en estrategia, solo seguir la distribución

**Por qué ocurre:** Es mucho más fácil seguir un modelo establecido que analizar el contexto específico de cada proyecto. Además, cuestionar la pirámide puede parecer que estás cuestionando una "verdad universal" del testing.

### Problemas a largo plazo

- **Desalineación con objetivos de negocio:** Debemos centrar el esfuerzo en testing en lo que da sentido a nuestra aplicación y los clientes valoran
- **Pruebas de poco valor:** Añadir test unitarios de poco valor solo para "cumplir" con la base de la pirámide
- **Rigidez estratégica:** Aplicar la distribución sin considerar que en proyectos frontend-heavy otros modelos pueden ser más apropiados
- **Desperdicio de recursos:** Tiempo invertido en tests que no aportan valor real al negocio

### Cómo solucionarlo

- **Identifica tu core de negocio:** ¿Es performance? ¿Experiencia visual? ¿Lógica compleja de APIs?
- **Análisis de riesgos:** ¿Dónde están los mayores puntos de fallo de tu aplicación específica?
- **Considera alternativas:** Modelo "trofeo" para SPAs, "diamante" para aplicaciones híbridas
- **Recuerda el iceberg:** La pirámide es el resultado visible, pero necesita una base sólida de cultura, conocimiento y estrategia del equipo

![Iceberg de testing](/images/substack/antipatrones/antipatrones-1.png)

## 2. La ejecución local de las pruebas

Este antipatrón ocurre cuando las pruebas automatizadas solo pueden ejecutarse en el equipo local de una persona específica, generalmente el tester, quien debe lanzarlas manualmente en lugar de estar integradas en un sistema de CI/CD.

### ¿Por qué es un antipatrón?

La ejecución exclusiva en local ofrece estos beneficios inmediatos irresistibles:

- **Velocidad de desarrollo:** No dependes de configuraciones complejas de CI/CD
- **Control total:** Tienes dominio absoluto sobre el entorno de ejecución
- **Sin bloqueos:** No necesitas esperar a que otros configuren pipelines o entornos
- **Facilidad inicial:** Es la manera más rápida de empezar con automatización
- **Sin dependencias:** No necesitas coordinarte con DevOps o administradores de sistema
- **Feedback inmediato:** Ves los resultados al instante sin colas de CI

**Por qué ocurre:** Es más sencillo tener control total y ver resultados inmediatos. Además, configurar CI/CD puede parecer complejo y "no urgente" cuando las pruebas funcionan en local.

### Problemas a largo plazo

- **Silos de conocimiento:** Solo una persona puede ejecutar las pruebas
- **Feedback lento para el equipo:** El resto no recibe información inmediata sobre el estado del código
- **Dependencia crítica:** Si esa persona no está disponible, las pruebas no se ejecutan
- **Imposible integración continua:** No hay automatización real en el pipeline de desarrollo
- **Pérdida de inversión:** Cuando la persona se va, toda la automatización se pierde

### Cómo solucionarlo

- **CI/CD desde el día uno:** Toda prueba debe poder ejecutarse de forma desatendida
- **Dockerización:** Usar contenedores para garantizar consistencia entre entornos
- **Repositorios compartidos:** El código de pruebas debe estar versionado y accesible para todo el equipo
- **Documentación clara:** Procedimientos para que cualquiera pueda ejecutar las pruebas
- **Inversión en configuración:** Dedica tiempo inicial a configurar correctamente los entornos

## 3. Cucumber: Mal entendido y Mal utilizado

Cucumber permite escribir pruebas en lenguaje natural (Gherkin) que luego se vinculan a código técnico. Se convierte en antipatrón cuando se adopta esperando que automáticamente mejore la colaboración con negocio o que simplifique el testing, sin una estrategia clara de BDD detrás.

### ¿Por qué es un antipatrón?

Cucumber ofrece beneficios muy llamativos:

- **"Efecto wow":** Traducir lenguaje natural a código ejecutable parece magia
- **Promesa de colaboración:** "Ahora negocio podrá escribir pruebas"
- **Lenguaje ubicuo:** Todos entenderán los tests, técnicos y no técnicos
- **Documentación viva:** Los escenarios sirven como especificación ejecutable
- **Justificación metodológica:** "Estamos haciendo BDD de verdad"
- **Diferenciación profesional:** Usar Cucumber te hace parecer más avanzado que usar solo unit tests

**Por qué ocurre:** La promesa de democratizar el testing es muy atractiva. Además, una vez que inviertes tiempo en aprender Gherkin y crear step definitions, es difícil admitir que no aporta valor en tu contexto específico.

### Problemas a largo plazo

- **Complejidad innecesaria:** Añades una capa extra que no siempre está justificada
- **Mantenimiento costoso:** Los escenarios imperativos se vuelven frágiles ante cambios
- **Falsa colaboración:** La gente de negocio raramente mantiene o escribe scenarios
- **Acoplamiento a implementación:** Los steps se vuelven demasiado específicos sobre el "cómo"
- **Pérdida de valor real:** Se usa como herramienta de testing posterior en lugar de facilitar conversaciones previas

### Cómo solucionarlo

- **Evalúa el contexto real:** ¿Hay colaboración activa entre roles no técnicos en la definición de criterios?
- **Úsalo a priori:** Para generar conversaciones antes del desarrollo, no como herramienta de testing posterior
- **Escenarios declarativos:** Enfócate en el qué (comportamiento) no en el cómo (implementación) siguiendo buenas prácticas de sintaxis Gherkin
- **Considera alternativas:** Si todo tu equipo es técnico, tests directos pueden ser más eficientes

## 4. Probar A Través de la Interfaz vs. Probar la Interfaz

![Probar a través de la interfaz vs probar la interfaz](/images/substack/antipatrones/antipatrones-2.png)

Este antipatrón consiste en usar herramientas e2e (como Selenium/Cypress) para probar todo el stack completo de la aplicación cuando lo que pretendes es validar únicamente la funcionalidad específica de la interfaz de usuario. Por ejemplo que se muestra un determinado mensaje de error o que un email se valida correctamente.

Es la diferencia entre usar la UI como vehículo para probar toda la aplicación versus probar específicamente que la UI funciona correctamente.

### ¿Por qué es un antipatrón?

Probar todo el stack a través de la UI con una herramienta e2e ofrece beneficios inmediatos muy atractivos:

- **Sensación de seguridad total:** "Si funciona en el navegador, todo el sistema funciona"
- **Réplica del testing manual:** Es la automatización más directa de lo que haríamos a mano
- **Menos análisis requerido:** No hay que pensar en capas, dependencias o arquitectura
- **Menos comunicación:** No necesitas coordinar con otros equipos sobre qué prueban ellos
- **Comprensión universal:** Cualquiera puede entender qué hace la prueba solo viéndola ejecutar
- **Una herramienta para todo:** Cypress resuelve "todas" las necesidades de testing

**Por qué ocurre:** Es natural querer replicar lo que hacemos manualmente. Además, pensar en capas y dividir responsabilidades de testing requiere más esfuerzo mental y coordinación con el equipo.

### Problemas a largo plazo

- **Feedback lento y confuso:** Cuando algo falla, no sabes si es la UI, API, base de datos o servicio externo
- **Mantenimiento costoso:** Los cambios en cualquier capa rompen las pruebas end-to-end
- **Redundancia extrema:** Validas la misma lógica en múltiples capas (ej. validación de emails)
- **Pruebas lentas e inestables:** Más componentes = más puntos de fallo
- **Escalabilidad limitada:** Añadir más pruebas end-to-end hace el suite progresivamente más lento

### Cómo solucionarlo

- **Divide responsabilidades:** Cada tipo de prueba en la capa más eficiente para lo que valida
- **Mock estratégico:** Aisla la funcionalidad específica que quieres probar
- **Análisis de riesgos:** Identifica qué flujos críticos SÍ requieren pruebas end-to-end completas
- **Comunicación entre equipos:** Coordina para evitar duplicaciones innecesarias de validaciones

## 5. El peligro de los reintentos en los flaky tests

Los flaky tests son pruebas que a veces pasan y a veces fallan sin cambios aparentes en el código. El antipatrón surge cuando configuramos reintentos automáticos para que estas pruebas "den verde" en lugar de investigar y solucionar la causa raíz de su inestabilidad.

### ¿Por qué es un antipatrón?

Configurar reintentos automáticos para flaky tests ofrece beneficios inmediatos irresistibles:

- **Solución rápida y fácil:** Un simple `retry: 3` en tu configuración y "problema resuelto"
- **Pipeline verde instantáneo:** No más builds rojos por "problemas temporales"
- **Menos interrupciones:** El equipo no se ve interrumpido por falsos positivos
- **Atribución externa del problema:** "Es culpa de la herramienta o del entorno, no nuestro"
- **Presión de entregas:** Necesitas que esté verde "ya" para no bloquear el release
- **Menor investigación requerida:** No tienes que analizar cada fallo individual

**Por qué ocurre:** Es mucho más fácil configurar un retry que investigar la causa raíz. Además, cuando el test pasa en el segundo intento, refuerza la creencia de que "era solo un problema temporal".

### Problemas a largo plazo

- **Pérdida total de confianza:** Nadie confía en tests que "a veces fallan"
- **Problemas reales ocultos:** Condiciones de carrera, memory leaks, problemas de concurrencia quedan enmascarados
- **Suite "sandía":** Verde por fuera en el dashboard, pero roja por dentro con fallos reales
- **Degradación progresiva:** Los problemas subyacentes empeoran hasta ser imposibles de ignorar
- **Abandono eventual:** Los equipos terminan deshabilitando o ignorando completamente los tests

### Cómo solucionarlo

- **Investigación obligatoria:** Cada fallo debe analizarse antes de cualquier reintento
- **Análisis de causa raíz exhaustivo:** Logs, capturas, reproducción manual, consulta al equipo
- **Conocimiento técnico profundo:** Entiende cómo funciona tu herramienta de testing internamente
- **Cultura de calidad:** El "está en verde" no es suficiente si hubo reintentos sin investigación previa

## 6. La Ilusión del testing orientado a la cobertura

Este antipatrón surge cuando el objetivo principal de escribir pruebas se convierte en alcanzar un porcentaje específico de cobertura de código (típicamente 80%), en lugar de enfocarse en probar comportamientos críticos del sistema. El resultado son pruebas que incrementan métricas pero no aportan valor real.

### ¿Por qué es un antipatrón?

El objetivo del "80% de cobertura" ofrece beneficios inmediatos muy seductores:

- **Métrica fácil de medir:** Un número claro que puedes reportar a management
- **Justificación objetiva:** "Tenemos 80% de cobertura, nuestro código está bien"
- **Obligación contractual cumplida:** Muchos contratos lo exigen explícitamente
- **Sensación de profesionalidad:** "Un buen desarrollador tiene alta cobertura"
- **Gamificación:** Es satisfactorio ver subir el porcentaje como un videojuego
- **Comparación fácil:** Puedes comparar proyectos y equipos con una métrica simple

**Por qué ocurre:** Es mucho más fácil perseguir un número que analizar si las pruebas realmente aportan valor. Además, el número alto de pruebas unitarias da una falsa sensación de seguridad pero con la conciencia tranquila.

### Problemas a largo plazo

- **Tests sin valor real:** Testear getters/setters solo para aumentar el porcentaje
- **Acoplamiento extremo:** Una clase de test por cada clase de producción
- **Mocking abusivo:** Al final pruebas tus mocks, no el código real
- **Obstáculo para refactoring:** Cambiar un constructor rompe 50 tests que ni siquiera detectaron bugs
- **Falsa seguridad:** Alta cobertura no significa código libre de errores

### Cómo solucionarlo

- **Enfócate en comportamiento:** Tests que verifican flujos de usuario reales, no líneas de código. "Test behaviour, not implementation"
- **Delta de cobertura:** Más importante que no baje cuando añades código nuevo
- **Tests sociales:** Pruebas que ejercitan múltiples clases trabajando juntas
- **Mutation testing:** Verifica que tus tests realmente detectan errores usando herramientas como PIT o Mutmut

## Conclusiones: Estrategia, Contexto y Colaboración

Después de identificar los antipatrones más comunes en automatización de pruebas, es momento de transformar estos aprendizajes en acciones prácticas para evitar caer en las mismas trampas.

### 1. Define tu estrategia (Círculo Dorado)

![Círculo Dorado - Estrategia](/images/substack/antipatrones/antipatrones-3.png)

- **Por qué:** ¿Qué problemas de negocio específicos quieres resolver?
- **Cómo:** ¿Te enfocarás en APIs, performance, experiencia visual?
- **Qué:** Solo al final elige herramientas específicas

### 2. El contexto determina la validez

- Una práctica puede ser antipatrón en un contexto y solución en otro
- Evalúa tu situación específica: equipo, producto, restricciones

### 3. Colaboración y consenso

- Las decisiones deben ser del equipo completo
- Evita imposiciones unilaterales

### 4. Invierte en los fundamentos

- La automatización exitosa requiere cultura, conocimiento y tiempo
- Los resultados visibles dependen de una base sólida invisible

### 5. Aprendizaje continuo

- Los antipatrones evolucionan con las herramientas y prácticas
- Mantente actualizado y dispuesto a cuestionar tus propias prácticas

Estos antipatrones no surgen por incompetencia, sino por decisiones racionales con información limitada. La clave está en mantener perspectiva a largo plazo y estar dispuesto a cambiar cuando el contexto lo requiera.

**Recuerda:** En automatización de pruebas, lo que funciona hoy puede ser el antipatrón de mañana. El verdadero profesional no es quien nunca se equivoca, sino quien cuestiona constantemente sus propias prácticas.
