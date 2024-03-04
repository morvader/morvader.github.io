---
title: "Testing defensivo"
subtitle: "La importancia del testing negativo"
date: 2024-02-05T12:00:00+08:00
lastmod: 2024-02-05T12:00:00+08:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Las pruebas negativas son necesarias para descubrir comportamientos inesperados de nuestro código"
license: ""
images: []

tags: [Quality Assurance]
categories: []

featuredImage: "/images/negativeTestingPost/inicial.png"
featuredImagePreview: "/images/negativeTestingPost/inicial.png"

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
  images: [/images/negativeTestingPost/inicial.png]
---
<!--more-->

## Un tester hace mejores pruebas que un desarrollador

El otro día volví a ver un debate sobre si los testers hacían mejores pruebas que la gente de desarrollo y, como este es un tema recurrente, voy a intentar dar mi punto de vista.

Empecemos por el principio: **¿Qué entendemos por buenas pruebas?**

* ¿Las que descubren bugs?
* ¿Las que aumentan la cobertura funcional?
* ¿Las que están alineadas con los objetivos de negocio?
* ¿Las que minimizan los riesgos (seguridad, monetarios, legales, etc.)?
* ¿Las que mejoran la experiencia de usuario (UX, performance, diseño, etc.)?

Por supuesto, no son excluyentes, pero podemos intuir que las skills necesarias en cada uno de los puntos puede variar.

Ahora, analicemos qué factores pueden influir en que un dev y un tester no prueben de la misma manera una aplicación.

* **Objetivos desalineados**: A unos les miden por reportar incidencias a otros por terminar historias de usuario
* **Skills diferentes**: El testing, necesita de heurísticas y conocimientos específicos
* **Efecto del apego**: Los desarrolladores pueden no estresar el sistema por no ver como "su creación" falla
* **Sesgos**: No todos interpretamos la información de la misma manera. La forma en que entendemos un requerimiento y los transformamos en caso de prueba puede diferir.
* **Unknowns/Unknowns**: Siempre hay información o situaciones que ni siquiera conocemos.

Después de esta introducción, ¿podemos decir que un tester hace mejores pruebas que un dev?. Pues no necesariamente, pero para mí, la clave puede estar en el **Testing negativo**

## Origen de los errores

El código, siempre es el código.

Idealmente, no debería haber diferencia entre el el comportamiento esperado y el código implementado. Pero sabemos que, por muchos factores, eso es prácticamente imposible.

![targets](/images/negativeTestingPost/inicial.png)

Ahora, como puede verse en el diagrama, básicamente pueden darse dos situaciones de error:

* El comportamiento deseado no está implementado
* El código hace cosas que no debería

Detectar los errores en el primer caso es mucho más sencillo que en el segundo. Bastaría con cubrir los happy path de las historias de usuario y comprobar que todo funciona como se espera. Habitualmente, estas pruebas son fácilmente automatizables y, desde mi punto de vista, no se requieren unas skills avanzadas para este tipo de testing.

Podríamos decir que este tipo de pruebas entran más en lo que podríamos llamar **checking** en lugar de testing. Por tanto, no debería haber una diferencia significativa en que las pruebas las realice un tester o un dev.

Lo realmente complejo está en el segundo caso. Detectar comportamientos no esperados del código implican hacer **testing negativo**

## La importancia del testing negativo

El impacto de los comportamientos no esperados suele tener unas consecuencias impredecibles sobre los sistemas y es la raíz de las grandes crisis de las empresas. Estos problemas suelen estar relacionados con: Fallos de seguridad, elevación de privilegios, workflows inconsistentes, errores de concurrencia, condiciones de carrera, filtrado de datos, etc.

Es en este punto donde sí que creo que un perfil de testing puede aportar un plus sobre alguien de desarrollo, por varios motivos:

* Conoce heurísticas específicas para detectar casos negativos
* POV: Cuando has implementado una funcionalidad, resulta complicado pensar que la codificación no es correcta
* Conocimientos en herramientas específicas de estrés de sistemas (performance, fuzzy testing, seguridad, etc.)
* Experiencias previas en testing de sistemas similares

![targets](/images/negativeTestingPost/completo.png)

## Técnicas para hacer testing negativo

Algunas de las técnicas más habituales para realizar testing negativo son:

* **"Qué pasaría sí"**: (Error guessing) Identificar posibles situaciones de error o de riesgo elevado e intentar reproducirlas
* **Exploratory Testing**: Sesiones en las que el tester puede evalúa y aprende sobre el sistema de manera simultánea
* **Pair/Mob Testing**: Sesiones en las que se evalúan funcionalidad de manera colaborativa y se resuelven dudas en el momento
* **Fuzzy Testing**: Generar, automáticamente, entradas pseudoaletorias en busca de comportamientos no deseados
* [**Pairwise testing**](https://federico-toledo.com/pairwise-testing): Buscar combinaciones de variables que aumenten la probabilidad de encontrar errores
* **Pruebas de transición de estados**: Intentar de producir transiciones de estados no permitidas
* **Análisis de casos límite**
