# Cómo mejorar la mantenibilidad de las pruebas unitarias

<!--more-->

## ¿Qué vamos a ver?

En este artículo explicaremos cómo mejorar la mantenibilidad y eficacia de las pruebas unitarias a la hora detectar errores en el código.
Veremos cómo, haciendo uso de determinadas librerías, podremos hacer que la generación de objetos de pruebas sea mucho más sencilla y resistente ante cambios en los constructores.

## Contexto

A la hora de hacer pruebas unitarias, seguramente te hayas visto en la situación de tener que estar creando objetos una y otra vez. Para ello, habrás tenido que llamar al constructor de la clase con los parámetros correspondientes. Hasta aquí nada raro, pero muy probablemente habrá habido ocasiones en las que los valores de algunos de esos campos fuesen irrelevantes para prueba o veces en las que hayas tenido que crear objetos “dummy” anidados, simplemente porque eran obligatorios en el constructor.

Todo ello, seguramente te haya generado algo de frustración en algún punto y te haya hecho cuestionarte si lo estabas haciendo bien o sí, si realmente esa la forma de hacer pruebas unitarias, entonces no merecería la pena el esfuerzo

Es decir, normalmente, una prueba debe tener un objetivo claro, por tanto, es normal que dentro del SUT (System under test) haya campos que realmente sean el objeto de la prueba y, en cambio, otros sean irrelevantes.

Pongamos un ejemplo. Supongamos que tenemos la clase “Persona” con los campos: Nombre, Email y Edad. Por otro lado, queremos hacer las pruebas unitarias de un servicio que, recibiendo un objeto Persona, nos dice si ésta puede viajar gratis en autobús o no. Sabemos que dicho cálculo únicamente depende de la edad, los menores de 14 años viajan gratis, por tanto, en este caso, los campos de Nombre y Email son irrelevantes.

En este ejemplo, crear objetos Persona no nos supondría demasiado esfuerzo, pero supongamos que los campos de la clase Persona crecen o bien, empiezan a aparecer objetos anidados: Dirección, Parientes (Lista de Personas), Lista de teléfonos, etc. Ahora, se plantean varios aspectos a tener en cuenta:

* Resulta más laborioso crear los objetos
* ¿Qué ocurre cuando el constructor o los campos de la clase cambian?
* Cuándo hay listas de objetos, ¿Cuántos objetos debo crear?
* ¿Qué valores tengo que asignar a los campos que no influyen en la prueba?
* ¿Es bueno que los valores sean siempre los mismos, sin ninguna variabilidad?

Para resolver este tipo de situaciones, habitualmente se utilizan dos patrones de diseño conocidos: Object Mother y Builder. En ambos casos se trata de tener “helpers” que nos faciliten la creación de objetos con las características que necesitamos.

Ambas aproximaciones están muy extendidas, son adecuadas y favorecen la mantenibilidad de las pruebas. No obstante, siguen sin resolver algunas cuestiones:

* Al cambiar los constructores, aún siendo campos que no afecten en las pruebas, el código dejará de compilar
* Cuando aparezcan nuevos campos, debemos actualizar el código que genera los objetos para las pruebas
* Generar objetos anidados sigue siendo laborioso
* Los campos obligatorios y no utilizados, están hardcodeados y se asignan por defecto, por lo que no hay variabilidad en las pruebas.

Una de las librerías, en java, que puede solucionar estos problemas es “easyRandom”. A continuación veremos detalles de su funcionamiento.

## ¿Qué es easyRandom?

`EasyRandom` es una librería de Java que facilita la generación de datos aleatorios para pruebas unitarias y de integración.
La idea detrás de `EasyRandom` es proporcionar una manera sencilla de crear objetos con valores aleatorios que puedan ser utilizados en pruebas. En lugar de tener que definir manualmente valores para cada atributo de una clase en cada prueba, `EasyRandom` automatiza este proceso, generando automáticamente datos aleatorios para cada atributo.

Esta librería se encarga de manejar tipos de datos primitivos, clases personalizadas, colecciones, y otros tipos de objetos. También puede ser configurada para respetar ciertas reglas y restricciones en la generación de datos, lo que la hace bastante flexible.

Aquí hay un ejemplo básico de cómo se puede usar `EasyRandom` para generar un objeto aleatorio:

``` java
public class EasyRandomExample {
    public static void main(String[] args) {

        EasyRandom easyRandom = new EasyRandom();

        Person randomPerson = easyRandom.nextObject(Person.class);
        System.out.println(randomPerson);
    }
}
```

En este ejemplo, `Person` es una clase ficticia y `easyRandom.nextObject(Person.class)` genera una instancia de `Person` con valores aleatorios para sus atributos.

