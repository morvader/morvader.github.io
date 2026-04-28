---
title: "Quality Flow: Agentic Delivery Tool"
subtitle: "Cuando la calidad deja de ser una sucesión de tareas aisladas"
date: 2026-04-28T08:00:00+02:00
lastmod: 2026-04-28T08:00:00+02:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Quality Flow es un plugin de Claude Code que cubre seis operaciones del ciclo de calidad: refinar historias, generar tests, investigar bugs, resolverlos, auditar tests existentes y reportarlos. Todas las piezas comparten contexto con Jira, Grafana, incident.io y Slack."
license: ""
images: ["/images/substack/quality-flow/01-quality-flow-overview.png"]

tags: ["QA", "IA", "Automatización", "Calidad", "Herramientas", "Estrategia"]
categories: []

featuredImage: "/images/substack/quality-flow/01-quality-flow-overview.png"
featuredImagePreview: "/images/substack/quality-flow/01-quality-flow-overview.png"

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

Hoy os quiero compartir cómo estamos aprovechando la IA para mejorar el desarrollo de aplicaciones en [Technosylva](https://technosylva.com/). Hemos creado el plugin "Quality Flow".

Cuando empecé con la idea de desarrollar este conjunto de skills para desarrollo y aseguramiento de la calidad, me paré a pensar en las cosas que sabemos que deberíamos estar haciendo pero que finalmente no hacemos por pereza, por silos en la empresa, por falta de conocimiento técnico, por falta de tiempo, etc.

Entonces, centrado en la resolución de bugs y la creación de pruebas, me salió esta lista inicial. *(Dentro del contexto de Technosylva)*

- Acceso a Grafana para comprobar trazas de logs
- Incident.io para revisar incidencias relacionadas
- Histórico de bugs para comprobar incidencias similares
- Acceso a Slack para ampliar el contexto del problema y llegar a conversaciones relacionadas
- Jira para tener contexto del proyecto y los criterios de aceptación
- Historial de Git para ver la secuencia de cambios

Quality Flow nace como una navaja suiza para facilitar la resolución de bugs y la generación de tests.

## ¿Y qué es exactamente?

Es un plugin de Claude Code que cubre seis operaciones del ciclo de calidad. Refinar historias, generar tests, investigar bugs, resolverlos, auditar los tests existentes y reportarlos. La diferencia con un linter de tests o con un generador de casos no está en lo que hace cada pieza, sino en que **todas comparten contexto**. Hablan con Jira, con los logs en Grafana e incident.io, y con tu codebase.

![Quality Flow: visión general de las seis operaciones del ciclo de calidad](/images/substack/quality-flow/01-quality-flow-overview.png)

Vamos por partes.

### Refinar antes de automatizar

Automatizar lo que no está bien definido es el camino más rápido hacia el desastre. Lo primero siempre es partir de una historia de usuario clara con criterios de aceptación bien definidos.

`/qa-refine-story` lee una historia de Jira y la puntúa en tres dimensiones. Claridad, completitud y testabilidad. Detecta términos vagos como "debe ser rápido" o "el sistema debe responder bien", propone criterios de aceptación medibles y los integra en Jira tras tu aprobación.

![Skill /qa-refine-story en acción](/images/substack/quality-flow/02-refine-story.png)

Y mira también en Slack. Esto no es un detalle menor. **Una parte enorme de las decisiones de producto se toman en hilos de Slack que nadie se acuerda de copiar de vuelta a Jira**. El "ah, sí, eso lo hablamos el lunes y al final acordamos X" pasa todas las semanas. El skill busca esos hilos, los muestra con su enlace directo y los promueve a preguntas de confirmación al PO. Solo si el PO lo confirma, la decisión entra en los criterios de aceptación. El resultado, además, queda anotado en Jira con un apartado de `Sources` que enlaza los hilos. Así, la próxima vez que alguien lea esa historia, el contexto ya no está disperso.

¿Por qué importa? Porque la mayoría del rework en testing nace de historias mal definidas. Si los criterios de aceptación no son testeables, los tests tampoco lo van a ser. Refinar antes de desarrollar no es una ceremonia ágil más, es la mejor inversión de quick wins que puedes hacer.

### Generar tests con todo el contexto

`/qa-test-story` transforma criterios de aceptación en tests ejecutables. Detecta automáticamente qué frameworks tienes en el proyecto, analiza el área del codebase impactada, ejecuta los tests al momento y documenta los bugs que encuentra con su contexto.

![Skill /qa-test-story en acción](/images/substack/quality-flow/03-test-story.png)

Esto último es importante. Los tests no son scripts que escribes y olvidas. Son **parte del story completion**, no un artefacto auxiliar. Viven dentro del flujo de delivery, no fuera.

### Investigar bugs sin perder el hilo

`/qa-investigate-bug` no se limita a leer el issue. Busca problemas similares en Jira (porque las cosas se repiten más de lo que querríamos admitir), consulta Grafana e incident.io para los logs y los incidentes contextuales, **busca también en Slack** los hilos donde se haya hablado del problema (escalados, workarounds que un dev aplicó hace dos sprints y no documentó, conversaciones con soporte sobre el cliente afectado), traza el path del código y produce un diagnóstico con propuestas de fix.

![Skill /qa-investigate-bug en acción](/images/substack/quality-flow/04-investigate-bug.png)

Slack es ahora una fuente obligatoria a la que acudir, igual que Grafana. Eso te permite verificar que el contexto sigue siendo correcto antes de actuar sobre él.

Os puedo asegurar que el 80% del tiempo investigando un bug se va en recopilar contexto, no en pensar. Si automatizas la recopilación, el dev puede usar su cabeza para lo que de verdad hace falta.

### Resolver bugs sin regresiones

`/qa-resolve-bug` aplica un enfoque test-first. Escribe primero el test que reproduce el bug, aplica el fix mínimo, verifica que la suite completa siga pasando, añade tests de regresión para edge cases cercanos y actualiza Jira con el resultado.

![Skill /qa-resolve-bug en acción](/images/substack/quality-flow/05-resolve-bug.png)

No es que el ciclo test-first sea una novedad. Lo que cambia es que **ahora se puede aplicar sin que el dev tenga que orquestarlo manualmente**.

### Suite de test sin efecto sandía (verde por fuera, rojo por dentro)

Generar tests nuevos está bien, pero **¿qué pasa con todos los que ya tienes en el repo?** Esos que llevan meses (o años) ahí, que pasan en verde, y que nadie sabe muy bien si están cubriendo lo que deberían cubrir.

`/qa-test-analyzer` se mete en un fichero concreto, evalúa la suite que lo cubre y te dice dónde están los puntos flojos. Edge cases que no estás tocando, paths de error sin testear, asserts demasiado laxos que pasan aunque el comportamiento esté roto, dependencias mockeadas que esconden bugs reales. Y no se queda en señalarlo. Propone mejoras concretas y, si le dejas, las escribe.

![Skill /qa-test-analyzer en acción](/images/substack/quality-flow/06-test-analyzer.png)

**Un test que pasa no es lo mismo que un test que protege**. Esto es justo lo que hace falta cuando heredas un proyecto, cuando un módulo crítico empieza a dar problemas en producción, o cuando simplemente llevas tiempo sin mirar de cerca lo que tu CI te está dando por bueno.

### Reportar bugs sin fricción

`/qa-report-bug` auto-detecta si el bug es funcional o de API. Acepta entrada en español, escribe el ticket en inglés, parsea el cURL si lo hay, **ofusca credenciales y tokens automáticamente**, busca duplicados con dos pasadas, adjunta evidencia de logs y lo deja listo en el tracker.

![Skill /qa-report-bug en acción](/images/substack/quality-flow/07-report-bug.png)

Aquí no hay magia, hay disciplina sistemática. La diferencia entre un bug bien reportado y uno mal reportado es horas de ida y vuelta entre QA y dev. Reducir esa fricción es bajar el coste de cada incidencia.

## Disclaimer

No quiero vender Quality Flow como una bala de plata. **No lo es**. No reemplaza a un buen QA, no compensa una cultura de calidad pobre, no soluciona equipos que no comunican. Lo que sí hace es bajar el coste de las cosas que ya estás haciendo, y eso, aplicado durante meses, cambia la economía del delivery.

Quality Flow no es "solo testing". Es una apuesta por entender la calidad como un flujo de delivery completo, donde cada fase comparte contexto con la siguiente y nada se pierde por el camino.

Lo iremos mejorando, os iré contando más cosas…
