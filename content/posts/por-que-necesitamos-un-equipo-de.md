---
title: "Por qué necesitamos un equipo de AI Platform"
subtitle: "La IA avanza demasiado rápido para gestionarla a ratos, necesitamos una plataforma común que ponga orden en los costes, la seguridad, el conocimiento y la adopción."
date: 2026-09-29T17:06:01+02:00
lastmod: 2026-09-29T17:06:01+02:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "La IA avanza demasiado rápido para gestionarla a ratos, necesitamos una plataforma común que ponga orden en los costes, la seguridad, el conocimiento y la adopción."
license: ""
images: ["/images/ai-platform/portada-ai-platform.png"]

tags: ["IA", "AI Platform", "Gobernanza", "Estrategia"]
categories: []

featuredImage: "/images/ai-platform/portada-ai-platform.png"
featuredImagePreview: "/images/ai-platform/portada-ai-platform.png"

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

Siguiendo el artículo de [Félix](https://flopezluis.substack.com/p/protoaipos?r=lp41v&utm_campaign=post&utm_medium=web) sobre todo lo que está cambiando, no solo nuestra profesión, sino también la forma de trabajar y de organizarnos dentro de las empresas, creo que cada vez tiene más sentido contar con un equipo de **AI Platform dedicado** a todo lo que rodea a la IA.

Este tsunami nos ha pillado con el pie cambiado. Todo evoluciona a una velocidad difícil de seguir y resulta prácticamente imposible mantenerse al día si se aborda como una responsabilidad secundaria.

Hasta ahora, los grandes cambios en la industria habían sido más graduales y la velocidad de adopción no era tan determinante. Ahora todos tenemos la sensación de que esto es diferente.

> La buena noticia es que ya nos hemos enfrentado antes a retos parecidos.

## El mismo problema que ya vivimos con el cloud

Si sois tan viejos como yo, esto os sonará familiar. Me recuerda mucho a cuando apareció “el cloud”. Una tecnología nueva que cambió nuestra forma de trabajar, desarrollar y entregar software.

Al principio, todo era bastante confuso. No estaba claro quién debía preparar la infraestructura, cómo garantizar su seguridad, quién se encargaría de mantenerla o quién asumiría la responsabilidad si algo fallaba.

También estaban los costes. Como ocurre ahora con la IA, el cloud prometía ahorro frente a los CPDs físicos. Pero enseguida apareció un problema que hoy volvemos a tener. La factura que nadie controlaba empezó a crecer sin límite. De ahí surgió FinOps como disciplina para gestionar y optimizar esos costes.

En definitiva, apareció como un champiñón una cantidad de trabajo brutal. Las empresas terminaron creando equipos de plataforma dedicados exclusivamente a gestionar su infraestructura en la nube.

Con la IA estamos viendo el mismo patrón, pero acelerado cien veces. **La entropía es inherente a las organizaciones.** Si a eso le sumamos esta velocidad, el resultado puede convertirse rápidamente en un problema serio. En muchos casos, ya lo es.

Las empresas que han superado la fase inicial de adopción suelen encontrarse con cuatro problemas principales:

- **Gestión de costes**
- **Modelo de gobernanza**
- **Gestión del conocimiento**
- **Desarrollo seguro**

Este trabajo no se puede hacer a ratos libres. Por eso creo que está más que justificado crear un equipo de AI Platform con vocación de servicio, capaz de poner orden y dar sentido a todo este ecosistema dentro de la organización.

![](/images/ai-platform/ai-platform-team.png)

## Nosotros ya lo estamos sufriendo

En la empresa hemos visto cómo algunas personas utilizaban el modelo Fable **casi el 80 % del tiempo**. Sin entrar en los motivos concretos, es un porcentaje difícil de justificar para determinados perfiles y tareas de ingeniería. Un buen sistema de acompañamiento y gobernanza debería ayudarnos a detectar y corregir este tipo de situaciones.

También contamos con un repositorio centralizado de plugins y utilidades. Aun así, cada equipo termina gestionando por separado sus propios repositorios de skills, plugins y hooks.

Está bien que los equipos tengan autonomía. El problema llega cuando esa autonomía dificulta compartir buenas prácticas, reutilizar soluciones y aprender del trabajo de los demás. Al final, duplicamos esfuerzos y fragmentamos el conocimiento de la empresa.

Los costes también se han disparado. Todavía no existe una gestión centralizada ni un modelo de gobernanza que establezca cuándo y cómo activar un límite de gasto. Esa información vive, en gran medida, en conversaciones aisladas o de pasillo.

Algo parecido ocurre con las skills y herramientas que utilizamos sin haber sido validadas o sin contar con las medidas de seguridad y los guardrails necesarios.

De momento no hemos tenido ningún susto importante, pero la falta de control ya empieza a notarse. Es ahí donde un equipo de AI Platform puede aportar valor de verdad.

## Misión del AI Platform Team

Un equipo de AI Platform no es un grupo de investigación ni un comité dedicado a aprobar o rechazar iniciativas. Es un equipo con vocación de servicio que gestiona un producto interno, con responsables, usuarios y un roadmap propio, como cualquier otro producto de la empresa.

![](/images/ai-platform/mision-ai-platform-team.jpeg)

Su misión es proporcionar a los equipos una forma común, segura y eficiente de adoptar la IA, sin quitarles la autonomía que necesitan para resolver sus propios problemas.

Estas serían sus funciones principales:

- **Gestión del producto**
  - *Roadmap y priorización.* Decidir qué capacidades se construyen primero y con qué criterios.
  - *Alineación transversal.* Coordinarse con Engineering, IT, Seguridad, Legal y el CTO para avanzar respetando las necesidades y responsabilidades de cada área.
- **Developer experience**
  - *Onboarding estándar.* Dar a cada nuevo desarrollador un punto de partida común, con herramientas, documentación y prácticas recomendadas.
  - *Fricción mínima.* Conseguir que el camino seguro sea también el más rápido y sencillo.
  - *Soporte técnico continuo.* Acompañar a los equipos más allá del arranque y ayudarles con los bloqueos que vayan apareciendo.
  - *Formación continua.* Enseñar a utilizar bien las herramientas disponibles, desde el prompt engineering hasta el uso de tools, skills y agentes.
- **Plataforma técnica**
  - *Desarrollo seguro mediante un harness común.* Construir y mantener una capa técnica que permita desarrollar funcionalidades de IA sin que cada equipo tenga que crear desde cero sus propios controles de seguridad, observabilidad y acceso.
  - *Enrutamiento de modelos.* Administrar un router que seleccione el modelo más adecuado según la sensibilidad de los datos, la complejidad de la tarea, el rendimiento esperado y el coste.
  - *Gestión del conocimiento.* Mantener un catálogo central de skills, plugins, hooks y prompts al que todos los equipos puedan contribuir. No basta con tener un repositorio: el contenido debe ser fácil de encontrar, estar validado y usarse de verdad.
  - *R&D y estado del arte.* Reservar tiempo para evaluar nuevos modelos, técnicas y herramientas. No se trata de adoptar cada novedad, sino de identificar cuáles pueden aportar valor real.
- **Costes y licencias**
  - *Gestión de costes.* Monitorizar el consumo por equipo, proveedor y modelo, establecer alertas, detectar usos anómalos y negociar licencias a escala de empresa.
  - *Licencias, límites de gasto y API keys.* Centralizar la emisión y el control de credenciales, con límites claros por persona, equipo o caso de uso. Así evitaremos descubrir el problema cuando llegue la factura a final de mes.
  - *Optimización del consumo.* Ayudar a los equipos a elegir el modelo y el contexto adecuados para cada tarea, sin recurrir a modelos más caros cuando una alternativa más eficiente ofrece resultados suficientes.
- **Gobernanza técnica y seguridad**
  - *Modelo de gobernanza.* Definir quién puede utilizar cada modelo, con qué datos, para qué casos de uso y con qué flujo de aprobación.
  - *Políticas de seguridad.* Establecer reglas claras para el tratamiento de datos, el acceso a herramientas y la conexión con sistemas internos antes de que una solución llegue a producción.
  - *Trazabilidad y observabilidad.* Registrar qué modelos, tools y datos intervienen en cada flujo para entender los errores, investigar incidentes y auditar decisiones cuando sea necesario.
- **Medición e impacto**
  - *Métricas de seguimiento.* Medir uso, coste, adopción, calidad y fiabilidad para tomar decisiones con datos y no solo con percepciones.
  - *Testing A/B.* Comparar las soluciones utilizadas por distintos equipos, identificar cuáles funcionan mejor y extender esas prácticas al resto de la organización.
  - *Impacto real.* Traducir el uso de la IA en resultados para el negocio. No es fácil y la forma de medirlo será diferente en cada departamento: horas ahorradas, costes evitados, menos errores en producción, mejores resultados de ventas, reducción de consultas repetitivas o procesos de contratación más eficaces.

**Un equipo de AI Platform no debería centralizar todas las decisiones ni convertirse en un cuello de botella.** Su éxito sería precisamente lo contrario: ofrecer capacidades comunes, establecer límites claros y conseguir que los equipos puedan avanzar por su cuenta de una manera segura y eficiente.

**Al final, la pregunta no es si necesitamos este equipo. La pregunta es cuánto nos va a costar seguir creciendo sin él.**

Si quieres que este artículo te haya aportado algo, valora suscribirte.
