---
title: Metasploitable2
layout: post
post-image: "https://raw.githubusercontent.com/estebanrfp/static-assets/master/images/articles/5de3a66691c120787e82a255/large@2x.jpg"
description: Vulnerando Metasploitable 2
tags:
- post
- linux
- pentesting
---

## Intro

Metasploitable es una máquina virtual Linux intencionalmente vulnerable. Esta máquina virtual se puede utilizar para realizar capacitación en seguridad, probar herramientas de seguridad y practicar técnicas comunes de prueba de penetración

## Instalacion y Configuracion

- Obtenga esta máquina Metasploiable2 de https://information.rapid7.com/download-metasploitable-2017.html 
- Abra VirtualBox y haga clic en el botón "Nuevo" para crear una nueva máquina virtual
- Escriba el nombre de la máquina virtual (Metasploitable2)
- Asignar la cantidad de memoria (preferible, pero no por debajo de 512 MB)
- Seleccione Usar un archivo de disco duro existente
- Seleccione el archivo vmdk que ha descargado de Rapid7
- Seleccione la red NAT (Se recomienda no poner en Bridge)
- Haga clic en Crear ... !!! Metasploitable2 instalado con éxito, ahora es el momento de configurar los ajustes de red. 
- Arranque la máquina Metasploitable2 e intente iniciar sesión con las credenciales dadas en Banner ... !!! 


## Al lio...

Como primer paso escaneanos la red en busca de la maquina Metasploitable2

```
nmap -sn -n 10.15.1.0/24
```

### Servicios

- #### FTP (21)

- #### SSH (22)

- #### Telnet (23)

- #### SMTP (25)

- #### NetBios-SSN (139-445)

- #### Java-RMI (1099)

- #### BindShell (1524)

- #### ProFTPD (2121)

- #### MySQL (3306)

- #### Disctccd (3632)

- #### Postgresql (5432)

- #### VNC (5900)

- #### X11 (6000)

- #### UnreallRCD (6667-6697)

- #### Tomcat (8180)

- #### Ruby-drb (8787)



Creditos -> https://medium.com/@informationseek/metasploitable2-c0d99560145d