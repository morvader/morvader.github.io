# Augmented Risk-Based Testing


## Introducción al Risk-Based Testing

Si llevas un tiempo en esto del testing, seguro que te suena el concepto de **Risk-Based Testing (RBT)**. Básicamente, se trata de optimizar el coste (tiempo) / impacto de las pruebas. Se consigue priorizando la ejecución de aquellos casos que cubran las funcionalidades críticas de la aplicación o con una mayor probabilidad de error. Es definitiva, cubrir antes las zonas de mayor riesgo.

La teoría es clara, pero. ¿Cómo identificamos *realmente* las zonas de mayor riesgo en el día a día?

A menudo, esa decisión se basa en la intuición ("creo que este módulo es complejo"), en el miedo ("la última vez falló esto") o, peor aún, en la inercia ("ya tenemos un plan de pruebas de regresión"). Y aquí es donde nos enfrentamos al **Efecto Pesticida**: si repites las mismas pruebas una y otra vez para encontrar los mismos defectos, tus pruebas dejan de ser efectivas.

El software evoluciona, el código cambia, y los bugs se mueven a nuevas zonas que tus planes de pruebas de regresión de siempre ya no cubren.

Para evitar esto, nuestra estrategia de pruebas no puede ser un documento estático escrito al inicio del proyecto. Tiene que ser un organismo vivo. Necesitamos **evidencias**, no intuiciones.

Hoy quiero contaros cómo estoy utilizando Agentes de IA (integrados en Rovo y Notion) para procesar el histórico de bugs, detectar "zonas calientes" que ayude a generar una estrategia de testing dinámica que evoluciona con el producto.

![Augmented Risk-Based Testing](/images/substack/augmented-rbt/augmented-rbt-1.png)

## El problema de la semántica de los bugs

Supongo que os sonará la frase:

> **"Quienes no recuerdan su pasado están condenados a repetirlo."** — George Santayana

En este caso, nuestro historial de bugs cuentan la historia de cómo y dónde falla nuestra aplicación.

El problema es que extraer valor de ahí es difícil. ¿Por qué? Porque la información de los bugs es **semántica**.

Hacer una consulta JQL o un filtro por etiquetas no basta.

- Una persona escribe: *"Error 500 al finalizar compra"*.
- Otro escribe: *"Timeout en pasarela de pagos"*.
- Un tercero reporta: *"Pantalla blanca tras introducir tarjeta"*.

Para una herramienta tradicional, son tres problemas distintos. Para un humano, y para un LLM bien entrenado, es evidente que tenemos un patrón recurrente en el módulo de *checkout*. Aquí es donde la IA marca la diferencia. No cuenta bugs, **entiende el contexto**.

## El Agente como tu nuevo Analista de QA

El objetivo no es que la IA "haga el testing", sino que nos ayude a optimizar nuestra estrategia de testing.

Para ello, he configurado un prompt para que Rovo (IA de Jira) actúe con un rol muy específico: un **Senior QA Engineer** experto en análisis de incidentes.

Lo que busco con esto son cuatro cosas muy concretas:

1. **Objetividad:** Decisiones basadas en datos
2. **Detección de Patrones:** Encontrar zonas de alta densidad de fallos que se nos pasan por alto.
3. **Risk-Based Testing Dinámico:** Que el plan de pruebas de la semana que viene se base en los dolores reales de los últimos meses.
4. **Generación edge cases**: Ayuda en la detección de casos de prueba especiales que no estamos teniendo en cuenta

## El Prompt - Bajar a tierra el histórico de bugs

Para que esto funcione, necesitamos ser muy precisos con lo que pedimos. No queremos un resumen, buscamos un análisis detallado que termine en acciones concretas testing.

Estas son las instrucciones que marcan el comportamiento del agente y que podéis adaptar a vuestro contexto. Fijaos en cómo estructura la salida para ir del análisis general a los Test Cases concretos.

Una vez cargado, podréis hacer preguntas del estilo:

- "Analiza los bugs más representativos del proyecto XXX del último mes"
- "Qué casos de pruebas me recomiendas para reducir los bugs en producción del proyecto"
- "Dime cuáles son las funcionalidades con más fallos del último mes"
- O simplemente: "Analiza el proyecto X"

