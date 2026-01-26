# My two cents: El futuro del QA en la era de la IA


Hace unas semanas escribí en la Bonilista sobre el aporte de valor del testing en IT. El mensaje que quise transmitir fue claro: el testing no va de "hacer pruebas", sino de su impacto en el negocio.

Esa era la idea principal de mi artículo, pero David me retó a añadir cómo veo el futuro del QA con la evolución de las IAs. Entonces dejé algunas ideas básicas que ahora quiero ampliar.

El reciente informe de Manfred ha confirmado de la forma más cruda posible la realidad actual: QA está en la última posición de roles más demandados.

![Informe Manfred - QA roles](/images/substack/futuro-qa-ia/futuro-qa-ia-1.png)

No es una coincidencia. El mercado nos está diciendo algo.

## La IA está democratizando el testing

Las herramientas de IA han cambiado las reglas del juego. Generar criterios de aceptación, escribir tests automatizados o crear planes de prueba ya no requiere años de experiencia. Un developer utilizando cualquier LLM puede hacerlo en minutos.

Y seamos honestos: lo hacen bien.

Quizás no perfecto. Quizás mejorable. Pero para muchos contextos y equipos es *good enough*. El principal obstáculo para adoptar testing siempre fue el "saber" y el "poder". Con la IA, este gap se ha reducido drásticamente.

![IA democratizando el testing](/images/substack/futuro-qa-ia/futuro-qa-ia-2.png)

Incorporar buenas prácticas de testing es ahora más sencillo. El proceso se acelera. Un equipo sin QA puede alcanzar un nivel aceptable simplemente usando prácticas y herramientas adecuadas.

En este nuevo contexto surge la pregunta incómoda: ¿qué aporta un QA "puro"? ¿Dónde está el valor real? ¿Está justificado el coste?

## Las justificaciones tradicionales ya no se sostienen

Durante años hemos defendido el rol de QA con argumentos que hoy suenan huecos:

- **¿Mejores skills para detectar errores?** Una IA entrenada puede analizar código, detectar patrones de bugs y revisar logs de producción con una precisión superior a la humana en muchos casos.

- **¿Mayor foco en testing que un developer?** Cuando un developer puede generar suites completas con un prompt, el "foco" deja de ser una ventaja competitiva.

- **¿Mejor entendimiento del sistema?** Siempre discutible. Quien escribe el código suele entender mejor el sistema. En todo caso, ambos roles se complementan.

- **¿Mejores skills para automatización?** Las IAs generan código de tests legible y mantenible.

- **¿Generación de criterios de aceptación?** De nuevo, la IA lo hace en segundos.

Resumiendo, todo aquello que justificaba contratar a un QA tradicional ahora puede hacerlo cualquiera con acceso a herramientas de IA.

## El problema de la velocidad sin control

Aunque la IA facilita el testing básico, también crea un problema nuevo.

Los productos ofrecen cada vez más capacidades de IA y los sistemas se vuelven más complejos. A la vez, el uso generalizado de IAs para desarrollo no garantiza resultados perfectos. Todo lo contrario.

Seguirá habiendo bugs. Incluso más. La degradación de los sistemas por "vibe coding" incontrolado será un problema creciente. Si generas funcionalidades a toda velocidad sin entender completamente lo que construyes, el caos es inevitable.

Como QA, ya no tiene sentido dedicarse solo a pruebas manuales, escribir planes de pruebas o generar scripts automatizados. Con la velocidad actual, no podrás seguir el ritmo y el cuello de botella será inmanejable.

En resumen: la IA hace el testing básico más accesible, pero al mismo tiempo genera sistemas tan complejos y rápidos que el testing tradicional se vuelve inviable.

## Dos caminos posibles

Veo dos evoluciones claras para el rol de QA. Ambas válidas. Ambas necesarias.

**Especialización en testing de sistemas de IA:** LLMs, RAG, agentes autónomos. Validación de outputs no deterministas, estrategias de fuzzy testing, ciclos de MLOps y validación avanzada de datos. Es técnicamente fascinante, más nicho y con menor demanda absoluta, aunque mejor remunerado.

**Orquestación de calidad orientada a plataforma:** contribuir a la calidad del delivery de manera holística. Mejorar la Developer Experience y construir herramientas que optimicen el delivery. Este camino tiene más recorrido y exige una transformación profunda del rol.

