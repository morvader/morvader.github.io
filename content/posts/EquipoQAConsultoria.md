---
title: "Construyendo un equipo de QA desde cero en una consultora"
aliases: ["/posts/equipoqaconsultoria/"]
subtitle: "Estrategia y aprendizajes en Sngular"
date: 2025-05-21T8:00:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Experiencia personal de como pasé de ser el único tester de Sngular a formar un equipo internacional de 50 personas"
license: ""
images: ["/images/equipoQaConsultora/equipoQa.png"]

tags: ["Cultura", "QA", "Equipos", "Quality Engineering", "Liderazgo"]
categories: []

featuredImage: "/images/equipoQaConsultora/equipoQa.png"
featuredImagePreview: "/images/equipoQaConsultora/equipoQa.png"

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
    # someCSS = "some.css"
    # located in "assets/"
    # Or
    # someCSS = "https://cdn.example.com/some.css"
  js:
    # someJS = "some.js"
    # located in "assets/"
    # Or
    # someJS = "https://cdn.example.com/some.js"
seo:
  images: ["/images/equipoQaConsultora/equipoQa.png"]
---

# Construyendo un equipo de QA desde cero en una consultora

En este artículo, me gustaría compartir la experiencia de como se formó el equipo de QA en Sngular. Pasando de ser yo, prácticamente el único tester de la compañía a convertirnos en un equipo de 50 personas, repartidas en España, México y USA y llegar a facturar 3 millones de euros al año.

***Disclaimer: En los 9 años que pasé en Sngular, la empresa pasó de 400 a 1300 personas. Aunque mi papel haya podido ser importante, es obvio que el crecimiento de QA habría ocurrido de cualquier manera.***

Cuando me uní a Sngular, venía de montar un equipo de QA de 3 personas en una pequeña empresa de producto Asturiana. Sería el año 2010 y en aquella época era cuando se estaba empezando a conocer, al menos en España, todo el tema del Agile Testing y filosofía DevOps. Eso hizo que ya me interesase por salirme del testing más tradicional y enfocarlo desde una perspectiva mucho más pragmática y enfocada en el aporte de valor.

En mis primeros días en Sngular, recuerdo claramente una conversación con el director de operaciones, le planteé si veía factible construir un equipo de QA estando yo en Asturias, mientras la empresa se dirigía desde Madrid. Su respuesta fue contundente: "Por supuesto que sí, si el negocio lo justifica". Esta frase, aunque sencilla, estableció la premisa fundamental que guiaría todo mi camino. Lo que realmente me estaba diciendo es que, si lograba demostrar que el testing generaba negocio, todo lo demás vendría solo.

Hay que entender el punto de partida. Sngular, entonces como ahora, es una consultora tecnológica dedicada al desarrollo de proyectos y ejecución de servicios. El testing, en aquel momento, no figuraba en el catálogo ni era algo que los clientes demandaran activamente. No éramos, ni es hoy, una empresa con un posicionamiento de mercado específico en testing. Esto, se convirtió en un reto adicional: ¿cómo vender algo para lo que no tienes una imagen de marca consolidada?

## El ADN de la consultoría: beneficio, costes y la justificación de la inversión

Para entender el contexto completo, es importante comprender cómo funciona una consultora. A diferencia de una empresa de producto, donde las inversiones en calidad tienen un retorno directo sobre el propio producto, el negocio de las consultoras se justifica por su beneficio y la reducción de costes.

El modelo de negocio se basa fundamentalmente en la venta de horas. Todo lo que no sea venta de horas o facturación directa se considera un gasto. En este entorno, cualquier decisión debe estar justificada en base al aumento de facturación o la reducción de costes; es decir, el incremento de la rentabilidad.

Esto hacía que comenzar con el testing fuera particularmente complicado. Tradicionalmente, el testing es visto por muchos clientes como un gasto, algo por lo que nadie quiere pagar explícitamente, pues se asume que debería estar incluido en el precio base del desarrollo.

En este contexto, la pregunta no era solo cómo implementar buenas prácticas de testing, sino cómo hacerlo de manera que generara valor de negocio visible y cuantificable, tanto para Sngular como para sus clientes.

## Estrategia: Hazlo inevitable

Muchos podrían esperar que mi estrategia inicial fuera ir equipo por equipo técnico, introduciendo técnicas de testing, testing unitario, pruebas de interacción y buenas prácticas de calidad. Este habría sido el camino lógico, pero estoy seguro de que me habría llevado muchísimo tiempo y recursos sin garantías de éxito.

Así que opté por la ruta contraria: **asegurarme de que los proyectos se vendieran con el testing ya incluido**. De esta manera, los equipos se verían "obligados" a hacerlo, y la contratación de perfiles específicos de testing estaría justificada desde el inicio.

Esta aproximación significaba trabajar primero la parte comercial antes que centrarme en la parte técnica.

