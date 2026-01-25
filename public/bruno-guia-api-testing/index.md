# Bruno: Guía práctica para pruebas de API


<!--more-->

## Introducción

Bruno es una herramienta open-source para API testing que enfatiza simplicidad, rendimiento y workflows git-friendly. A diferencia de soluciones competidoras, almacena las colecciones localmente como archivos de texto, habilitando colaboración sin fricciones a través de control de versiones e integración con pipelines de CI.

Una ventaja clave es la flexibilidad de trabajar productivamente tanto a través de la interfaz gráfica como mediante manipulación directa de archivos de texto en un IDE, lo que ayuda a reducir la curva de aprendizaje para nuevos usuarios.

## Instalación

### Aplicación de escritorio

Bruno está disponible para Windows, macOS y Linux vía [https://www.usebruno.com/downloads](https://www.usebruno.com/downloads). La interfaz de escritorio es intuitiva para crear o abrir colecciones. Para principiantes, un repositorio de ejemplo está disponible en [https://github.com/morvader/BrunoExample](https://github.com/morvader/BrunoExample).

### Interfaz de línea de comandos

Para automatizar tests y ejecutarlos localmente o en pipelines de CI/CD, instala el CLI basado en Node:

**npm:**
```bash
npm install -g @usebruno/cli
```

**Homebrew (macOS):**
```bash
brew install usebruno/tap/bruno
```

**Verificar instalación:**
```bash
bru --version
```

### Extensión de VS Code

También existe una extensión de VS Code que permite trabajar con y ejecutar requests directamente dentro del IDE.

## Organización de colecciones

Las colecciones usan archivos `.bru` almacenados en el sistema de archivos, creando una estructura jerárquica natural. Los archivos basados en texto habilitan:

- **Integración nativa con control de versiones**
- **Code review vía pull requests**
- **Colaboración sin fricciones en equipo**
- **Desarrollo en paralelo** a través de branches

### Estructura de ejemplo

```
mi-api-tests/
├── environments/
│   ├── development.bru
│   ├── staging.bru
│   └── production.bru
├── users/
│   ├── create-user.bru
│   ├── get-user.bru
│   └── delete-user.bru
└── products/
    ├── list-products.bru
    └── get-product.bru
```

## Variables y entornos

Bruno soporta múltiples entornos (Development, Staging, Production) con archivos de configuración almacenados en `environments/`. Las variables se referencian usando llaves dobles en requests (ej: `{{baseUrl}}`).

### Ejemplo de configuración de entorno

```javascript
vars {
  baseUrl: https://api.staging.example.com
  apiKey: sk_test_123456
  timeout: 5000
}
```

### Uso en requests

```
GET {{baseUrl}}/users/{{userId}}
headers {
  Authorization: Bearer {{apiKey}}
}
```

## API Testing

### Assertions declarativas

Bruno ofrece validación sencilla sin código:

```javascript
assert {
  res.status: eq 200
  res.body: isArray
  res.body[0].name: isString
  res.responseTime: lt 2000
}
```

**Operadores soportados:**
- Checks de igualdad: `eq`, `neq`
- Comparaciones: `gt`, `gte`, `lt`, `lte`
- Contención: `contains`, `notContains`
- Validación de tipo: `isString`, `isNumber`, `isBoolean`, `isArray`, `isObject`

### Tests JavaScript

Para validaciones complejas, Bruno soporta testing basado en Chai:

```javascript
test("should return valid users", function () {
  expect(res.getStatus()).to.equal(200);
  expect(res.getBody()).to.be.an('array');
  expect(res.getBody().length).to.be.greaterThan(0);

  const user = res.getBody()[0];
  expect(user).to.have.property('email');
  expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
```

## Ejecución por CLI

Ejecutar requests individuales o colecciones completas:

```bash
# Request individual
bru run get-users.bru --env Production

# Colección completa
bru run . --env Production

# Con filtrado por tags
bru run . --env Production --tag smoke

# Folder específico
bru run users/ --env Production
```

### Opciones de reporte

- **HTML**: `--reporter-html report.html`
- **JSON**: `--reporter-json results.json`
- **JUnit XML**: `--reporter-junit results.xml`

## Integración CI/CD

Bruno integra perfectamente con GitLab CI, GitHub Actions y otras plataformas.

### Ejemplo de pipeline GitLab CI

```yaml
stages:
  - test

api-tests:
  stage: test
  image: node:18
  script:
    - npm install -g @usebruno/cli
    - bru run . --env Production --reporter-junit results.xml
  artifacts:
    reports:
      junit: results.xml
    when: always
```

### Ejemplo de GitHub Actions

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Bruno CLI
        run: npm install -g @usebruno/cli
      - name: Run API Tests
        run: bru run . --env Production
```

## Características clave de Bruno

✅ **Git-friendly storage**: Archivos de texto que se versionan naturalmente
✅ **Organización flexible**: Estructura jerárquica intuitiva
✅ **Gestión robusta de variables**: Múltiples entornos con variables
✅ **Opciones de testing versátiles**: Assertions declarativas y JavaScript
✅ **Potente automatización CLI**: Perfecto para CI/CD
✅ **Rendimiento ligero**: Rápido y eficiente
✅ **Open-source transparente**: Comunidad activa y desarrollo abierto

## Conclusión

Bruno entrega API testing moderno con almacenamiento git-friendly, organización flexible, gestión robusta de variables, opciones de testing versátiles, potente automatización CLI, rendimiento ligero y transparencia open-source - haciéndolo ideal para equipos que priorizan simplicidad e integración.

### Recursos

- **Sitio oficial**: [https://www.usebruno.com/](https://www.usebruno.com/)
- **Documentación**: [https://docs.usebruno.com/](https://docs.usebruno.com/)
- **Repositorio de ejemplo**: [https://github.com/morvader/BrunoExample](https://github.com/morvader/BrunoExample)

**¿Listo para empezar?** Descarga Bruno y comienza a testear tus APIs de manera más eficiente hoy mismo.

