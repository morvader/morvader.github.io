# Retomando un proyecto personal 10 años después

<!--more-->

Hace ya 10 años (2016) empecé a desarrollar una extensión de Chrome para ayudar en las sesiones de Testing Exploratorio. ¿Por qué lo hice? Pues por la misma razón que se crearon 17 frameworks de JavaScript distintos. Ninguna de las herramientas que había disponibles me convencía del todo, así que me hice la mía.

Por otra parte, también tenía el objetivo de tener un side project en el que poder aprender y seguir programando.

Vamos por partes para que entendáis por qué escribo este post ahora:

## Qué problema quería resolver

La motivación para crear esta herramienta vino de mi frustración con las opciones disponibles en ese momento. Las herramientas para registrar sesiones de Testing Exploratorio no me terminaban de convencer. El problema principal era el cambio de contexto constante.

Yo tomaba notas en una libreta durante las sesiones. Luego tenía que pasarlo todo al ordenador. Transcribir mis anotaciones. Reportar los bugs en Jira, documentar evidencias, abrir chats para resolver dudas, etc. Era un proceso tedioso que rompía la concentración y el flujo de trabajo.

Las herramientas de entonces tampoco ayudaban mucho. Requerían abrir un bloc de notas. O un Word. O un Excel. Cualquier aplicación externa que te sacaba de donde tenías puesta la atención.

Mi idea era simple: mantener las notas lo más cerca posible del lugar donde surgía el problema. Donde aparecía la duda. Donde nacía la pregunta típica durante una sesión de Testing Exploratorio.

En este caso era la web, por tanto lo más cercano era el propio navegador. De ahí construir una extensión.

## Los pilares básicos

Me centré en tres cosas:

- Sencillez
- No perder el foco
- Uso de una única herramienta

Todo integrado en el navegador. Sin salir de la aplicación que estabas probando.

![Pilares básicos de la extensión](/images/substack/chrome-extension/chrome-extension-1.png)

## El paréntesis de 10 años

Durante muchos años tuve el proyecto abandonado. Me faltaba tiempo. Y sobre todo conocimientos adecuados de HTML y JavaScript. No es mi especialidad. Siempre quise añadir funcionalidades más avanzadas pero no sabía cómo implementarlas.

Una de las que más me rondaba la cabeza era poder recortar (crop) las capturas de pantalla. Y luego anotarlas con flechas o cuadros que ayudaran a explicar mejor los problemas.

Sin embargo, la comunidad nunca dejó de usarla.

A pesar de la falta de actualizaciones, la extensión siguió creciendo orgánicamente hasta superar los 7.000 usuarios activos. Me sorprendía ver cómo aparecía recomendada en artículos de referencia año tras año:

- **Software Testing Help** la ha incluido recientemente en su ranking de las "17 Mejores Herramientas de Testing Exploratorio para 2026", poniéndola al nivel de gigantes comerciales.

- En **Software Testing Magazine**, la destacaron por su capacidad de generar reportes limpios sin complicaciones.

- Incluso plataformas como **BrowserStack** la listan como una de las esenciales para QA.

Leer que la gente valoraba esa simplicidad frente a herramientas más pesadas (como la de Microsoft o plugins complejos de Jira) fue lo que me mantuvo con la espinita clavada de: "Tengo que volver a esto".

## La era de la IA (chupito)

En mi caso particular fue Claude Code el que me ayudó a retomar estas ideas y roadmap.

Lo que antes me hubiera llevado meses de aprendizaje y prueba-error ahora lo pude desarrollar en días. De repente esa funcionalidad que llevaba años queriendo implementar se volvió posible. Pude trabajar iterativamente con Claude hasta conseguir lo que quería.

## La nueva versión

Ahora mismo la extensión tiene:

- Recorte de zonas específicas en las capturas de pantalla
- Anotaciones sobre las imágenes con flechas y cuadros
- Mejoras en la estética general
- Informes más claros y útiles

![Nueva versión de la extensión](/images/substack/chrome-extension/chrome-extension-2.png)

Todo manteniendo la filosofía original de sencillez.

Los informes también han mejorado bastante a nivel estético y permiten exportar todo fácilmente.

![Informes mejorados](/images/substack/chrome-extension/chrome-extension-3.png)

## Conclusiones

¿Tiene sentido revivir esto ahora? Pues no sé si el número de usuarios subirá o bajará, pero vamos, a día de hoy mi objetivo inicial se mantiene intacto: tener un lugar reservado en el que poder seguir aprendiendo y experimentando sin presiones.

De todas formas, si usas la herramienta y tienes sugerencias son bienvenidas. Si encuentras bugs avísame. Si se te ocurre alguna funcionalidad que haría tu trabajo más fácil me encantaría escucharla.

Puedes encontrar la extensión aquí: **[Exploratory Testing Extension](https://chromewebstore.google.com/detail/exploratory-testing-exten/khigmghadjljgjpamimgjjmpmlbgmekj)**

El código sigue siendo open source. La extensión sigue siendo gratis. Y la intención sigue siendo la misma de 2016: aportar algo útil a nuestra comunidad.

Gracias por leer. Y gracias por cualquier feedback que quieras compartir.

---

*¿Usas herramientas de Testing Exploratorio en tu día a día? ¿Qué funcionalidades te gustaría ver en una extensión de navegador? Déjame un comentario.*