Como puede verse, la generación de estos objetos no depende del constructor de la clase, por lo que, el código de la prueba seguirá compilando, aunque se produzcan cambios en el SUT. Esto solventaría uno de los mayores problemas a la hora de mantener una suite de pruebas automáticas.

## ¿Por qué es interesante?

Utilizar la biblioteca `EasyRandom` para el testing de tus aplicaciones tiene varias ventajas:

1. **Generación de datos aleatorios simplificada**: Se automatiza la generación de datos aleatorios para tus objetos, evitando que tengas que escribir código repetitivo para cada prueba.

2. **Facilita las pruebas unitarias y de integración**: Al generar automáticamente objetos de prueba, puedes enfocarte en probar el comportamiento del código en lugar de preocuparte por la creación manual de datos de prueba.

3. **Personalización de datos**: Aunque genera datos aleatorios por defecto, `EasyRandom` también permite personalizar ciertos campos o atributos si es necesario, permitiéndote ajustar la generación según tus necesidades.

4. **Reducción de errores humanos**: La generación manual de datos de prueba puede llevar a errores, especialmente cuando se tratan con muchos campos y combinaciones. `EasyRandom` ayuda a minimizar los errores humanos al generar datos aleatorios consistentes.

5. **Mantenimiento simplificado**: Si cambian los requisitos de tus clases (nuevos campos, tipos, etc.), no necesitas actualizar manualmente tus datos de prueba, ya que `EasyRandom` se encargará de generarlos automáticamente.

6. **Mejora de la legibilidad**: El uso de `EasyRandom` hace que tus pruebas sean más limpias y legibles, puesto que no es necesario definir valores de prueba explícitamente en cada caso.

7. **Rapidez en el desarrollo de pruebas**: Al reducir el tiempo dedicado a la creación de objetos de prueba, puedes desarrollar pruebas de manera más rápida y efectiva.

8. **Facilidad de uso**: Añadir esta librería a nuestros proyectos java es prácticamente inmediato y resulta tremendamente fácil de utilizar.

## ¿Dónde lo puedes aplicar?

Como es lógico, esta librería nos va a permitir simplificar la creación de objetos para nuestras pruebas unitarias, pero también nos puede ser de gran ayuda cuando necesitemos generar un conjunto de datos de pruebas. Esto podemos conseguirlo utilizando los DTOs de nuestra aplicación y generando objetos aleatorios para, posteriormente, volcarlos a una base de datos o fichero.
Dónde no es recomendable
Esta librería puede no merecer la pena en proyectos donde la generación de objetos no resulte compleja o donde necesitemos un control preciso sobre todos los campos de los objetos que intervienen en la prueba.

## ¿Cómo utilizar easyRandom?

Veamos easyRandom en acción con un ejemplo real.
Entorno utilizado, prerrequisitos

### Prerrequisitos

* Java 8+
* Maven o Gradle
* Eclipse o IntelliJ IDE

### Setup inicial

Dentro de nuestro proyecto debemos añadir una nueva dependencia
El fichero pom.xml quedaría de la siguiente manera:

``` xml
<dependency>
    <groupId>org.jeasy</groupId>
    <artifactId>easy-random-core</artifactId>
    <version>5.0.0</version>
</dependency>
```

### Caso de uso básico

El caso de uso más básico ya lo hemos visto antes. En ese ejemplo, se asignan valores a los campos de la clase persona de manera totalmente aleatoria. Obviamente, a la hora de hacer pruebas, necesitaremos tener control sobre algunos campos determinados. Vamos a ver esto en un ejemplo.
Recordemos que easyRandom también puede utilizarse con tipos primitivos. Por tanto, nuestro ejemplo podría quedar así

``` java
public class PersonServiceTest {
    private final EasyRandom easyRandom = new EasyRandom();
    private final PersonService personService = new PersonService();

    @Test
    public void testIsAdult() {
        // Genera una persona mayor de edad (edad >= 18)
        Person adultPerson = easyRandom.nextObject(Person.class);
   
   // Nos aseguramos de que sea mayor de edad 
        adultPerson.setAge(18 + easyRandom.nextInt(80));

        assertTrue(personService.isAdult(adultPerson));
    }

    @Test
    public void testIsNotAdult() {
        // Genera una persona menor de edad (edad < 18)
        Person minorPerson = easyRandom.nextObject(Person.class);

   // Nos aseguramos que sea menor de edad
        minorPerson.setAge(easyRandom.nextInt(17));

        assertFalse(personService.isAdult(minorPerson));
    }
}
```

Como vemos, esta manera de generar los objetos de prueba nos protege ante cambios en la clase “Persona” y nos permite centrarnos únicamente en aquel campo que nos interesa.

