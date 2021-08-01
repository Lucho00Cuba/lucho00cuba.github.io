---
layout: page
title: Linux
---


## Conceptos Basicos

**.** = Directorio Actual
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