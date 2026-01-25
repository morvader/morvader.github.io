---
title: "Estrategia para introducir Testing Automatizado en equipos sin experiencia"
subtitle: "De APIs a Unitarios: Una Ruta Alternativa para Adoptar Testing Automatizado"
date: 2025-02-11T15:58:26+08:00
lastmod: 2025-02-11T15:58:26+08:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Un Enfoque Pragmático para Iniciar la Automatización de Pruebas"
license: ""
images: ["/images/apiTesting/TestingStrategy.png"]

tags: [Unit testing]
categories: []

featuredImage: "/images/apiTesting/TestingStrategy.png"
featuredImagePreview: "/images/apiTesting/TestingStrategy.png"

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
  images: ["/images/apiTesting/TestingStrategy.png"]
---
<!--more-->

# Un enfoque pragmático para empezar con la automatización de pruebas

Un tema recurrente que me he encontrado varias veces es la pregunta de cómo introducir la automatización de pruebas en equipos que aún no lo están haciendo.

Ya he comentado en otras ocasiones que hay [varios](https://medium.com/@morvader/es-el-rol-de-qa-necesario-en-los-equipos-ac6858586c7b) factores que influyen.

El primero de ellos es el [contexto](https://medium.com/@morvader/testing-iceberg-2cc7501f4e06), y otro punto importante puede ser el orden en el que se intente abordar esta tarea. Típicamente, la recomendación casi universal es comenzar por el testing unitario; creo que es aquí donde podemos correr el riesgo de partir de un punto que no sea adecuado para el equipo.

Tengo una opinión bastante firme sobre que el principal motivo por el que los equipos no hacen testing es porque no tienen los conocimientos suficientes para ello.

Esto hace que sigan malas prácticas y, por tanto, lleva a la frustración en el medio plazo. Al final, esto termina en un abandono del testing automatizado.

Voy a explicar un poco más esta idea y por qué creo que puede ser interesante aplicar otro enfoque.

## Empezar por unitarios es complicado

Seamos claros: escribir un test unitario es técnicamente muy sencillo.

Lo que no es tan fácil es establecer una estrategia de testing y hacer que una suite de pruebas sea mantenible, eficiente y siga buenas prácticas de programación.

El error más típico es comenzar con pruebas unitarias, haciéndolas muy acopladas al código. Esto hace que sean muy frágiles y fallen ante cualquier mínimo cambio del código de producción.

Es normal que, ante esta situación, los equipos sientan que están perdiendo el tiempo, se frustren y sientan que hacer tests les está ralentizando la entrega.

Otro punto que puede generar fricción a nivel técnico es la gestión de dependencias.

Es habitual que los equipos no sepan o no sigan las mejores prácticas a la hora de mockear las dependencias externas, con lo que el código se vuelve, de nuevo, muy rígido y difícil de mantener.

Por eso digo que, aunque la recomendación sea comenzar con pruebas unitarias, si no se tiene una buena base de conocimientos, puede producir frustración, malos resultados y abandono.

## Empezar por las APIs

Para un equipo que no tiene nada de testing automatizado, ¿por qué creo que empezar con las APIs puede ser la mejor opción?

- Validamos reglas de negocio, es decir, el núcleo de nuestro sistema. Por lo que estas pruebas ya deberían ser útiles como batería de regresión y/o prueba de humo.
- Los tests unitarios pueden ser más abstractos, pero, desde un punto de vista práctico, el primer test de integración ya está validando reglas de negocio.
- Estas pruebas suelen ser más resistentes a los cambios en código. Evitaríamos la frustración generada por refactorizaciones.
- Entendemos mejor el propósito de las pruebas, ya que nos centramos en el comportamiento esperado y no tanto en su implementación: ***Test behaviour, not implementation***
- A medida que escribamos más tests, iremos aprendiendo técnicas y estrategias básicas de automatización, como las siguientes:
  - Uso de hooks (Before, After, BeforeEach, etc.)
  - Elección correcta de aserciones
  - Atomicidad de las pruebas, evitando dependencias
  - Manejo adecuado de conjuntos de datos para pruebas
  - Es posible que tengamos que gestionar dependencias externas; iremos aprendiendo cómo lidiar con estos casos
  - Técnicas de reutilización de pruebas y cómo hacerlas más mantenibles
  - Selección de casos límite y testing [negativo](https://testingfromthetrenches.com/negativetesting/)
  - Integración de pruebas en pipelines de CI

Una vez que tengamos una buena base de conocimientos de testing, será más sencillo retomar el testing unitario de manera efectiva y adecuada.

De seguir por esta línea, es probable que lleguemos a un punto donde la pirámide de testing tenga forma de trofeo.

[Imagen de la pirámide de testing en forma de trofeo]

{{< figure src="/images/apiTesting/TestingTrophy.png" width="600" alt="Trofeo testing" class="center" >}}

## Conclusión

En definitiva, comenzar con las pruebas de API puede hacer que tengamos unos "quick wins" inmediatos y dispongamos rápidamente de una red de seguridad que nos permita validar nuevas versiones. Esto es muy importante para que los equipos comiencen a ver la utilidad y ventajas de tener pruebas automatizadas.

Además, y también fundamental, el equipo irá adquiriendo técnicas y estrategias de testing básicas. Con ello, introducirse en el testing unitario debería generar menos fricción y sería el siguiente paso para que estos equipos comiencen a tener ciclos de retroalimentación más cortos.