## De ejecutor a orquestador estratégico

La IA no reemplaza a los QAs. Les quita tareas repetitivas para que se enfoquen en lo que importa: interpretar hallazgos, analizar relevancia y determinar el impacto real en la experiencia de usuario y en el negocio.

El QA del futuro será un orquestador estratégico de calidad: traduce datos generados por la IA en decisiones que afectan al producto. El conocimiento técnico profundo y el manejo de IAs para testing será fundamental. No para ejecutar pruebas, sino para construir sistemas.

![QA como orquestador estratégico](/images/substack/futuro-qa-ia/futuro-qa-ia-3.png)

Si la IA puede generar tests a partir de criterios de aceptación, ¿por qué no automatizarlo en el pipeline? Si tienes años de histórico de tests y bugs, ¿por qué no entrenar un RAG que genere criterios y pruebas adaptadas a tu contexto?

El valor no está en "hacer pruebas", sino en construir sistemas que permitan gestionar la calidad de forma automática e inteligente.

Imagina herramientas que detecten "zonas calientes" de bugs analizando históricos y contexto del código. Prevención antes de que el bug ocurra. Triajes automáticos que no solo detecten el error, sino que analicen la causa raíz y sugieran soluciones.

Visión amplia de todos los componentes. Reporting inteligente. Automatismos para prevención, detección y resolución. Agentes especializados que revisen pull requests con reglas de calidad.

Todo esto requiere un QA que piense como ingeniería de plataforma: que entienda arquitectura, programe de verdad, comprenda el sistema end-to-end y participe desde la especificación, no solo en la verificación final.

## Nuevas capacidades que el mercado necesita

Como expliqué en la Bonilista, esto no va de herramientas, va de impacto en el negocio y de mejorar el delivery. A día de hoy, el uso de IAs por parte de QA ya no es una opción.

En mi opinión, el futuro necesita QAs que dominen:

**Testing predictivo basado en riesgo.** Evaluar datos históricos de defectos y analítica de uso para priorizar áreas de alto riesgo. No pruebas todo. Pruebas lo que importa.

**Diseño de tests autorreparables.** Sistemas que se ajustan automáticamente ante cambios de interfaz o lógica, eliminando el mantenimiento manual que consume cerca del 40% del tiempo de un QA tradicional.

**Generación inteligente de casos de prueba.** La IA puede reducir el tiempo de diseño hasta un 50%, pero alguien debe validar que esos casos cubren los escenarios críticos de negocio.

**Análisis de calidad de la UX.** Consistencia visual, accesibilidad y experiencia entre dispositivos. La IA detecta inconsistencias, el QA interpreta su impacto real.

**Entrenamiento de modelos de IA para testing.** Seleccionar conjuntos de datos y escenarios para entrenar sistemas de IA. Requiere experticia de dominio.

**Prompt engineering aplicado a testing.** Comunicar intenciones de testing claramente a sistemas de IA. Será tan básico como saber escribir un caso de prueba.

**Adaptabilidad continua.** Surgen nuevas herramientas constantemente. La capacidad de aprender rápido vale más que cualquier stack concreto.

El patrón común: dejas de ser quien "hace las pruebas" para convertirte en quien construye los sistemas, herramientas y cultura que hacen que las pruebas sucedan de forma natural.

## El cambio ya está aquí

El mercado ha hablado. Que QA esté en la última posición de demanda no es casualidad, es una señal de regresión del rol tradicional.

Pero la calidad no va a desaparecer. Al contrario. En un mundo donde la velocidad sin control genera caos, la calidad gana valor.

El testing del futuro será continuo, inteligente e invisible. Los agentes de IA se integrarán en cada etapa del desarrollo, operando en segundo plano para asegurar rendimiento, estabilidad y usabilidad.

Mi lema evolucionó de "No vendemos pruebas, mejoramos el delivery" a algo más ambicioso: **"No vendemos pruebas. Hacemos sistemas que se mejoran solos"**.

Mientras todo el mundo usa IA para ir más rápido, úsala para ir mejor. En un mundo donde la velocidad sin control genera caos, "ir mejor" es la verdadera ventaja competitiva.

El rol de QA tiene futuro. Pero no será el QA que conocemos hoy.

