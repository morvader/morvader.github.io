---
title: "Bruno: Guía práctica para pruebas de API"
subtitle: "Facilitando la curva de entrada al API Testing con Bruno"
date: 2025-10-27T10:00:00+01:00
lastmod: 2025-10-27T10:00:00+01:00
draft: false
author: "Francisco Moreno"
authorLink: "https://twitter.com/morvader"
description: "Facilitando la curva de entrada al API Testing con Bruno"
license: ""
images: ["/images/substack/bruno-api/bruno-api-1.png"]

tags: ["Herramientas", "API Testing"]
categories: []

featuredImage: "/images/substack/bruno-api/bruno-api-1.png"
featuredImagePreview: "/images/substack/bruno-api/bruno-api-1.png"

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
  images: ["/images/substack/bruno-api/bruno-api-1.png"]
---

## Introducción

Bruno es una herramienta de código abierto para el testeo de APIs que destaca por su sencillez, rendimiento y enfoque git-friendly. A diferencia de otras soluciones, Bruno almacena las colecciones localmente como archivos de texto, facilitando enormemente la colaboración a través del control de versiones y la integración en pipelines CI.

Otra de las ventajas principales es que se puede trabajar de manera totalmente productiva desde su interfaz gráfica como manipulando directamente los ficheros de texto desde un IDE. Esta característica facilita la curva de aprendizaje de esta herramienta.

En este artículo, exploraremos las principales características de Bruno que lo hacen especialmente útil para los equipos de testing y desarrollo.

## Instalación

### Aplicación de escritorio

Bruno está disponible para Windows, macOS y Linux. Se puede descargar directamente desde:

https://www.usebruno.com/downloads

Una vez abierta, la aplicación de escritorio tiene esta pinta:

![Bruno Desktop App](/images/substack/bruno-api/bruno-api-1.png)

Es muy intuitiva lo que facilita crear o abrir colecciones. En este caso, si no quieres empezar de cero, puedes descargar este repo de ejemplo:

https://github.com/morvader/BrunoExample

### CLI (Interfaz de línea de comandos)

Para automatizar pruebas y ejecutarlas por línea de comando en local o pipelines tendrás que instalar su aplicación node.

Usando npm:

```bash
npm install -g @usebruno/cli
```

Usando Homebrew (macOS):

```bash
brew install usebruno/tap/bruno
```

Verificar la instalación:

```bash
bru --version
```

También hay disponible un plugin de VsCode que os permitirá trabajar y ejecutar peticiones directamente desde el IDE.

![Bruno VSCode Plugin](/images/substack/bruno-api/bruno-api-2.png)

## Organización de colecciones

Uno de los puntos fuertes de Bruno es cómo organiza las colecciones. Los archivos `.bru` se almacenan en tu sistema de archivos, lo que permite una estructura jerárquica natural:

```
JsonPlaceholder/
├── bruno.json              # Collection configuration
├── environments/
│   ├── Development.bru
│   └── Production.bru
├── Users/
│   ├── get-users.bru
│   ├── get-user-by-id.bru
│   └── create-user.bru
└── Posts/
    ├── get-posts.bru
    └── create-post.bru
```

### Ventajas de trabajar con ficheros de texto

Los archivos `.bru` son texto plano, lo que permite:

- **Un control de versiones natural:** Cada cambio puede ser rastreado con Git
- **Revisión del código:** Los cambios en las pruebas se revisan en pull requests
- **Colaboración sin fricciones:** El equipo trabaja como con el código fuente
- **Branching:** Desarrollo paralelo de pruebas en diferentes ramas

## Variables y entornos

### Definición de Entornos

Bruno permite gestionar múltiples entornos (Desarrollo, Staging, Producción). Los archivos de entorno se guardan en la carpeta `environments/`:

**environments/Producción.bru:**

```
vars {
  baseUrl: https://jsonplaceholder.typicode.com
  apiTimeout: 5000
}
```

**environments/Development.bru:**

```
vars {
  baseUrl: http://localhost:3000
  apiTimeout: 10000
}
```

### Uso de variables

Las variables se referencian con llaves dobles en las peticiones:

```
get {
  url: {{baseUrl}}/users/userId
  body: none
  auth: none
}

headers {
  Authorization: Bearer {{apiKey}}
  Content-Type: application/json
}
```

## Añadiendo Tests de API

Bruno ofrece dos formas de definir validaciones: aserciones declarativas y tests JavaScript.

### Aserciones declarativas

La forma más sencilla de validar respuestas sin escribir código:

```
assert {
  res.status: eq 200
  res.body: isArray
  res.body.length: gt 0
  res.body[0].email: contains @
  res.responseTime: lt 2000
}
```

**Operadores disponibles:**

