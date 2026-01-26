---
title: "Contexto vs. Sesgo: Por qué tu opinión personal no debería guiar tu testing"
subtitle: "Ante una misma situación, el contexto marca la diferencia entre bug o detalle menor"
date: 2025-10-06T10:00:00+01:00
lastmod: 2025-10-06T10:00:00+01:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Ante una misma situación el contexto marca la diferencia entre bug o detalle menor"
license: ""
images: ["/images/substack/contexto-sesgo/contexto-sesgo-1.jpeg"]

tags: ["Cultura", "Testing Exploratorio"]
categories: []

featuredImage: "/images/substack/contexto-sesgo/contexto-sesgo-1.jpeg"
featuredImagePreview: "/images/substack/contexto-sesgo/contexto-sesgo-1.jpeg"

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
  images: ["/images/substack/contexto-sesgo/contexto-sesgo-1.jpeg"]
---

## ¿Reportarías esto como un bug?

Te encuentras testeando un e-commerce y te encuentras con esta situación. ¿Abrirías un ticket en Jira?

![Ejemplo Bug Crítico](/images/substack/contexto-sesgo/contexto-sesgo-1.jpeg)

Antes de responder, déjame contarte por qué esta pregunta es más compleja de lo que parece...

## El contexto lo es todo

En casi todo lo que hacemos en la vida, el contexto es fundamental. Una misma acción puede tener diferentes efectos en función de las circunstancias en las que se produce. Esto, que parece lógico y de sentido común, no siempre se tiene en cuenta a la hora de hacer testing.

En el caso concreto del ejemplo se trata de un producto que se vende en Amazon, es decir, para un público general. Pero ¿cambiaría tu respuesta si se tratase de un e-commerce de una marca comprometida con el movimiento LGTBI? ¿Y si esa marca hubiera lanzado campañas con el claim "La ropa no tiene género"? En cualquier caso, ¿Mi opinión personal sobre el asunto sería relevante?

Siempre digo que el testing debe centrarse en reducir riesgos para el negocio y, por tanto, reportar problemas. Es decir, un bug es una parte de los problemas que pueden tener un impacto negativo sobre nuestros usuarios. Pero hay más: mala UX, complejidad de uso, problemas de performance, falta de accesibilidad, mal diseño, falta de consistencia, etc.

El ejemplo que os muestro, ¿podría suponer algún problema o poner en riesgo el negocio? Pues depende del contexto.

## Mi proceso mental de análisis

En este caso concreto voy a explicar el proceso mental que seguiría:

### Posible problema

Los usuarios podrían percibir que la manera de seleccionar el corte de la camiseta no se corresponde con el mensaje de la misma.

### Análisis de contexto

Todo el mundo tiene asumido que "mujer" se refiere a corte ajustado y corto y "hombre" a corte recto. Seguramente los usuarios no tendrían dificultad en escoger la prenda adecuada a sus gustos. Además, se trata de Amazon, por lo que esta selección podría resultar adecuada. ¿En otro tipo de e-commerce podría no serlo?

### Opinión personal

Las prendas de vestir no tienen género. Ese campo se refiere al tipo de corte de la prenda. En este caso podría resultar más correcto: "recto" y "ajustado".

### Riesgos asociados

Aquí es donde debemos ser específicos y pensar como el negocio:

**Riesgo reputacional:** Puede haber colectivos a los que este tipo de clasificación de prendas no les resulte adecuado y deriven en quejas a la página o en redes sociales. Especialmente crítico si la marca se posiciona como inclusiva.

**Riesgo de conversión:** ¿Podría haber usuarios que no encuentren su "fit" y abandonen la compra? En Amazon, probablemente no. En un e-commerce especializado, quizás sí.

**Impacto en imagen de marca:** Para un marketplace genérico como Amazon, el impacto sería bajo. Para una marca con posicionamiento específico en diversidad, podría ser crítico.

### Conclusión y acciones

Comentaría esta situación con los responsables de producto para llamar su atención y ponerles en conocimiento del posible riesgo asociado y si podría afectar a las ventas o imagen de la marca. Conocer la postura de la empresa ante estas cuestiones facilitaría la labor de testing y futuros reportes de problemas.

## Recomendaciones para evitar sesgos en testing

Somos humanos, es inevitable tener sesgos. Por eso, lo más importante es tomar consciencia de esta situación y actuar en consecuencia y de manera profesional.

Aquí te doy algunas recomendaciones que me ayudan en este proceso:

1. **Antes de reportar, pregúntate:** "¿Esto afecta a los objetivos de negocio o solo me incomoda a mí?"

2. **Investiga el contexto:** ¿Quién es el público objetivo? ¿Cuál es el posicionamiento de marca? ¿Qué valores comunica la empresa?

3. **Repórtalo siempre que tengas dudas:** Comunícalo como "observación de riesgo" o "punto de mejora", no necesariamente como bug crítico.

4. **Sé proactivo y genera conversaciones:** "He visto esto, ¿conocéis el posicionamiento de la empresa al respecto?" Esta pregunta abre el diálogo sin imponer tu criterio.

5. **Documenta el razonamiento:** No reportes solo "esto está mal", explica el contexto, los riesgos potenciales y deja que el equipo de producto decida con toda la información.

6. **Favorece la diversidad y mob testing:** No es solo que 4 ojos vean más que 2, es que contar con personas con diferentes puntos de vista y experiencias vitales enriquecerá enormemente las conversaciones y el proceso de testing.

## Conclusión

El contexto importa, SIEMPRE, marca la diferencia entre lo que puede ser un problema importante o un simple detalle. Ten siempre una visión crítica cuando estés testeando, sé práctico, pregunta e intenta evitar tus propios sesgos. Para ello alinea siempre tus pruebas con los objetivos de negocio de la empresa.

¿Y tú? ¿Lo habrías reportado como bug? Me gustaría conocer tu proceso de análisis.
