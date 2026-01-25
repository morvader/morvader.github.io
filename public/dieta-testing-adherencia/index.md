# De la dieta al Testing: Por qué fallan nuestras buenas intenciones con la calidad


<!--more-->

## El paralelismo entre nutrición y calidad del software

Este artículo traza un paralelo entre nutrición y prácticas de calidad del software, argumentando que los equipos frecuentemente fallan en sus mejoras de testing debido a objetivos contradictorios y perfeccionismo.

## El argumento principal: La adherencia supera a la perfección

**"La adherencia es más importante que la perfección"** - mantener prácticas sostenibles importa más que perseguir soluciones ideales.

Así como un nutricionista debe identificar el problema raíz antes de prescribir soluciones, los equipos de desarrollo deben establecer procesos fundamentales antes de automatizar tests.

## Problemas clave identificados

### El caos antes de la automatización

Los equipos frecuentemente intentan automatización de tests sin abordar el caos subyacente en sus procesos de desarrollo. Esto crea suites de tests frágiles que consumen más esfuerzo de mantenimiento del que proporcionan valor.

**Advertencia crítica**: Automatizar procesos defectuosos solo acelera la disfunción.

### Objetivos contradictorios

Muchos equipos persiguen:
- ✅ "Queremos mejorar la calidad"
- ❌ "Pero no queremos invertir tiempo en definir criterios de aceptación"
- ❌ "No queremos que la automatización ralentice los despliegues"
- ❌ "No queremos cambiar nuestra forma de trabajar actual"

Estos objetivos son **mutuamente excluyentes**. No puedes tener calidad alta sin inversión en los procesos que la garantizan.

## Enfoque recomendado

En lugar de perseguir implementaciones perfectas de testing, los equipos deben:

### 1. Establecer criterios de aceptación claros
**Antes del desarrollo**, no después. Definir qué significa "hecho" para cada funcionalidad.

```gherkin
Feature: Login de usuario

  Scenario: Login exitoso con credenciales válidas
    Given un usuario registrado con email "user@example.com"
    When ingresa su email y contraseña correctos
    Then debería acceder al dashboard
    And ver su nombre de usuario en el header
```

### 2. Integrar checks de calidad en todo el ciclo
**Shift-left testing**: Incorporar validaciones desde el inicio, no solo al final.

- Code review con foco en testabilidad
- Tests unitarios ejecutados localmente antes del commit
- Tests de integración en el PR
- Tests E2E en staging antes de producción

### 3. Automatizar escenarios críticos primero
No intentes automatizar todo. Prioriza el **"happy path"** crítico:

1. Funcionalidades core del negocio
2. Flujos de autenticación y autorización
3. Operaciones de dinero/transacciones
4. Puntos de integración críticos

### 4. Priorizar testing a nivel de API
Antes de UI automation:

**Ventajas del API testing:**
- ✅ Más rápido (sin renderizado de UI)
- ✅ Más estable (menos cambios en contratos)
- ✅ Más fácil de mantener
- ✅ Mejor ROI del esfuerzo

```javascript
// Test de API: Más estable y rápido
test('GET /api/users/:id returns user data', async () => {
  const response = await api.get('/api/users/123');
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty('email');
});

// vs Test de UI: Más frágil y lento
test('User profile displays email', async () => {
  await page.goto('/users/123');
  await page.click('#profile-tab');  // Puede cambiar
  const email = await page.textContent('.user-email');  // Puede cambiar
  expect(email).toBeTruthy();
});
```

### 5. Fomentar responsabilidad compartida por la calidad
La calidad **no es solo responsabilidad de QA**. Todo el equipo debe:

- Desarrolladores escriben tests unitarios
- Product Owners definen criterios claros
- QA define estrategia y facilita
- DevOps mantiene infraestructura de testing

## El principio de sostenibilidad

El insight core enfatiza **consistencia sobre perfección**:

> Pequeñas prácticas de testing mantenibles que los equipos pueden sostener diariamente superan a iniciativas ambiciosas que colapsan bajo presión de entregas.

### Ejemplo práctico

❌ **Enfoque perfeccionista que falla:**
```
"Vamos a automatizar TODOS los casos de prueba"
→ 500 tests E2E
→ Tardan 4 horas en ejecutarse
→ Fallan 30% por flakiness
→ Nadie los mantiene
→ Se desactivan
```

✅ **Enfoque sostenible que funciona:**
```
"Vamos a automatizar 20 casos críticos bien"
→ 20 tests E2E en smoke suite
→ Tardan 10 minutos
→ 100% estables
→ Se ejecutan en cada deploy
→ El equipo confía en ellos
→ Se expanden gradualmente
```

## Analogía con la dieta

Así como una dieta extremadamente restrictiva falla por insostenible, una estrategia de testing excesivamente ambiciosa colapsa bajo presión de entregas reales.

**En nutrición:**
- Dieta perfecta e insostenible < Dieta buena que puedes seguir

**En testing:**
- Suite perfecta de 1000 tests que nadie mantiene < 50 tests críticos que el equipo usa diariamente

## Señales de que necesitas cambiar el enfoque

🚩 Los tests tardan más en ejecutarse que en escribir el código
🚩 Los tests fallan más por cambios en el sistema que por bugs reales
🚩 El equipo deshabilita tests en lugar de arreglarlos
🚩 "No tenemos tiempo para tests" es la frase común
🚩 La cobertura de código es alta pero la confianza es baja

## Conclusión: Empieza pequeño, mantén consistencia

La mejora sostenible en calidad del software requiere:

1. **Aceptar imperfección inicial**: No necesitas automatizar todo desde día 1
2. **Establecer fundaciones sólidas**: Procesos claros antes que herramientas complejas
3. **Crear hábitos sostenibles**: Tests que el equipo realmente ejecuta y mantiene
4. **Medir valor, no métricas vanidosas**: Confianza en desplegar > cobertura de código
5. **Iterar gradualmente**: Expandir lo que funciona, descartar lo que no

**Recuerda**: En calidad del software, como en nutrición, la adherencia es más importante que la perfección. Mejor una práctica simple que el equipo sigue religiosamente que un sistema perfecto que nadie usa.

---

*Este artículo refleja mi experiencia trabajando en quality assurance a través de múltiples equipos de desarrollo, donde he visto tanto éxitos como fracasos en la implementación de prácticas de testing.*

