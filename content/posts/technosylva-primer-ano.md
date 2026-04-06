---
title: "Mi primer año en Technosylva"
subtitle: "Spoiler: la automatización fue lo último que tocamos"
date: 2026-04-06T08:00:00+02:00
lastmod: 2026-04-06T08:00:00+02:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Un año como Principal QA en Technosylva: cómo ordenar el delivery, romper el silo de testing e implementar automatización con impacto real. Bugs críticos en producción reducidos un 32% y retrasos en entregas un 57%."
license: ""
images: ["/images/technosylva/proceso-delivery.png"]

tags: ["QA", "Estrategia", "Calidad", "Cultura", "Automatización", "IA", "Carrera"]
categories: []

featuredImage: "/images/technosylva/proceso-delivery.png"
featuredImagePreview: "/images/technosylva/proceso-delivery.png"

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
  enable: false

sitemap:
  priority: 0.9
---

*Spoiler: la automatización fue lo último que tocamos*

En marzo cumplí un año en [Technosylva](https://technosylva.com/). Y como en casi todo lo que hago, necesito pararme a reflexionar: ¿qué funcionó? ¿qué no? ¿dónde estamos realmente?

Este artículo es eso. Una revisión de un año intenso y lleno de aprendizajes.

---

## El contexto: de consultora a producto

Venía de nueve años en Sngular. Una consultora española donde llegamos a ser casi 1.500 personas. A pesar del día a día intenso, ya estaba en mi zona de confort. Un mundo conocido, con sus reglas, sus ritmos y sus inercias.

Technosylva era diferente. Unos 60-70 ingenieros cuando llegué. Una empresa de software para gestión de incendios y emergencias. Productos complejos, clientes exigentes que se juegan mucho dinero en las decisiones que toman en base a nuestro software, y un equipo de ingeniería con mucho potencial.

Me uní con el rol de Principal de QA y desde mis primeras conversaciones con [Félix](https://x.com/flopezluis), él fue claro con el objetivo. **Había que modernizar el equipo de QA, darle estrategia y poner foco en automatización**.

---

## El verdadero problema no era el testing

A las tres semanas de incorporarme, tuve mi primer *leadership meeting* en Denver.

Allí, y después de escuchar y hablar con managers de diferentes departamentos, fue donde entendí la magnitud real del problema.

No había procesos claros de delivery. El Jira era un caos, proyectos duplicados, bugs sin seguimiento en el backlog, decisiones en Slack que nunca se reflejaban en ningún sitio. Las historias de usuario no tenían criterios de aceptación. No existía el *definition of done*. Las entidades de Jira se usaban de forma indistinta y sin criterio.

Y encima, el equipo de QA trabajaba en silo. Un equipo separado al que le llegaban los proyectos para testear, sin contexto, sin involucración temprana. En productos tan complejos como los de Technosylva, probar sin contexto es prácticamente imposible.

Lo tuve claro: **en ese momento, poner foco en la automatización habría sido un error**.

Siempre lo digo: **automatizar el caos solo acelera el caos**.

---

## Lo primero: poner orden en el delivery

Antes de hablar de testing, había que hablar de proceso.

Esto supuso uno de los retos más grandes del año. No porque fuera técnicamente difícil, sino porque implicaba alinear a Ingeniería, Producto, Proyecto, Implementación y Customer Support. Muchas personas. Muchas perspectivas. Muchas opiniones. Mucha resistencia natural al cambio.

Fue un proceso largo. Y aún no está acabado. Ni lo estará nunca del todo, porque los procesos buenos son los que mejoran de forma constante.

![Reunión de los 5 amigos para alinear criterios de aceptación](/images/technosylva/proceso-delivery.png "Proceso de delivery: alineamiento entre equipos")

Pero conseguimos sentar algunas bases importantes:

- **Las reuniones de 5 amigos**: Product, Dev, Customer Support, Implementación y QA en la misma conversación antes de empezar a desarrollar. Y aquí es donde también introdujimos la IA como apoyo: usamos Claude para generar una primera versión de los **criterios de aceptación** a partir del contexto de la historia. El equipo los valida y refina, pero el punto de partida ya está hecho. Ahorra tiempo y reduce la variabilidad entre equipos.
- **Un Jira que tuviera sentido**: entidades bien definidas, decisiones reflejadas, visibilidad real del estado del trabajo.

Al poco tiempo empezamos a ver resultados. **Mejor alineamiento, más visibilidad y más predecibilidad en las entregas**.

> La mejor métrica de este cambio es que conseguimos que una reunión semanal de coordinación a la que asistían 30+ personas quedase reducida a 5 asistentes.

No es lo que nadie espera escuchar de un Principal QA en su primer año. Pero era lo que había que hacer.

---

## Testing embebido: romper el silo

Con esa base mínima establecida, llegó el momento de replantear cómo trabajaba el equipo de QA.

El modelo que teníamos era el típico cuello de botella. Proyectos que llegan al equipo de QA al final del proceso, sin contexto, con prisas. Cambié eso hacia un **modelo de agile testing con QAs embebidos en los equipos**.

El impacto fue inmediato:

- **Las pruebas se hacen con contexto real**: el tester sabe qué se está construyendo, por qué y cómo.
- **Desaparece el cuello de botella** del final del proceso.
- **La automatización tiene sentido**: se automatiza junto con el equipo y no *para* el equipo.
- **Responsabilidad compartida**: el equipo es el responsable de la calidad y no únicamente el QA.

Este cambio facilitó el montar un baseline de automatización inicial. El objetivo es ir construyendo una **red de seguridad automatizada** que valide en staging y en producción.

Esto está siendo fundamental en la gestión de incidencias. Muchos de nuestros errores los conocíamos a través de nuestros clientes. Con pruebas automatizadas funcionando como sondas en producción, conectadas a nuestro sistema de alertas con [Incident.io](https://incident.io/), podemos detectar problemas antes de que lleguen al cliente. La diferencia horaria con nuestros clientes norteamericanos juega a nuestro favor en esto.

En este punto la IA nos está ayudando enormemente: partiendo de criterios de aceptación claros y requisitos de producto, generamos pruebas de manera mucho más ágil.

---

## Métricas que importan

Uno de los problemas clásicos del QA, y de la inversión en prevención, es justificar su impacto. *"Sin datos, solo eres otra persona con una opinión."*

![Dashboard de métricas de calidad en Notion](/images/technosylva/metricas-dashboard.png "Dashboard de métricas: datos de Jira, GitLab y Grafana centralizados en Notion")

Durante este año implementé un sistema de métricas usando Notion como dashboard centralizado. Recogemos datos de Jira, GitLab y Grafana, y los cruzamos con las métricas de delivery del equipo de proyectos.

¿Por qué es útil esto? Porque te permite responder preguntas concretas: ¿las mejoras en ingeniería están reduciendo los retrasos en las entregas? ¿Estamos mejorando la tasa de éxito de los releases? ¿Hay correlación entre la deuda técnica y los incidentes en producción?

No es la solución perfecta. Notion tiene sus limitaciones como herramienta de métricas. Pero como **primera medida para tener visibilidad unificada**, ha funcionado.

También usamos la IA para hacer **análisis de zonas calientes de bugs**. Cruzar datos de productos, entornos, service desk y clientes para identificar qué áreas concentran más fallos. Eso nos permite priorizar la cobertura de pruebas donde más importa.

---

## IA y madurez: el trabajo estructural

El último gran bloque de este año ha sido menos visible pero igual de importante.

Liderar la adopción de IA en la compañía no como una herramienta más, sino como un cambio cultural. Igual que con la calidad, no basta con dar acceso a las herramientas, hay que generar el contexto para que la gente quiera usarlas y sepa cómo. Para eso tenemos un grupo de **AI Champions** que empuja el cambio desde dentro, con una estrategia inspirada en los [ocho pasos de Kotter](https://testingfromthetrenches.com/kotterculturacalidad/).

Por otro lado, junto con [Ezequiel](https://newsletter.principiamachina.com/), hemos lanzado un [**Maturity Model**](https://testingfromthetrenches.com/modelosmadurez/) para evaluar a los equipos de ingeniería. El objetivo no es poner nota. El objetivo es **romper los *unknown unknowns* de cada equipo**: que sepan dónde están, qué no saben que no saben, y qué pasos concretos pueden dar para mejorar.

Estamos en proceso. Detectando puntos de mejora. Trazando planes de acción equipo por equipo. Esto es lo que significa la mejora continua de verdad: no un póster en la pared, sino un ciclo de evaluación constante.

![Modelo de madurez para equipos de ingeniería](/images/technosylva/maturity-model.png "Maturity Model: evaluación de equipos de ingeniería para identificar unknown unknowns")

---

## Los resultados: lo que dicen los datos

No soy muy de vanity metrics, por eso aquí dejo algunos de los datos más relevantes centrados en el **impacto**.

Los bugs de máxima prioridad que llegaban a producción se han reducido un **32%** en el último año. Además, la mayoría de lo que llega son errores acotados y funcionales, no fallos sistémicos.

En **velocidad de entrega**, los retrasos se han reducido un **57%** respecto al pico del año pasado. Y los retrasos atribuibles específicamente a desarrollo han bajado un **74%**. Los ciclos de QA, que antes eran un cuello de botella y tardaban días en completarse, ahora se miden en horas.

Estos datos no son casualidad. Son el resultado de cambiar el proceso antes de cambiar las herramientas. Y de apostar por un modelo donde la calidad es responsabilidad de todo el equipo, no de un departamento al final de la cadena.

---

## Lo que he aprendido

Si tuviera que resumir el año en una sola idea sería esta:

> **El trabajo de QA rara vez empieza por el testing.**

Empieza por entender el sistema. Por los procesos de delivery. Por cómo se toman las decisiones. Por cómo fluye la información entre equipos.

El testing y la automatización son la consecuencia de tener todo eso bien ordenado. No al revés.

Un año en Technosylva me ha confirmado lo que llevo años defendiendo: **el valor de QA no está en las pruebas, está en la visibilidad que genera y en los problemas que previene antes de que ocurran**. Siempre enfoque preventivo frente a reactivo.

Queda mucho trabajo por delante. El modelo embebido sigue madurando. Las métricas necesitan evolucionar. La adopción de IA es un proceso largo. [El Maturity Model](https://newsletter.principiamachina.com/p/ordenando-el-caos-con-modelos-de) acaba de empezar.

La base está puesta. Ahora empieza lo bueno.
