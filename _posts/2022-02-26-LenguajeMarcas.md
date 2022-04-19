---
title: Lenguaje de Marcas - XML
layout: post
post-image: "https://i.ytimg.com/vi/21CP_85ls1g/maxresdefault.jpg"
description: Lenguajes de Marcas XML y sus validadores DTD, XSD
tags:
- post
- xml
---

_¿Qué es el Lenguaje de Marcas?_

_El lenguaje de marcas puede definirse como la forma de codificar un documento al, que junto con el texto, se incorporan una serie de etiquetas o marcas que contienen información adicional acerca de la estructura del texto o de su presentación_

### Historia

- Proviene de IBM en los años 70, llamado GML 
- GML se creó para almacenar la información de diferentes temas o tipos. Separa la información de la visualización. 
- La entidad ISO creó el estándar SGML (Standard Generalized Markup Language   en 1986 
- En n1989 se creó HTML a partir de SGML para cubrir el servicio de internet, su creación fue poco organizada y descontrolada 
- W3C es una entidad que trata de lograr unas reglas y etiquetas estándar para el lenguaje HTML. 
- W3C está creando el estándar XML (Extender Makup Language) para solucionar los problemas de HTML de mezclar contenido y formato o estilo, haciendo la visualización en pantalla no dependa del visor. 

<hr>

### XML - Introducción

- XML (Extensible Markup Language), es un lenguaje de etiquetado para guardar y transportar datos, es legible para ordenadores y humanos, está diseñado para la representación de estructura de datos. 
- XML se usa para separar los datos de la presentación, no indica como presentar la información, un mismo XML puede presentarse de muchas formas. 
- XML guarda o transporta los datos. 
- Es ideal para el intercambio de información entre aplicaciones. 
- Separa la parte de visualización y estructura: en xml puede almacenar una base de datos y mostrarla por HTML. 

### XML - Sintaxis

_La sintaxis de XML consiste en dos partes:_

- Prólogo: 
    - En la primera línea del documento puede aparecer el prólogo (es opcional pero recomendable), debe aparecer antes del elemento raiz. Se define la versión de XML utilizada (sólo existe la 1.0, por ahora) 
    - En la segunda línea aparece la codificación, habitualmente la UTF-8 
- Cuerpo
    ```xml
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <!DOCTYPE definicion SYSTEM "definicion.dtd">
    ```

> Los comentarios van de la siguiente manera: <!- Comentario -> 

### XML - Estructura

_Los documentos XML están formados por árboles de elementos. Cada  árbol comienza con un elemento root (raíz), del cual surgen ramas (branches) a elementos hijo. Todos los elementos pueden tener elementos hijo. Todos los elementos pueden tener contenido textual y atributos._

```xml
<?xml version="1.0" encoding="UTF-8"?>
<alumnos> <!-- Raiz / Root -->
    <alumno> <!-- Elemento Hijo de "alumnos" y Padre de los elementos que cuelgan de el -->
        <nombre>Elia</nombre> <!-- Elemento Hoja -->
        <apellidos>Martin</apellidos> <!-- Elemento Hoja -->
        <dni>123</dni> <!-- Elemento Hoja -->
    </alumno>
    <alumno>
        <nombre>Ana</nombre>
        <apellidos>Lopez</apellidos>
        <dni>456</dni>
    </alumno>
</alumnos>
```

_Para determinar el parentesco: padre, hijo y hermano, se suele emplear los siguientes términos:_

- Parent: están en el nivel superior. 
- Child: están por debajo de padre. 
- Sbling: son hermanos, que están al mismo nivel.

### XML - Elementos

_El lenguaje XML está definido por lo que se llaman etiquetas, que se especifican entre los símbolos < y >_
```xml
<etiqueta>
```

_Un elemento XML(denominado contenido) es cualquier cosa que entre la etiqueta inicial y final:_

```xml
<etiqueta>Elemento</etiqueta> 
```

_El conjunto formado por la etiqueta inicial, el contenido y la etiqueta final se denomina elemento._ Los elementos vacíos se pueden declarar de la siguiente manera:_

```xml
<elemento/> 
```

_Las características de un contenido, denominados atributos, están especificados dentro de la etiqueta inicial_

```xml
<peso tipo="kg">86</peso>
```

### XML - Reglas

_Reglas para los elementos:_

    - Son Key sensitive: diferencia entre minúsculas y mayúsculas. 
    - Las etiquetas deben empezar con un _(guión bajo) o letra. OTROS ERRORES DARÁN ERROR. 
    - Puede contener letras, dígitos, guiones, barras bajas y puntos. 
    - El nombre de la etiqueta no puede tener espacios 
    - Usar nombres sencillos, evitar caracteres especiales como la ñ, tildes, puntos, etc 
    - No puede haber saltos de línea. 

### XML - Atributos

_Dan información sobre los elementos. Los atributos van dentro de la etiqueta y llevan comillas simples comillas simples, una vez puesto por primera vez siempre debe ser igual. La palabra quot sustituye un carácter que en el momento no está permitido. Por ejemplo las comillas simples no pueden ir dentro del propio atributo o etiqueta, en este caso usariamos apos. GT sería > y LT sería menor que._

#### Nota
>Losespacios de nombres o namespace proporcionan una forma de evitar conflictos de nombres entre elementos. Hay documentos que pueden compartir el mismo nombre de etiqueta, para eso se usa los namespaces, es un atributo, xmlns"paginaweb".  La URL no tiene porque existir, la usamos para diferenciar etiquetas que tienen el mismo nombre y almacenan información distinta. También se le puede poner un prefijo,, primero habría que definirlo de la siguiente manera: ```<alias:etiqueta:"URL">``` . Ya no haría falta poner todo el atributo, solo tendríamos que poner el alias. Los alias se pueden declarar en el prólogo.

<hr>

### DTD

_**DTD: Definición de tipo de documento**_

_Sirve para definir la estructura de un documento XML y permite su validación. En este documento se definen las reglas de los elementos y de sus atributos que están permitidos en el documento XML. Los XML que cumplen con las reglas establecidas por DTD se denominan bien formado o validado. Un DTD permite a un equipo de trabajo crear un DTD estándar para intercambiar datos y así poder asegurar una uniformidad (todos los miembros del equipo cumplen con la misma estructura). Un XML puede estar validado y no cumplir con el DTD. El DTD se puede agregar en el prólogo o podemos crearlo a parte y vincularlo al XML. Cuando se define dentro del prólogo sólo cuando existe un solo documento DTD. Si hay varios DTD se tienen que linkear._

### DTD - Declaracion

_Para definir un DTD internamente en el prólogo del propio XML,  estableceríamos toda la estructura del DTD entre [ ]. Cuando se crea un DTD interno, es decir, dentro del XML, debe cumplir con lo siguiente: el DOCTYPE debe hacer referencia al elemento root_

#### Interno

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE alumnos [
    <!ELEMENT alumnos (alumno+)*>
    <!ELEMENT alumno (nombre ,apellidos ,dni?)>
    <!ELEMENT nombre (#PCDATA)>
    <!ELEMENT apellidos (#PCDATA)>
    <!ELEMENT dni (#PCDATA)>
]>
<alumnos>
    <alumno>
        <nombre>Elia</nombre>
        <apellidos>Martin</apellidos> 
        <dni>123</dni>
    </alumno>
    <alumno>
        <nombre>Ana</nombre>
        <apellidos>Lopez</apellidos>
        <dni>456</dni>
    </alumno>
</alumnos>
```

<br>

#### Externo

_Para llamar un DTD externo hay que hacer una llamada debajo del prólogo del DTD, con el "atributo" SYSTEM y ponemos la ruta entre comillas ""._ 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE alumnos SYSTEM "./alumnos.dtd"> 
<alumnos>
    <alumno>
        <nombre>Elia</nombre>
        <apellidos>Martin</apellidos> 
        <dni>123</dni>
    </alumno>
    <alumno>
        <nombre>Ana</nombre>
        <apellidos>Lopez</apellidos>
        <dni>456</dni>
    </alumno>
</alumnos>
```

### DTD - Configuracion

_En la estructura del DTD montamos la jerarquía. Como se dijo anteriormente, la primera línea debe hacer referencia al elemento root y lo que va entre paréntesis a su primer hijo_

```xml
<!ELEMENT etiquetaRoot (etiquetaPrimerHijo)>
``` 

_Cuando ese primer hijo tiene otros hijos también se define igual que el anterior_

```xml
<!ELEMENT etiquetaHijo1(etiquetaSegundoHijo)> 
```

_Si hay elementos hermanos Sbling que son hijos, deberemos definirlos de la siguiente manera, separados por_ 

```xml
<!ELEMENT etiquetaHijo1(etiquetaSegundoHijo1Hermano1, etiquetaSegundoHijo1Hermano2)> 
```

_Cuando ya son elementos simples, es decir, que no tienen más hijos, sólo contienen información, se debe definir el tipo de información que guardarán, por ejemplo si es tipo texto #PCDATA_

```xml
<!ELEMENT etiquetaNombreInformacion1 (#PCDATA)> 
<!ELEMENT etiquetaNombreInformacion2 (#PCDATA)> 
```

_Hay veces que debemos usar modificadores, como el símbolo + (indica que habría varias etiquetas con el mimo nombre)_

**Resultado:**

```xml
<!ELEMENT etiquetaRoot (etiquetaPrimerHijo)>
<!ELEMENT etiquetaHijo1 (etiquetaSegundoHijo)>
<!ELEMENT etiquetaHijo1 (etiquetaSegundoHijo1Hermano1, etiquetaSegundoHijo1Hermano2)>
<!ELEMENT etiquetaNombreInformacion1 (#PCDATA)> 
<!ELEMENT etiquetaNombreInformacion2 (#PCDATA)> 
```

### DTD - Atributos

_Tipos de atributos serian:_

    CDATA -> texto

    ID -> Identificador unico

_Valores de atributos_

    valor predeterminado <!ATTLIST alumno dni CDATA "4545K">

    valor fijo <!ATTLIST alumno dni CDATA #FIXED "4545K">

    valor opcional <!ATTLIST alumno dni CDATA #IMPLIED>

    valor requerido <!ATTLIST alumno dni CDATA #REQUIRED>

### DTD - Modificadores

    + : se añade después del nombre del hijo, indicando que habrá varios elementos con ese nombre. 

    * : puede haber 0 o N elementos con el mismo nombre. 

    ? : va estar 0 o 1 sola vez. 

### DTD - Entidades

**ENTIDADES DEL XML**

_Las entidades son como "atajos de teclado" de elementos que se van a repetir varias veces, se definen un valor por defecto. Se definen con la siguiente sintaxis:_

```<!ENTITY nombreEntidad "valorPorDefecto">```

_Luego se puede llamar desde el XML usando el símbolo "&"._

```<nombreElemento>cualquierNombre &nombreEntidad</nombreElemento>```