- `eq`: igual a
- `neq`: no igual a
- `gt`: mayor que
- `gte`: mayor o igual que
- `lt`: menor que
- `lte`: menor o igual que
- `contains`: contiene
- `notContains`: no contiene
- `isArray`: es una matriz
- `isObject`: es un objeto
- `isString`: es una cadena
- `isNumber`: es un número
- `isBoolean`: es un boolean
- `isNull`: es nulo

### Código JavaScript

Para validaciones más complejas, Bruno admite pruebas con Chai:

```javascript
tests {
  test("should return valid users", function () {
    expect(res.getStatus()).to.equal(200);
    expect(res.getBody()).to.be.an('array');
    expect(res.getBody().length).to.be.greaterThan(0);
  });

  test("each user should have required fields", function () {
    const users = res.getBody();
    users.forEach(user => {
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
      expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  test("response time should be acceptable", function () {
    expect(res.getResponseTime()).to.be.lessThan(2000);
  });
}
```

### Ejemplo de solicitud completa con pruebas

```
meta {
  name: Create User
  type: http
  seq: 2
}

post {
  url: baseUrl/users
  body: json
  auth: none
}

body:json {
  {
    "name": "Test User",
    "username": "testuser",
    "email": "test@example.com"
  }
}

assert {
  res.status: eq 201
  [res.body.name]: eq Test User
}

tests {
  test("should create user successfully", function () {
    expect(res.getStatus()).to.equal(201);
    const body = res.getBody();
    expect(body).to.have.property('id');
    expect(body.name).to.equal('Test User');
  });

  test("should save user ID for next requests", function () {
    const userId = res.getBody().id;
    bru.setVar("createdUserId", userId);
    expect(userId).to.be.a('number');
  });
}
```

## Ejecución en consola

Una de las características más potentes de Bruno es su CLI, fundamental para la automatización y CI/CD.

### Ejecutar una petición individual

```bash
bru run get-users.bru --env Production
```

### Ejecutar toda la colección

Desde el directorio raíz de la colección:

```bash
bru run . --env Production
```

**Ejemplo de salida:**

```
Running Collection: JsonPlaceholder

✓ get-users (234ms)
  ✓ should return valid users
  ✓ each user should have required fields
  ✓ response time should be acceptable

✓ create-user (189ms)
  ✓ should create user successfully
  ✓ should save user ID for next requests

✓ get-user-by-id (156ms)
  ✓ should return correct user

Tests: 6 passed, 6 total
Time: 1.579s
```

### Opciones útiles

```bash
# Run requests with a specific tag
bru run . --env Production --tags smoke

# Run requests with multiple tags
bru run . --env Production --tags "smoke,critical"

# Run all requests from a specific folder
bru run Users/ --env Production

# Run a specific request within a folder
bru run Users/get-users.bru --env Production

# Combine specific folder with tags
bru run Posts/ --env Production --tags regression

# Verbose mode for debugging
bru run . --env Production --verbose
```

### Generación de informes

**Informe HTML:**

```bash
bru run . --env Production --reporter-html results.html
```

**Informe JSON:**

```bash
bru run . --env Production --reporter-json results.json
```

**Informe JUnit XML (para CI/CD):**

```bash
bru run . --env Production --reporter-junit results.xml
```

## Integración CI/CD

### GitLab CI

```yaml
api-tests:
  stage: test
  image: node:18
  script:
    - npm install -g @usebruno/cli
    - cd JsonPlaceholder
    - bru run . --env Production --reporter-junit results.xml
  artifacts:
    when: always
    reports:
      junit: results.xml
```

## Ejemplo práctico

Basado en el repositorio BrunoExample:

### 1. Clonar y explorar

```bash
git clone https://github.com/morvader/BrunoExample.git
cd BrunoExample
```

### 2. Abrir con Bruno Desktop

1. Abrir Bruno
2. Haga clic en "Abrir colección"
3. Selecciona la carpeta JsonPlaceholder

### 3. Ejecutar desde CLI

```bash
cd JsonPlaceholder
bru run . --env Production --reporter-html results.html
```

### 4. Ver resultados

Abra `results.html` en su navegador para ver el informe detallado.

## Conclusiones

Bruno ofrece un enfoque moderno a las pruebas de API con claras ventajas:

- **Git-friendly:** Integración natural con el control de versiones
- **Organización flexible:** Estructura de carpetas intuitiva
- **Potentes variables:** Gestión sencilla de múltiples entornos
- **Pruebas versátiles:** Aserciones declarativas o JavaScript según sea necesario
- **CLI robusta:** Automatización sencilla en conductos CI/CD
- **Ligero y rápido:** Sin dependencias de servicios en la nube
- **De código abierto:** Control total sobre la herramienta y los datos

Ideal para equipos que buscan simplicidad, control y facilidad de integración en sus flujos de trabajo de desarrollo.

## Recursos

- Sitio oficial: https://www.usebruno.com/
- Documentación: https://docs.usebruno.com/
- Repositorio de ejemplo: https://github.com/morvader/BrunoExample
