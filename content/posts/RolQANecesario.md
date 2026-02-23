---
title: "¿Es el rol de QA necesario en los equipos?"
subtitle: "Depende de la madurez y cultura de calidad del equipo"
date: 2026-02-14T15:00:00+08:00
lastmod: 2026-02-14T15:00:00+08:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Análisis sobre la necesidad del rol de QA en equipos de desarrollo según su madurez, cultura de calidad y capacidades. Exploramos diferentes roles como Quality Engineer, Quality Assistance, Quality Advocate y Agile Tester."
license: ""
images: ["/images/rolQA/cultura-calidad-qa.png"]

tags: [QA, Testing, Cultura, Equipos, Calidad]
categories: []

featuredImage: "/images/rolQA/cultura-calidad-qa.png"
featuredImagePreview: "/images/rolQA/cultura-calidad-qa.png"

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
share:
  enable: true
comment:
  enable: true
---

## Respuestas a la pregunta

**Respuesta muy corta:** No

**Respuesta corta:** Depende de la madurez y cultura de calidad del equipo.

**Respuesta larga...**

En los años que llevo dentro del mundo del QA, esta ha sido una pregunta recurrente y sobre la que siempre surgen debates interesantes.

Los que me conocéis, sabéis que no suelo ser muy dogmático en mis opiniones ya que, la realidad del día a día es compleja y si hay algo que debe guiar siempre cualquier decisión es **EL CONTEXTO**.

Como decía, dado que la cuestión de si el rol de tester es necesario dentro de equipos ha sido algo que he tenido que responder en varias ocasiones, os dejo mi opinión.

## El contexto es fundamental

Ya he mencionado que el contexto es algo fundamental a la hora de evaluar cualquier práctica dentro del desarrollo software y, en aspectos relacionados con la calidad, por el gran peso que ejerce la cultura del equipo, mucho más aún.

Teniendo esto en cuenta y según mi experiencia, a la hora de implementar prácticas relacionadas con el aseguramiento de la calidad, los factores que más influencia tienen en los equipos, son que éstos **sepan, puedan y quieran** hacerlo.

### Los tres pilares

- **SABER**: Tener los conocimientos necesarios para implementar las técnicas de testing adecuadas

- **PODER**: Disponer de las herramientas, entornos y tiempo necesario para llevar a cabo las tareas relacionadas con el aseguramiento de la calidad

- **QUERER**: Tener conciencia de la necesidad de incluir técnicas de testing en el proceso de delivery y ser proactivo en su aplicación.

## Cultura de calidad en equipos

![Cultura de calidad en equipos y apoyo de QA](/images/rolQA/cultura-calidad-qa.png)

En este gráfico trato de resumir en qué estado puede estar un determinado equipo y cómo el rol de tester (QA) puede ayudar a mejorar la cultura de calidad.

**Todo equipo debe aspirar a situarse en el centro del gráfico.**

## Roles asociados y funciones

### Quality Engineer

**Rol transversal/Estructura**, es decir, no forma parte del equipo.

Su función no es hacer testing si no apoyar a los equipos con la construcción de herramientas que faciliten los procesos de pruebas y monitori­zación de sistemas.

**Ejemplos:** Desarrollo de framework de pruebas, scripts de carga automática de datos, extracción de métricas de calidad en producción.

### Quality Assistance

Ayuda a los equipos en la definición de las estrategias de testing, elección de herramientas, flujos de trabajo y apoyo técnico en automatización de pruebas. Su misión principal es hacer que el equipo termine siendo autónomo en estas tareas.

### Quality Advocate

Muy parecido al rol de Quality Assistance, pero en este caso, será necesario un carácter mucho más didáctico y de liderazgo puesto que tendrá que "convencer" al equipo de los beneficios del testing.

Para ello, una de las mejores maneras de lograrlo es mediante prácticas como: **Pair Programming, pair testing, seguimiento de métricas del delivery y utilizar OKRs para fijar objetivos y alinear esfuerzos**.

También se trata de un rol de transición que deberá ir teniendo menos protagonismo a medida que el equipo adquiera autonomía.

### Agile Tester

Persona integrada completamente en el equipo. Sus tareas principales serán las de apoyo en la definición de criterios de aceptación, automatización de pruebas y ejecución de pruebas exploratorias en cada sprint.

A su vez, debería ir transmitiendo el conocimiento al equipo para que puedan ir asumiendo estas tareas de manera efectiva.

## Equipos fuera del gráfico

En los equipos que se sitúan fuera del gráfico, será necesario realizar un trabajo de engagement tanto con el equipo en sí, como con sus responsables. Principalmente para conocer las razones de su situación actual y analizar las mejores formas de mejorarlo.

De manera general, creo que la mejor manera de abordar estas situaciones es mediante el **establecimiento de objetivos claramente alineados con negocio** donde se pueda demostrar mediante métricas la mejora del delivery y la reducción de ineficiencias (waste).

## Conclusión

Volviendo al inicio del post y la necesidad de roles de QA en los equipos, creo que dependiendo de su posición dentro del gráfico puede estar justificado.

Aunque, con el paso del tiempo y, de manera ideal, todo equipo debería aspirar a ser autosuficiente y tener un ownership completo del sistema, lo que, en la práctica implicaría estar en el centro del gráfico. En mi opinión, **el apoyo de roles especializados en testing y prácticas de calidad puede acelerar esta transición**.
