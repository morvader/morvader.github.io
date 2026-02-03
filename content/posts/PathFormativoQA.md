---
title: "Path formativo para el QA del futuro"
subtitle: "Práctica deliberada como hilo conductor"
date: 2025-11-23T10:00:00+01:00
lastmod: 2025-11-23T10:00:00+01:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Práctica deliberada como hilo conductor"
license: ""
images: ["/images/substack/path-formativo/path-formativo-1.png"]

tags: ["Carrera", "IA"]
categories: []

featuredImage: "/images/substack/path-formativo/path-formativo-1.png"
featuredImagePreview: "/images/substack/path-formativo/path-formativo-1.png"

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
  images: ["/images/substack/path-formativo/path-formativo-1.png"]
---

Hace años diseñé un [itinerario formativo](https://www.testingfromthetrenches.com/posts/pdp-1/) por niveles para el equipo de QA de Sngular. Era un path progresivo que llevaba desde el nivel inicial hasta la especialización avanzada.

Creo que está bien estructurado y sigue siendo muy útil. No obstante, el contexto ha cambiado radicalmente y no le vendría mal una actualización.

Cualquier itinerario debería seguir manteniendo una base sólida de testing. Porque no se trata de abandonar los fundamentos, sino de construir sobre ellos de forma diferente.

Tener buenos conocimientos de testing seguirá siendo esencial para establecer estrategias efectivas y desarrollar una mentalidad crítica y proactiva. Conocer las bases de agile testing para integrarse de manera efectiva en equipos con entregas rápidas no es opcional. Es la base sobre la que construimos todo lo demás.

La diferencia está en hacia dónde avanzamos desde ahí.

A continuación, te presento cuales serían ideas para un path formativo de QA, basado en la práctica deliberada en el foco en el impacto en el negocio del testing.

![Path formativo para QA](/images/substack/path-formativo/path-formativo-1.png)

## Nivel 1: Fundamentos enfocados al impacto

### Base de testing orientada a valor

Ya no basta con conocer técnicas de caja blanca y caja negra. Necesitas entenderlas en el contexto de impacto en el negocio. Cuando aplicas particiones de equivalencia o análisis de casos límite, no lo hagas porque es una técnica, sino porque minimiza riesgos en áreas críticas del sistema.

### Métricas desde el día uno

Aprende a medir lo que importa. No cobertura de código arbitraria. Métricas de delivery: lead time, deployment frequency, mean time to recovery. Entiende cómo las pruebas impactan estos números.

### Agile testing con foco en delivery

Shift-left testing no es solo una idea teórica. Es una práctica diaria (un hábito). Participa en el refinamiento. Escribe criterios de aceptación. Detecta problemas en especificaciones antes de que se escriba una línea de código. El coste de prevenir es infinitamente menor que el coste de corregir.

### Testing exploratorio orientado a riesgo

No explores sin rumbo. No intentes probarlo absolutamente todo. Evalúa heurísticamente dónde están los riesgos del negocio. Un bug en el checkout vale más que diez bugs en la página de ayuda. Prioriza tu tiempo donde el impacto es mayor.

### Programación real, no scripting

No basta con saber hacer scripts de Playwright. Necesitas entender arquitectura de software, patrones de diseño, principios SOLID, acoplamiento, mantenibilidad, etc.

### Primeras pruebas automatizadas con IA

Usa ChatGPT, Copilot o Gemini para generar casos de prueba desde criterios de aceptación. Aprende qué prompts funcionan. Entiende cuándo el output es útil y cuándo no. Esta es tu nueva herramienta base.

## Nivel 2: Automatización inteligente y construcción de herramientas

### Patrones de diseño y principios SOLID

Page Object Model o Screenplay no son marcos teóricos. Son formas de hacer tu código de tests mantenible cuando el sistema crece. Cuando tienes 100 tests automatizados, la diferencia entre código bien estructurado y mal estructurado es brutal.

### Frameworks modernos de automatización

Playwright, Cypress, TestingLibrary, etc. Pero no te quedes en aprender la sintaxis. Entiende el caso de uso donde mejor se amolda cada tecnología. Elige herramientas con criterio, no por moda.

### Mocking y gestión de dependencias

En arquitecturas de microservicios, no puedes esperar a que todos los servicios estén disponibles. Aprende a mockear efectivamente. Entiende la diferencia entre interceptar llamadas o utilizar un mock server completo.

### Primeras herramientas propias

Construye un script que genere automáticamente tests de API desde una especificación OpenAPI. Crea un sistema que ejecute pruebas selectivamente según los archivos modificados en un PR. Pequeñas herramientas que ahorran tiempo al equipo.

### Testing de rendimiento con impacto

JMeter, Gatling, K6 son herramientas. Pero el valor está en saber qué probar. Identifica los endpoints críticos para el negocio. Establece SLAs razonables. Detecta degradación antes de que afecte a usuarios.

### IA para generación de datos de prueba

Usa LLMs para generar datasets realistas. Crea prompts que generen casos edge que nunca habrías pensado manualmente. Automatiza la creación de escenarios de prueba complejos.

### Métricas de automatización

Mide el ROI de la automatización. Tiempo ahorrado en regresión. Bugs detectados antes de producción. Velocidad de feedback en el pipeline. Estas métricas justifican tu trabajo.

## Nivel 3: Arquitectura, sistemas y plataforma de calidad

### Testing de microservicios y contract testing

Los sistemas distribuidos requieren estrategias diferentes. Consumer-driven contract testing previene que cambios en un servicio rompan consumidores. Esto no es teoría. Es la diferencia entre desplegar con confianza o ir a ciegas.

### CI/CD y pipelines inteligentes

No ejecutes todas las pruebas en cada commit. Construye sistemas que ejecuten pruebas selectivamente según el contexto. Integra análisis estático. Automatiza security scanning. El pipeline es tu primera línea de defensa.

### Observabilidad y testing en producción

Los bugs van a llegar a producción. Asúmelo. Construye sistemas de monitorización que detecten anomalías. Implementa feature flags para hacer despliegues controlados.

### Construcción de plataformas de testing

Crea infraestructura que otros equipos puedan usar. Entornos de testing bajo demanda con Docker. Sistemas de gestión de datos de prueba. Tu valor está en multiplicar la capacidad de otros y ser "enabler" de la calidad en los equipos.

### IA para análisis de fallos y triaje automático

Construye sistemas que analicen logs de tests fallidos y sugieran causa raíz. Implementa clasificación automática de bugs por severidad usando histórico. Crea agentes que comenten en PRs con análisis de riesgo de calidad.

### Testing predictivo basado en datos

Analiza históricos de bugs. Identifica zonas calientes del código. Predice dónde es más probable que aparezcan problemas en nuevos cambios. Prioriza pruebas en función de riesgo real, no de cobertura arbitraria.

## Nivel 4: Especialización estratégica

Aquí se bifurcan los caminos según tu elección.

### Path A: Quality Engineering de sistemas de IA

**Testing de LLMs y sistemas RAG**

Validación de outputs no deterministas. Estrategias de fuzzy testing. Detección de alucinaciones. Evaluación de calidad de respuestas usando LLMs como jueces validadores. Métricas específicas para sistemas de IA.

**MLOps y testing de pipelines de datos**

Validación de datasets de entrenamiento. Detección de data drift. Testing de modelos en diferentes distribuciones de datos. Monitorización de performance de modelos en producción.

**Evaluación de sesgos**

Detección de sesgos en decisiones del sistema. Validación de cumplimiento regulatorio en sistemas de IA. Comprobaciones de seguridad de los LLMs. Este es un campo emergente con mucho futuro.

**Métricas de sistemas de IA**

Aprende métricas específicas del dominio. Latencia de respuesta. Coste por query. Rate de alucinaciones. Satisfacción de usuario con outputs.

### Path B: Quality Engineering de plataforma y delivery

**Developer Experience y enablement**

Construye herramientas que hagan fácil prevenir errores. Generadores de tests desde criterios de aceptación. Sistemas de validación pre-commit. Dashboards de calidad en tiempo real.

**Automatización de calidad end-to-end**

Desde detección de cambios hasta deployment en producción. Análisis automático de impacto. Ejecución selectiva de pruebas. Triaje automático de fallos. Reporting inteligente a stakeholders.

**RAG systems para conocimiento de testing**

Construye sistemas que aprendan del histórico de bugs y tests de tu organización. Genera sugerencias personalizadas de casos de prueba. Identifica patrones de fallos recurrentes.

**Agentes especializados en calidad**

Agentes que revisen PRs con foco en aspectos de calidad. Que validen que criterios de aceptación están completos. Que sugieran escenarios de prueba no contemplados. Que analicen métricas de calidad del código.

**Métricas de impacto organizacional**

No solo métricas técnicas. Tiempo ahorrado a developers. Reducción de tiempo de review. Incremento en deployment frequency. Reducción de incidentes en producción. Tu valor medido en impacto de negocio.

## El consejo más importante

No intentes aprenderlo todo. Es imposible y te vas a frustrar.

Elige un camino (especialista en IA testing o generalista de plataforma de calidad) y construye profundidad ahí. Luego expande.

Lo más importante no es acumular conocimientos. Es demostrar impacto. Construye algo que mejore la calidad de tu equipo de forma medible. Ese proyecto real te enseñará más que cualquier curso.

Y sobre todo: empieza ya. El mercado se está moviendo rápido. Los QAs que se adapten ahora tendrán ventaja enorme sobre los que esperen.
