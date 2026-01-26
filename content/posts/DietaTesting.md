---
title: "De la dieta al Testing: Por qué fallan nuestras buenas intenciones con la calidad"
subtitle: "La adherencia y reducir fricciones son más importantes que la perfección"
date: 2025-10-30T10:00:00+01:00
lastmod: 2025-10-30T10:00:00+01:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "La adherencia y reducir fricciones son más importantes que la perfección"
license: ""
images: ["/images/substack/dieta-testing/dieta-testing-1.png"]

tags: ["Cultura", "Estrategia"]
categories: []

featuredImage: "/images/substack/dieta-testing/dieta-testing-1.png"
featuredImagePreview: "/images/substack/dieta-testing/dieta-testing-1.png"

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
  images: ["/images/substack/dieta-testing/dieta-testing-1.png"]
---

Hace unos años fui a un nutricionista. No tenía ningún problema con la comida, pero quería verme mejor. Cuando llegué, me preguntó cuál era mi objetivo. "Bajar grasa y ganar músculo", le dije. En aquel momento, su respuesta me dejó descolocado: "Eso es imposible. No funciona así. Primero tienes que hacer una cosa y luego la otra. Las dos a la vez no pueden ser".

Trabajando en el mundo de la calidad, me he dado cuenta de que esta conversación resume perfectamente uno de los mayores problemas cuando los equipos intentan mejorar sus prácticas de testing. Se parte de objetivos contradictorios o poco claros.

## El problema de los objetivos contradictorios

La mayoría de equipos llegan con la misma idea: "Queremos automatizar las pruebas". Es como si yo hubiera llegado al nutricionista diciendo "quiero tomar batidos de proteína" sin saber siquiera si mi problema era el peso, la masa muscular o simplemente malos hábitos alimenticios.

Lo que veo constantemente en equipos que quieren empezar a automatizar los planes de pruebas que ya tienen. Cogen esas listas de casos de prueba manuales que tienen en Excel o en Jira y piensan: "Vamos a automatizar todo esto".

Pero nunca empiezan por hacerse preguntas como: ¿Por qué existe ese caso de prueba? ¿Qué riesgo cubre? ¿Es realmente necesario probarlo en cada release? ¿Automatizarlo es la mejor forma de cubrirlo?

Es como automatizar el caos. Si tus procesos de desarrollo son confusos, si no tienes claro qué estás construyendo ni por qué, si tus criterios de aceptación no existen... automatizar eso solo hará que el caos vaya más rápido.

Y luego hay que sumarle la parte que no se suele tener en cuenta: automatizar no es gratis. Cada test automatizado que escribes es código que hay que mantener. Cuando cambias una funcionalidad, toca actualizar los tests. Cuando el framework se actualiza, toca migrar. Cuando falla un test, toca investigar si es un bug real o si el test está roto.

He visto equipos que automatizan cientos de pruebas y acaban dedicando más tiempo a mantener esos tests que a probar funcionalidad nueva. El equipo se convierte en rehén de su propia automatización. Los tests se vuelven frágiles, fallan constantemente por cualquier cambio menor, y al final la gente deja de confiar en ellos y se abandona.

¿Te suena? Pues eso pasa cuando intentas ganar músculo (automatización) sin haber eliminado la grasa primero (procesos caóticos). Acabas peor de lo que empezaste. Con más peso, torpe, y sin haber solucionado nada.

## La fase de "Limpieza"

Mi nutricionista fue claro: para ganar músculo de forma efectiva, primero necesitaba una base limpia. Quitar la grasa requeriría esfuerzo, buenos hábitos y disciplina. No podía saltarme este paso.

En testing, esta "fase de limpieza" no tiene nada que ver con contratar más QAs o añadir nuevas herramientas de automatización. Se trata de establecer buenos procesos de desarrollo desde el principio:

**Shift-left testing:** Las pruebas tienen que estar desde la fase de diseño y planificación, no al final para validar lo que ya está hecho. Es meter la calidad en cada conversación, en cada refinamiento, en cada daily.

**Criterios de aceptación sólidos:** Antes de que un desarrollador escriba una línea de código, tiene que estar claro qué significa que esa funcionalidad "funcione". No vale con "hacer login". Vale con "un usuario puede iniciar sesión con email y contraseña, recibe un error claro si las credenciales son incorrectas, y es redirigido al área privada tras login correcto".

**Planificación realista:** Reservar tiempo real para pruebas en cada historia. No es "tiempo de desarrollo + algo de testing si sobra tiempo". Es "X horas de desarrollo necesitan Y tiempo de pruebas". Sin negociación.

**Responsabilidad compartida:** La calidad no es trabajo del equipo de QA. Es trabajo del equipo. Punto. El desarrollador que escribe el código es tan responsable de su calidad como cualquier QA. Esto significa que la calidad tiene que ser un ciudadano de primera clase dentro del equipo, no un invitado de última hora.

Este trabajo preparatorio no es vistoso ni tendrá resultado a corto plazo, pero es absolutamente necesario. Muchos equipos se frustran porque intentan automatizar pruebas sobre una base caótica. Es como intentar hacer pesas mientras sigues comiendo fatal: los resultados nunca llegarán.

