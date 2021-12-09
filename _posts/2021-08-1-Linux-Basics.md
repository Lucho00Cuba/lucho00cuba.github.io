---
title: Linux Basico
layout: post
post-image: "https://logos-marcas.com/wp-content/uploads/2020/09/Linux-Emblema.png"
description: Proyecto Red Cloud.
tags:
- post
- linux
- tutorial
---

_¿Qué es Linux?_

_Linux es el nombre que reciben una serie de sistemas operativos de tipo Unix bajo la licencia GNU GPL (General Public License o Licencia Pública General de GNU) que son su mayoría gratuitos y con todo lo necesario para hacer funcionar un PC, con la peculiaridad de que podemos instalar un sistema muy ligero e ir añadiendo todo lo necesario posteriormente o según lo vayamos necesitando._

_¿Para qué sirve Linux?_

_Linux sirve para hacer funcionar todo el hardware de un PC, ya que un ordenador no puede funcionar sin un sistema operativo y Linux es un sistema operativo gratuito. Linux está en muchos de los ordenadores que se venden sin sistema operativo, pero esto no es legal en España ya que un PC sin sistema operativo no es un PC funcional, muchos fabricantes optan por añadir una versión o distro de Linux._

_Este sistema operativo también es conocido por controlar superordenadores o servidores que es donde en realidad Linux toma importancia. La mayoría de los supercomputadores más importantes del mundo usan algún sistema GNU/Linux, por lo que también sirve para controlar superordenadores con tareas específicas, gracias a su capacidad de personalización._

<hr>

_Linux es una familia de sistemas operativos de código abierto tipo Unix basados ​​en el kernel de Linux, un kernel de sistema operativo. Un sistema operativo (SO) de open source y una plataforma de infraestructura de TI. Originalmente, fue concebido y creado como un pasatiempo por Linus Torvalds_


### Sistema de Archivos

_La estructura de directorios suele ser jerárquica, ramificada o "en árbol", aunque en algún caso podría ser plana. En algunos sistemas de archivos los nombres de archivos son estructurados, con sintaxis especiales para extensiones de archivos y números de versión. En otros, los nombres de archivos son simplemente cadenas de texto y los metadatos de cada archivo son alojados separadamente._

_En los sistemas de archivos jerárquicos, usualmente, se declara la ubicación precisa de un archivo con una cadena de texto llamada ruta (path, en inglés). La nomenclatura para rutas varía ligeramente de sistema en sistema, pero mantienen por lo general una misma estructura. Una ruta viene dada por una sucesión de nombres de directorios y subdirectorios, ordenados jerárquicamente de izquierda a derecha y separados por algún carácter especial que suele ser una barra diagonal / o barra diagonal invertida \ (según el sistema operativo) y puede terminar en el nombre de un archivo presente en la última rama de directorios especificada._


![Ficheros](https://i.blogs.es/b8d024/linux-file-system-hierarchy-linux-file-structure-optimized/original.jpg)

## Comandos Basicos

***.*** = Directorio Actual
```shell
lucho@linux:~$ ls .
Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap test Vídeos
lucho@linux:~$
```

**..** = Directorio Padre
```shell
lucho@linux:~$ ls ..
lucho
lucho@linux:~$
```

### Rutas

**Ruta Relativa**
```shell
lucho@linux:~$ ls ./Escritorio
lucho@linux:~$
```

**Ruta Completa** 
```shell
lucho@linux:~$ ls /home
lucho@linux:~$
```

## Comandos Basicos de Linux

* pwd 

    * Directorio de Trabajo
        ```shell
        lucho@linux:~$ pwd
        /home/lucho
        lucho@linux:~$  
        ```
* cat

    * Ver contenido de archivos
        ```shell
        lucho@linux:~$ cat archivo.txt
        Hola Mundo
        lucho@linux:~$
        ```
* ls

    * Listar directorios
        ```shell
        lucho@linux:~$ ls
        Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap  Vídeos
        lucho@linux:~$
        ```
* cd

    * Moverse por los directorios
        ```shell
        lucho@linux:~$ cd Escritorio
        lucho@linux:~/Escritorio$
        ```
* mkdir

    * Creacion de directorios
        ```shell
        lucho@linux:~$ mkdir test
        lucho@linux:~$ ls
        Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap test Vídeos
        lucho@linux:~$
        ```
* touch

    * Creacion de archivos
        ```shell
        lucho@linux:~$ touch test.txt
        lucho@linux:~$ ls
        Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap test.txt Vídeos
        lucho@linux:~$
        ```
* rm

    * Eliminar archivos y directorios
        ```shell
        lucho@linux:~$ rm test.txt
        lucho@linux:~$ ls
        Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap Vídeos
        lucho@linux:~$
        ```
* rmdir

    * Eliminar directorios o subdirectorios **vacios**
        ```shell
        lucho@linux:~$ rmdir test
        lucho@linux:~$ ls
        Descargas  Documentos  Escritorio  Imágenes  Música  Plantillas  Público  snap Vídeos
        lucho@linux:~$
        ```
* history

    * Ver historial de comandos introducidos
        ```shell
        lucho@linux:~$ history
        1   pwd
        2   cat archivo.txt
        3   ls
        4   cd Escritorio
        5   mkdir test
        6   touch test.txt
        7   rm test.txt
        8   rmdir test
        9   history
        lucho@linux:~$
        ```

* echo

    * Imprimir en consola
        ```shell
        lucho@linux:~$ echo "Hola Mundo"
        Hola Mundo
        lucho@linux:~$
        ```

* mv
 
    * Cambiar directorios, archivos de ruta o nombre
        ```shell
        lucho@linux:~$ mv archivo.txt ./Escritorio
        lucho@linux:~$
        ```

* cp 
    * Copiar directorios y archivos
        ```shell
        lucho@linux:~$ cp archivo.txt ./Documentos
        lucho@linux:~$
        ```