¿La clave? **Convertir a los Business Managers en aliados**. Un comercial quiere, como es natural, vender más. Si les proporcionas las herramientas, el discurso y la confianza para ofrecer algo nuevo y de valor para los clientes, estarán encantados de hacerlo. Era un win-win claro.

Mi foco inicial, además de mi trabajo en proyectos, fue crear un discurso comercial sólido, preparar materiales de apoyo y generar una nueva forma de enfocar el testing: moderna, ágil y, fundamentalmente, que nos distinguiera de la competencia. El posicionamiento de Sngular como consultora de valor, y no de bajo coste, nos ayudó enormemente. Esto nos permitió construir una oferta de valor en torno al QA sin necesidad de entrar en una guerra de precios con empresas nacionales o internacionales, especialmente aquellas de países con costes más bajos donde el testing a menudo se percibe como una commodity.

## Redefinir el valor del testing

Era fundamental cambiar la percepción del testing. En lugar de presentarlo como una forma de "encontrar errores", lo posicioné como un elemento que:

- **Mejora el *delivery*** continuo y la velocidad de entrega.
- Está **orientado al negocio**, alineando la calidad con los objetivos del cliente.
- **Aporta eficiencia** al ciclo de vida del desarrollo, reduciendo costes.
- **Maximiza el valor entregado** al cliente final, asegurando que el producto cumple sus expectativas y necesidades.

Buscamos estar siempre cerca tanto de la parte técnica como de la de negocio, generando impacto tangible para que desde mandos intermedios hasta CTOs y la alta dirección (nivel C) entendieran el valor que aportábamos, un valor que trascendía el simple reporte de bugs. Si no puedes competir en precio, busca un valor diferencial. En consultoría es difícil encontrar "océanos azules", pero siempre hay espacio para la diferenciación.

## De la obligación comercial a la cultura de calidad

Con los proyectos ya vendidos incluyendo QA, los equipos técnicos se encontraron con una nueva realidad: tenían que integrar prácticas de testing en su día a día. Lo que comenzó como una imposición contractual pronto reveló su verdadero valor.

En las primeras reuniones con los equipos, pude percibir cierta resistencia inicial. "Ya tenemos suficiente con cumplir los plazos, ¿y ahora esto?", parecían pensar algunos. Sin embargo, esta actitud cambió rápidamente cuando empezaron a experimentar los beneficios de contar con QA desde el principio:

- Los requisitos se clarificaban mejor antes de comenzar a desarrollar
- Las incidencias se detectaban más temprano, cuando son menos costosas de corregir
- Los clientes estaban más satisfechos con la calidad de las entregas
- Se reducía notablemente el trabajo de soporte post-entrega

Este cambio de mentalidad comenzó a propagarse orgánicamente por la organización. Los equipos que habían trabajado con QA hablaban positivamente de la experiencia, y otros equipos empezaban a solicitarlo incluso en proyectos donde inicialmente no estaba contemplado.

## La calidad como sello de identidad

Cuando más proyectos comenzaron a incorporar prácticas de QA y los resultados se hacían evidentes, la calidad empezó a convertirse en parte de la identidad de Sngular.

En las reuniones con clientes, el equipo de negocio destacaba nuestro enfoque de calidad como algo diferencial de nuestra propuesta de valor. Gracias a ese enfoque se ganaron algunos proyectos importantes.

En las entrevistas de contratación, los candidatos mencionaban que querían unirse a Sngular porque habían oído hablar de nuestro enfoque de calidad. No estábamos solo atrayendo testers, sino desarrolladores que valoraban trabajar en un entorno donde la calidad formaba parte del día a día.

## Resultados obtenidos

En 6 años pasamos de ser una única persona dedicada al testing a un equipo internacional de cincuenta personas.

Este crecimiento no fue solo cuantitativo sino también cualitativo:

- Desarrollamos una **metodología propia de testing**, adaptada a la agilidad y a las necesidades de nuestros clientes.
- Creamos **herramientas y servicios específicos** que nos aportaban un valor diferencial.
- Ganamos **visibilidad en el mercado** como referentes en QA, participando en comunidades y eventos.
- Establecimos **planes de carrera y formación continua** para nuestros profesionales, fomentando su crecimiento.
- Logramos que los equipos de desarrollo **integraran naturalmente las prácticas de testing** como parte esencial de su flujo de trabajo.

Quizás lo más importante es que conseguimos cambiar la percepción del testing tanto internamente como en nuestros clientes, pasando de ser visto como un coste necesario a ser valorado como una inversión que optimiza el proceso completo de entrega de software.

## Consejos, fallos y aprendizajes en el camino

Si tuviera que destilar la experiencia en consejos prácticos, serían estos:

### ✅ Qué funcionó