## El éxito está en la adherencia

![Clean Code & Clean Eating](/images/substack/dieta-testing/dieta-testing-2.png)

Lo más importante fue cuando el nutricionista me habló de adherencia. Me explicó que una dieta, por perfecta que sea en teoría, es inútil si no puedes mantenerla en el tiempo. Tiene que ser acorde con tus objetivos, pero también ser compatible con tu vida: tus preferencias, tu ritmo, tus horarios.

Aquí está la clave: **la adherencia es más importante que la perfección**.

No necesitas implementar las prácticas de testing más avanzadas del mundo. No necesitas parecerte a tus gurús de desarrollo de referencia. Necesitas prácticas que tu equipo pueda mantener día tras día. Prácticas que generen la menor fricción posible con vuestro ciclo de desarrollo habitual.

He visto equipos que intentan TDD puro o frameworks nuevos, solo para abandonarlos a las pocas semanas cuando llega la presión de las entregas. ¿Por qué? Porque quisieron correr sin saber caminar.

## Pequeños pasos que funcionan

Entonces, ¿por dónde empezar? Por lo mismo que con la dieta: con cambios pequeños que puedas mantener. Aquí van algunos que he visto funcionar:

**Definition of Done con pruebas:** Si una historia no tiene pruebas, no está terminada. Punto. No hace falta que sean pruebas perfectas o exhaustivas. Pero algo tiene que haber. Este simple cambio transforma la cultura del equipo.

**Criterios de aceptación claros:** Escribe los criterios antes de desarrollar. Si no sabes qué vas a probar, ¿cómo vas a saber que funciona? Y de paso, te ahorras retrabajos y malentendidos.

**Automatiza los happy paths primero:** Olvídate de automatizar 300 casos de prueba. Empieza por los 3 flujos principales que, si se rompen, tu aplicación no sirve para nada. Esos son tus happy paths.

**Empieza por las APIs:** Si puedes, automatiza primero a nivel de API antes que a nivel de interfaz o incluso unitario. Son más rápidos, más estables y cubren la lógica de negocio sin depender de que un botón cambie de sitio.

**Favorece el testing exploratorio:** En lugar de planes de pruebas pesados que nadie lee, reserva tiempo para que el equipo explore la funcionalidad.

**Mob testing y comunicación continua:** Junta al desarrollador, al QA y al product owner delante de la funcionalidad. Que hablen. Que prueben juntos. Que descubran cosas. La comunicación directa vale más que mil documentos.

## Las cheat meals: Excepciones controladas

Mi nutricionista también me pautó cheat meals. Una vez a la semana, podía saltarme la dieta. No era trampa, era parte del plan. Me permitía salir de la rutina y, paradójicamente, facilitaba que siguiera la dieta el resto del tiempo.

En desarrollo pasa igual con la deuda técnica. A veces hay que tomar atajos. A veces hay que saltarse las pruebas para llegar a una demo importante. A veces hay que priorizar velocidad sobre perfección.

Y está bien. No pasa nada.

El problema no es la excepción ocasional. El problema es cuando la excepción se convierte en la norma. Cuando cada sprint es "esta vez no probamos porque tenemos prisa". Eso es como hacer cheat meal todos los días: ya no es una dieta, es comer mal con remordimientos.

La clave está en ser consciente: "Esta funcionalidad la subimos sin pruebas porque tenemos una urgencia real. Pero sabemos que estamos generando deuda técnica y la apuntamos para revisarla el próximo sprint". Es deuda controlada, no caos disfrazado de agilidad.

## Constancia sobre perfección

Lo que me ayudó a perder peso no fue la dieta perfecta. Fue la dieta suficientemente buena que pude seguir todos los días. Hubo días que me pasé, hubo días que no entrené, hubo semanas flojas. Pero seguí. Y eso es lo que me ayudó con mis objetivos.

Con el testing pasa exactamente igual. Buscar la perfección solo lleva a la frustración y al abandono. "No tenemos tiempo para hacer pruebas end-to-end, así que mejor no hacemos nada". Error. Haz algo. Haz poco. Pero hazlo siempre.

¿Que solo puedes escribir un test esta semana? Pues escribe uno. ¿Que solo automatizas el flujo principal? Perfecto, es mejor que cero. ¿Que tus criterios de aceptación no son perfectos? Da igual, son mejores que no tener ninguno.

**La constancia vence a la perfección. Siempre.**

## Haciendo que la calidad sea un hábito

Al final, la calidad no es un sprint, es un maratón. No se trata de hacer un esfuerzo heroico puntual que luego abandonamos cuando vienen prisas. Se trata de integrar pequeñas prácticas en nuestras rutinas diarias hasta que se vuelvan automáticas.

Como en la dieta, la clave está en tener objetivos claros y realistas, aceptar el coste inicial, empezar con una base limpia, priorizar la adherencia sobre la perfección, y aceptar que habrá excepciones controladas.

Y cuando eso se convierte en hábito, descubres que la calidad deja de ser algo que "haces" para convertirse en algo que "eres".