También podemos utilizar esta librería para generar listas de objetos aleatorios

``` java
@Test
void generateObjectsList() {
    EasyRandom generator = new EasyRandom();

  //Generamos una lista de 5 Personas
    List<Person> persons = generator.objects(Person.class, 5)
        .collect(Collectors.toList());

    assertEquals(5, persons.size());
}
```

Este test, en sí, no tiene demasiada utilidad, simplemente es para demostrar la capacidad de a la hora de generar listas, las cuales, podrían ser utilizadas para volcar datos a una base de datos, por ejemplo.
Generación de datos parametrizados
Veamos ahora cómo utilizar esta librería para tener un control más preciso en la misma generación del objeto. Esto podemos hacerlo mediante la parametrización.

Fijar el valor un campo
Imaginemos el caso de que para nuestras pruebas queramos mantener ciertos valores constantes (un ID, un nombre, una dirección, etc.) Para conseguirlo, tendríamos que configurar la inicialización de objetos mediante “EasyRandomParameters” y localizar los parámetros por su nombre.

Veamos cómo:

``` java
EasyRandomParameters params = new EasyRandomParameters();

// Asignar un valor al campo por medio de una función lamba
params.randomize(named("age"),()-> 5);

EasyRandom easyRandom = new EasyRandom(params);

// El objeto tendrá siempre una edad de 5
Person person = easyRandom.nextObject(Person.class);
```

Por supuesto, lo mismo podría hacer con colecciones u objetos complejos.

Supongamos que nuestra clase Persona, contiene una clase Dirección en su interior y que, además, deseamos generar una lista de dos personas

Veamos un ejemplo más completo:

``` java
EasyRandomParameters parameters = new EasyRandomParameters()
                .randomize(Address.class, () -> new Address("Random St.", "Random City"))

EasyRandom easyRandom = new EasyRandom(parameters);
return Arrays.asList(
        easyRandom.nextObject(Person.class),
        easyRandom.nextObject(Person.class)
);
```

Supongamos ahora que una persona pueda tener varias direcciones. Esto querría decir que el campo “Adress” será una lista dentro de la clase “Person”.

Con esta librería también podemos hacer que nuestras colecciones tengan un tamaño variable. Es algo que también podemos hacer mediante los parámetros.

``` java
EasyRandomParameters parameters = new EasyRandomParameters()
               .randomize(Address.class, () -> new Address("Random St.", "Random City"))
	.collectionSizeRange(2, 10); 

EasyRandom easyRandom = new EasyRandom(parameters);

// El objeto tendrá una lista de entre 2 y 10 direcciones
Person person = easyRandom.nextObject(Person.class);
```

### Establecer campos pseudoaleatorios

Como hemos visto, fijar valores resulta bastante sencillo y directo. Pero, ¿qué ocurre si queremos controlar la aleatoriedad de los datos?. Es decir, deseamos generar nombres de personas aleatorios, pero que sigan siendo nombres y no únicamente cadenas de caracteres inconexos. Esta misma necesidad, quizá quede más clara cuando nos interese tener aleatoriedad en campos como: email, número de teléfono, DNI, número de tarjeta, nombre de ciudad, etc.

Para ello, resulta útil a otras librerías de generación de datos. Una de las más conocidas es “Faker”.

Combinando ambas librerías podríamos llegar a un código como este:

``` java
EasyRandomParameters params = new EasyRandomParameters();
//Generar número entre 0 y 17
params.randomize(named("age"), () -> Faker.instance().number().numberBetween(0, 17));

// Generar nombre "reales" aleatorios
params.randomize(named("name"), () -> Faker.instance().name().fullName());

EasyRandom easyRandom = new EasyRandom(params);

Person person = easyRandom.nextObject(Person.class);
```

Existen multitud de parámetros que nos permiten controlar la generación de objetos
En el este enlace puede consultarse más información

### Qué me ha parecido

EasyRandom es una librería que debería formar parte de tu mochila si desarrollas pruebas unitarias, ya que ayuda en la mantenibilidad de las pruebas unitarias.
Además, y aunque pueda resultar extraño, establecer cierta aleatoriedad controlada en las pruebas, puede no ser malo. En cierto modo, es una manera de generar nuevos casos de pruebas de manera automática y aumentará la probabilidad de encontrar errores en código.

## Enlaces

* [GitHub - j-easy/easy-random: The simple, stupid random Java beans/records generator](https://github.com/j-easy/easy-random)
* [Quick Guide to EasyRandom in Java | Baeldung](https://www.baeldung.com/java-easy-random)
* [GitHub - DiUS/java-faker: Brings the popular ruby faker gem to Java](https://github.com/DiUS/java-faker)