1. **Posiciónate y diferénciate:** No vendas pruebas, vende soluciones y valor. Encuentra tu mensaje único. En un mundo globalizado, siempre habrá alguien más barato. Si no te diferencias, competirás en precio, y esa es una batalla difícil de ganar a largo plazo.

     - Llegamos a cambiar el nombre de QA a QE (Quality Engineering) para que se entendiera mejor lo que hacíamos y centrar el aporte de valor, no tanto en las prubas, sino en la mejora de todo el proceso de delivery.
 
1. **Los comerciales son tus aliados:** Ellos eran el canal real de expansión. Dales un buen discurso, prepárales material y déjales hacer su trabajo.
2. **Crea comunidad y comparte conocimiento:** Genera conocimiento tanto interno como externo. Da charlas, asiste a eventos, escribe artículos. Monta una comunidad alrededor del conocimiento de la empresa. Esto no solo atrae talento, sino que también posiciona a tu equipo como referente.
  
     - Hicimos público nuestro [itinerario formativo](https://gitlab.sngular.com/sngulartech/itinerario-formativo-qa)
     - Publicamos numerosos artículos técnicos en el blog de Sngular de manera regular
  
3. **Fomenta la innovación:** Explora nuevas soluciones, herramientas y servicios propios que aporten un valor de negocio añadido a los clientes. Esto te mantendrá relevante y por delante de la competencia.

    - Focalizamos la investigación y desarrollo de herramientas propias en Contract Testing.
    - Establecimos un partnership con [Pactflow](https://pactflow.io/) (Smartbear)
    - Desarrollamos herramienta de testing automátio de diseños en Figma
4. **Invierte en talento y cultura:** Necesitas gente de buen nivel, concienciada y alineada con tu visión de la calidad. Desarrolla planes de formación y carrera que permitan a las personas evolucionar y evangelizar, tanto internamente como en los clientes.

    - Elaboramos un plan de desarrollo de carrera escífico para el área de testing. Evaluando tanto la parte técnica, cultural, estratégica como de manager.

5. **La estrategia comercial primero:** Generar la necesidad en los clientes primero puede ser más efectivo que intentar un cambio cultural interno desde la base técnica sin un mandato claro o proyectos que lo demanden.
    
    - Acompañamos en todo momento a los comerciales en las reuniones con clientes. Aportando ideas y estrategia de negocio desde el primer momento.

### ❌ Qué no funcionó

- **Empezar desde lo técnico sin apoyo comercial ni de dirección:** Intentar impulsar un cambio cultural profundo en los equipos de desarrollo sin tener proyectos que demanden QA o sin el respaldo explícito de la dirección es una tarea titánica y a menudo frustrante.
- **Pensar que el valor del QA se entiende por sí solo:** No podemos asumir que todo el mundo (clientes, comerciales, e incluso otros técnicos) comprende intrínsecamente el valor estratégico del testing. Hay que explicarlo, demostrarlo y, sobre todo, traducirlo a beneficios tangibles.
- **Querer cambiar la cultura sin una estrategia de negocio clara detrás:** Los cambios culturales son más efectivos cuando están alineados y soportados por una estrategia de negocio que los justifica y les da un propósito.

### 🧭 Aprendizajes clave

- **No vendas pruebas. Vende confianza, entrega de valor e impacto en el negocio.** Los clientes no compran "testing"; compran la tranquilidad de que su producto funcionará, la eficiencia en sus entregas, la mejora de sus resultados y reducir costes.
- **En consultoría, el valor debe ser tangible y demostrable.** Las métricas, los casos de éxito y las oportunidades de negocio son fundamentales para justificar la inversión en QA.
- **La perfección es enemiga de lo bueno:** Es mejor ser valiente, confiar en el instinto y dar pasos hacia adelante. En muchas ocasiones, avanzar es fundamental para conseguir resultados, aunque no sea con la solución ideal. Iterar, entregar valor incrementalmente y mejorar de forma continua siempre será más efectivo que quedarse paralizado buscando la perfección.
- **Cuidado con el "síndrome del experto solitario" al inicio:** Intentar hacerlo todo tú mismo, especialmente en las primeras etapas, no es escalable ni sostenible. Empoderar a otros, delegar y construir un equipo sólido es crucial para el crecimiento.

## Conclusión

Montar un área de QA en una empresa donde no se esperaba fue un reto enorme. Pero también fue una oportunidad.

No lo conseguí con herramientas, ni con procesos, ni con normas. Lo conseguí **entendiendo el negocio**, **alineándome con quienes realmente podían generar cambio** (comerciales, clientes, dirección), y **reposicionando el testing como una palanca de valor, no como un centro de costes.**

Mi consejo final es claro:

> Si quieres impulsar el QA en una consultora, deja de vender pruebas. Vende impacto.
> 

Espero que esta historia y estos aprendizajes te sirvan de inspiración.