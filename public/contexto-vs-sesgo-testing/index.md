# Contexto vs. Sesgo: Por qué tu opinión personal no debería guiar tu testing


<!--more-->

## El dilema del tester: ¿Bug o característica?

Imagina que estás probando un e-commerce y encuentras que los productos de ropa solo tienen opciones de corte "Mujer" y "Hombre". La pregunta central es: ¿esto constituye un bug reportable?

La respuesta no está en tus opiniones personales, sino en el **contexto del negocio**.

## El contexto determina la clasificación

El mismo elemento de UI representa diferentes niveles de riesgo dependiendo del contexto:

- **En Amazon**: Probablemente es una decisión pragmática de categorización. El riesgo es bajo.
- **En una marca explícitamente comprometida con la inclusividad LGBTQ+**: Podría ser un riesgo reputacional crítico que contradice los valores declarados de la marca.

### "Las prendas de vestir no tienen género"

Esta afirmación puede ser cierta desde una perspectiva social, pero la apropiación de la clasificación varía según el **posicionamiento del negocio**.

## Análisis basado en riesgos, no en opiniones

En lugar de reportar issues basados en incomodidad personal, los testers deben evaluar:

### 1. Riesgos reputacionales
- ¿Qué audiencias específicas podrían reaccionar negativamente?
- ¿Cuál es la alineación con los valores declarados de la marca?
- ¿Existen competidores que lo hagan mejor?

### 2. Impacto en tasas de conversión
- ¿Los usuarios abandonan el proceso de compra por esto?
- ¿Hay datos o estudios que respalden el impacto?

### 3. Alineación con la imagen de marca
- ¿La empresa ha hecho declaraciones públicas sobre inclusividad?
- ¿Existen campañas de marketing que contradigan esta implementación?

## Recomendaciones profesionales

### 1. Pregúntate lo importante
¿El issue afecta genuinamente los objetivos del negocio o solo causa incomodidad personal?

### 2. Investiga el contexto
- Audiencia objetivo del producto
- Posicionamiento de la marca
- Valores corporativos declarados
- Competencia y estándares de la industria

### 3. Reporta como "observación de riesgo"
En lugar de reportar como bug definitivo:

```
Severidad: Potencial - Riesgo Reputacional
Descripción: La categorización de ropa por "Hombre/Mujer"
podría generar fricción con audiencias que valoran la
inclusividad de género.

Contexto: La marca ha declarado públicamente su compromiso
con la diversidad en [campaña X].

Recomendación: Evaluar con el equipo de producto y marketing
si esta categorización alinea con los valores de marca.
```

### 4. Genera diálogo colaborativo
No impongas tu perspectiva. Presenta el issue como una conversación sobre impactos potenciales que los decision-makers deben evaluar.

### 5. Documenta el razonamiento transparentemente
Explica claramente:
- Por qué lo consideras relevante
- Qué riesgos específicos identificas
- Qué evidencia o contexto respalda tu observación

### 6. Abraza perspectivas diversas en testing
Un equipo de testing diverso reduce el sesgo individual. Diferentes perspectivas ayudan a identificar riesgos que una sola persona podría pasar por alto.

## Conclusión: El profesionalismo requiere separación

La efectividad en testing requiere **separar convicciones personales de evaluación profesional**, siempre alineando los esfuerzos de calidad con los objetivos organizacionales del negocio.

### Preguntas clave antes de reportar

1. ¿Esto afecta a los usuarios objetivo del negocio?
2. ¿Tengo datos o contexto que respalden el impacto?
3. ¿Estoy confundiendo mi opinión personal con un problema real?
4. ¿He considerado el posicionamiento y valores de la empresa?

**Recuerda**: Un buen tester no impone sus valores personales, sino que ayuda al negocio a identificar riesgos reales basados en el contexto específico de la organización.

