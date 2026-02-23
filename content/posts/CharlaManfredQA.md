---
title: "Mi charla con Manfred sobre el futuro del QA: reflexiones después de la conversación"
subtitle: "Del ejecutor de pruebas al arquitecto de ecosistemas de calidad"
date: 2026-02-22T15:58:26+08:00
lastmod: 2026-02-22T15:58:26+08:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Reflexiones tras una conversación con Manfred sobre el estado actual del QA en España: qué buscan las empresas, qué buscan los candidatos y hacia dónde va el rol"
license: ""
images: ["/images/manfredQA/portada.png"]

tags: ["QA", "Futuro", "Automatización", "Carrera", "Mercado", "Quality Engineering", "SDET"]
categories: []

featuredImage: "/images/manfredQA/portada.png"
featuredImagePreview: "/images/manfredQA/portada.png"

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
  # ...
mapbox:
  # ...
share:
  enable: true
  # ...
comment:
  enable: true
  # ...
library:
  css:
  js:
seo:
  images: ["/images/manfredQA/portada.png"]
---
<!--more-->

En la última BilboStack me encontré con [Borja](https://www.linkedin.com/in/borjaperfra/) en el estand de Manfred. Acabamos hablando del último [informe](https://www.getmanfred.com/developer-career-report) que habían publicado sobre la situación del sector en España.

En sus datos se veía algo que muchas personas en QA llevamos tiempo intuyendo. El rol está perdiendo peso, tanto en volumen de ofertas como en expectativas salariales. A partir de ahí surgió una conversación interesante, porque ellos viven el mercado desde la perspectiva de agencia de talento y yo lo he vivido desde dentro, montando equipos de calidad y colaborando con producto y desarrollo.

Después de darle unas vueltas, quedamos en organizar una sesión con su equipo para contrastar lo que están viendo con lo que yo he vivido durante años. He pasado por consultoría y por producto, y conozco bien las dos caras de la moneda. Por un lado, entender las necesidades reales de calidad de distintas compañías. Por otro, entrevistar a candidatos y ver de primera mano cuáles son sus motivaciones, expectativas y sesgos.

Con esa idea, decidí preparar una pequeña presentación que les aportase valor. Una doble perspectiva para ayudar a las empresas a definir el perfil de QA que necesitan y, al mismo tiempo, orientar a candidatos sobre dónde están las oportunidades hoy.

## Un poco de historia: De equipos aislados a arquitectos de ecosistemas

Empecé con un poco de historia, porque creo que es importante entender de dónde venimos para saber hacia dónde vamos. Antes, las pruebas las hacía un equipo aislado que validaba al final del ciclo y justo antes de la entrega. Luego vino la transición hacia Agile Testing y la mentalidad DevOps, donde el testing se integró más con el desarrollo. Hoy hablamos de responsabilidad compartida y empezamos a ver testing apoyado por IA.

Pero lo que creo que viene, y esto está apoyado por el último [DORA Report](https://dora.dev/research/2025/dora-report/) sobre inteligencia artificial, es que vamos hacia arquitectos de ecosistemas de calidad. Es decir, hacia el desarrollo de plataformas internas que faciliten la calidad a todos. No ejecutores de pruebas, sino constructores de herramientas y cultura.

## Pero, ¿hace falta QA en los equipos? El framework: querer, poder, saber

Manfred se caracteriza por entender las necesidades de sus clientes y aconsejar el perfil o la solución que mejor se adapta a su problema. Por eso, para el tema del testing, me pareció importante comentar mi visión honesta sobre cuándo un equipo necesita un QA y qué tipo de perfil es el más adecuado.

En resumen, mi punto de vista es que depende de tres variables: si el equipo **sabe, quiere y puede** hacer testing.

→ En este artículo está más desarrollada la idea: [¿Es el rol de QA necesario en los equipos?](https://testingfromthetrenches.com/rolqanecesario/)

{{< figure src="/images/manfredQA/framework-saber-querer-poder.png" width="700" alt="Framework saber, querer y poder hacer testing" class="center" >}}

- **Si no quieren hacer testing**, el problema es cultural. Meter un tester funcional no va a resolver nada. Se necesita un quality coach que cambie la cultura del equipo y que les haga ver que la calidad no es un impedimento, sino un habilitador.
- **Si no pueden hacer testing**, normalmente es un tema de tiempo o recursos. Están sobrecargados. Aquí tiene sentido un tester funcional o alguien con conocimientos de automatización que les quite carga.
- **Si no saben hacer testing**, se necesita a alguien senior, con experiencia, que les enseñe procesos, que les cambie la manera de hacer delivery y que les aporte conocimiento técnico.
- Si un equipo se encuentra en ese punto dulce en que sabe, quiere y puede hacer testing bien, probablemente ya tenga la autonomía suficiente para únicamente necesitar apoyo puntual en momentos específicos.

Este framework se puede utilizar como una herramienta práctica para las conversaciones con clientes y equipos.

## Lo que buscan las empresas: automatizar el caos

Muchas empresas detectan que tienen problemas con la calidad y su primera reacción es buscar a alguien que automatice. Para mí, esta frase resume bien el problema: "**Automatizar el caos solo acelera el caos**".

Es decir, en la mayoría de los casos, lo que realmente necesitan es:

- Clarificar procesos y responsabilidades.
- Construir una cultura de calidad.
- Desarrollar mejores herramientas internas.
- Empezar a tomar métricas.

Mucho antes de automatizar, hay que tener un proceso limpio de desarrollo. Buenos criterios de aceptación, entornos adecuados y conocimiento del producto. Vamos, que si automatizas sobre procesos rotos, solo vas más rápido hacia el desastre.

Le comenté que la famosa pirámide de testing es, en realidad, un [iceberg](https://medium.com/@morvader/testing-iceberg-2cc7501f4e06). La parte visible es la automatización, pero la base sumergida, la que no se ve, es tener la cultura, el tiempo, el conocimiento, los entornos adecuados y el apoyo de dirección. Sin esos cimientos, la automatización no funciona.

{{< figure src="/images/manfredQA/testing-iceberg.png" width="700" alt="El iceberg del testing: lo que no se ve de la automatización" class="center" >}}

## Lo que buscan los candidatos: el sesgo de la automatización

Ahora pasamos al otro lado de la ecuación: los candidatos.

Aquí tuve que ser honesto con algo que veo constantemente en las entrevistas. La mayoría de los candidatos solo buscan automatizar. Y lo entiendo. Muchos ya tienen la mirada de las mil yardas después de fases de pruebas manuales interminables, pero creo que es un error de concepto.

He visto a muchas personas que llegan a entrevistas y lo único que quieren saber es si van a poder automatizar. No preguntan por el producto, ni por el equipo, ni por los procesos. Solo quieren automatizar. Para mí, esto es el equivalente a un desarrollador que solo quiere estar con el código y no saber nada de reuniones, de producto o de necesidades del negocio.

Si entiendes el Agile Testing y vas a ser un QA embebido en un equipo, tendrás que hacer lo que sea necesario para que ese equipo entregue con calidad: testing manual cuando toque, documentar, mejorar procesos, automatizar, montar pipelines.

La oportunidad está para los candidatos que entiendan bien el contexto y tengan una visión holística. Que sepan cuándo automatizar y cuándo no. Que entiendan que la herramienta es secundaria frente al problema que estás resolviendo.

**Off topic**: Si alguien está pensando en el rol de SDET, para mí la gran diferencia es que este perfil sí está orientado a la construcción de herramientas de testing y no tanto a automatizar las pruebas de un sistema. Como comento más tarde, esto es algo distinto a un QA embebido en los equipos y creo que sí tiene sentido potenciarlo.

## El problema de liderar equipos

Otro tema que salió fue el de liderar equipos. Muchos profesionales con experiencia aspiran a roles de management, lo cual es totalmente razonable. El problema es estructural: en la mayoría de las empresas solo hay un tester por equipo.

¿Cómo lideras cuando no hay nadie a quien liderar?

Mi recomendación aquí es que, si la empresa tiene suficientes testers, el rol de manager debería ser transversal. No un manager dentro del equipo, porque probablemente no sea posible, sino una especie de mentor de otros testers o QAs de la compañía. Alguien que defina estándares, que haga crecer a otros profesionales y que construya cultura de calidad a nivel organizacional.

Pero estas posiciones son escasas, porque muchas empresas buscan colaboraciones más puntuales que roles permanentes de liderazgo.

## Mi apuesta de futuro: arquitectos de calidad, no ejecutores de pruebas

Como conclusión, [les dejé mi visión del futuro de la profesión](https://testingfromthetrenches.com/futuroqaeraia/).

**Lo que va a desaparecer**: la automatización básica de casos de prueba. Con herramientas como Claude, Copilot y similares, a los propios equipos de desarrollo les será muy fácil desarrollar tests automáticos sencillos. Esta parte caerá de forma natural en los desarrolladores.

**Lo que va a crecer**: el testing de modelos y la construcción de ecosistemas de calidad. Pasar de ejecutor de pruebas a arquitecto de calidad.

- **El constructor de ecosistemas de calidad aumentado con IA**. Alguien que no solo automatiza, sino que construye plataformas internas que faciliten la calidad a todos. Que use IA para crear herramientas inteligentes, sistemas de validación que aprendan solos y monitorización proactiva.
- **El validador de IAs**. Ahora muchas aplicaciones usan chatbots y tienen LLMs integrados. Esto también hay que probarlo y es un campo completamente nuevo. Alguien tiene que validar que estos sistemas respondan bien, que no alucinen y que no generen contenido inapropiado. Es un área con muchísimas posibilidades.

La automatización va a seguir siendo fundamental porque, a la velocidad a la que se desarrolla código hoy, es imposible validar manualmente. El testing manual seguirá existiendo, pero la automatización es crítica.

La duda que queda es si seguirá siendo necesaria la misma cantidad de testers. Mi sensación es que disminuirá el número global, pero aumentará el nivel de especialización y el valor que aporten quienes se queden.

**El futuro del QA no es testear mejor, sino hacer que testear sea más fácil para todos.**