```markdown
## Role
Act as a Senior QA Engineer with 10+ years of experience specializing in incident
analysis and test case generation. Leverage Shift-testing, Agile Testing and a
DevOps approach to focus on early bug detection and edge case analysis for wildfire
detection software

📖 Overview
Create a project-by-project report that highlights where the most important
production bugs are concentrated and proposes test recommendations to catch them
earlier.

🔎 Inputs
- Use the Bugs database as the source of truth
- Focus only on bugs detected in production
- Treat importance as highest priority and highest frequency.

📊 Analysis to produce
Analyze the production bugs database and generate a comprehensive report that includes:

1. OVERALL BUG HEAT MAP
Analyze all bugs considering:
- Description: Identify common patterns, affected functional areas, and failure types
- Project: Group by system/module to identify critical hotspots
- Priority: Weight the criticality of each area

Generate a heat map showing:
- Areas with highest concentration of critical bugs
- Most problematic projects/modules
- Recurring failure types (UI, backend, integration, etc.)
- Trends by severity and frequency

Present the heat map in table or descriptive visual format, highlighting the 3-5
most critical points. Use colors and visual indicators, like traffic lights.

---

2. PROJECT-SPECIFIC ANALYSIS

For each project identified in the database, provide a separate analysis including:

Project: [PROJECT_NAME]

Bug Profile
- Total number of bugs and distribution by priority
- Most common failure types in this project
- Specific patterns or recurring issues
- Critical areas/components with highest bug concentration

Root Cause Analysis
- Identify potential systemic issues (architecture, technology, team practices)
- Common denominators across bugs in this project
- Areas with technical debt indicators

---

3. PROJECT-SPECIFIC TESTING RECOMMENDATIONS

For each project, provide 5 to 8 tailored recommendations:

Project: [PROJECT_NAME]

A) Priority Test Cases
- Specific test scenarios for this project's critical areas
- Focus on flows that fail most often in THIS project
- Test cases addressing recurring bugs unique to this project

B) Edge Cases and Boundary Conditions
- Edge cases specific to this project's domain/functionality
- Boundary conditions identified in this project's bugs
- Project-specific data scenarios or volume considerations

C) Recommended Testing Strategies
- Testing types to prioritize for THIS project (functional, integration, E2E, regression)
- Exploratory testing focus areas for this project
- Non-functional testing specific to this project's characteristics
- Shift-left strategies tailored to this project's development workflow

D) Automation Opportunities
- Automation candidates based on THIS project's bug frequency and criticality
- Regression suite prioritization for this project
- Recommended smoke/sanity tests specific to this project
- Tool suggestions appropriate for this project's tech stack

---

4. CONSOLIDATED ACTION PLAN

Organizational Level (Cross-Project)
- Patterns that affect multiple projects
- Systemic improvements needed across the organization
- Shared testing infrastructure or practices to implement

Project-Specific Priorities
For each project, list in priority order:

1. Immediate actions (quick wins specific to this project)
2. Medium-term initiatives (project-specific improvements)
3. Long-term improvements (architectural or strategic changes)
```

## Beneficios

Al ejecutar este prompt, el resultado no es un simple reporte. Es una hoja de ruta.

La IA procesa la carga semántica de los errores y te dice: *"Oye, el 40% de tus errores críticos son de integración en este endpoint específico cuando hay mucha carga"*.

Con esa información, evitamos el efecto pesticida porque **actualizamos el objetivo**.

- **Optimizamos el testing:** Dejamos de invertir tiempo en zonas estables y apuntamos a las zonas calientes.
- **Descubrimos Edge Cases:** La IA es excelente uniendo puntos inconexos para sugerir casos límite que un humano podría pasar por alto.
- **Reducimos bugs en producción:** Porque estamos probando lo que estadísticamente tiene más probabilidades de fallar.

Al final, se trata de utilizar la IA para lo que realmente es buena, procesar información, en este caso semántica, y detectar patrones que nos faciliten realizar un Risk Based Testing optimizado.

