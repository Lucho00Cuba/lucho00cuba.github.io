---
title: Rancher 2.5
layout: post
post-image: "https://the.binbashtheory.com/rke-logo.png"
description: Entorno de kubernetes con Rancher 2.5
tags:
- post
- linux
- kubernetes
- rancher
---

## Un poco de teoria...

### ¿Que es Kubernetes?

Kubernetes es un proyecto Open Source de Google para la gestión de aplicaciones en contenedores, en especial los contenedores Docker, permitiendo programar el despliegue, escalado, monitorización de los contenedores, etc. Permite empaquetar las aplicaciones en contenedores, trasladarlos fácil y rápidamente a cualquier equipo para ejecutarlas. Fue diseñado para ser un entorno para la creación de aplicaciones distribuidas en contenedores. Es un sistema para la construcción, funcionamiento y gestión de sistemas distribuidos.

### ¿Que es Rancher?

Rancher fue construido originalmente para trabajar con múltiples orquestadores. Rancher 2 implementa y administra exclusivamente los clústeres de Kubernetes que se ejecutan en cualquier lugar y en cualquier proveedor. Rancher puede aprovisionar Kubernetes desde un proveedor alojado, aprovisionar nodos de cómputo y luego instalar Kubernetes en ellos, o importar clústeres de Kubernetes existentes que se ejecutan en cualquier lugar.

### ¿Que es RKE?

Rancher Kubernetes Engine (RKE) es una distribución de Kubernetes certificada por CNCF que se ejecuta completamente dentro de contenedores Docker. Funciona en servidores bare-metal y virtualizados. RKE resuelve el problema de la complejidad de la instalación, un problema común en la comunidad de Kubernetes. Con RKE, la instalación y operación de Kubernetes se simplifica y se automatiza fácilmente, y es completamente independiente del sistema operativo y la plataforma que está ejecutando. Siempre que pueda ejecutar una versión compatible de Docker, puede implementar y ejecutar Kubernetes con RKE

<center>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/arquitecture.png"/>
<br>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/workloads.png"/>
</center>

## Pasando a la practica...

En esta pequeña practica estaremos viendo el despliegue de un cluster con RKE y su posterior administracion con Rancher 2.5

Flujo de trabajo

- Aprovisionamiento de las maquinas
- Despliegue de un clúster con RKE
- Despliegue de Rancher 2.5

### Aprovisionamiento de las Maquinas

El aprovisionamiento de las maquinas/servidores/nodos se trata de la actualización/instalación/configuracion de los componentes para el posterior despliegue de la infraestructura

### RKE

Para el despliegue de un cluster con RKE es necesario tener el binario estatico de rke, y configurar el manifiesto de despliegue

- [Docs RKE](https://rancher.com/docs/rke/latest/en/os/)

```shell
wget https://github.com/rancher/rke/releases/download/v1.3.2/rke_linux-amd64
chmod +x rke_linux-amd64
mv rke_linux-amd64 /usr/bin/rke
rke config --name cluster.yml # Configurar el manifiesto de acuerdo a sus necesidades
rke up
```

<center>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/rke.png"/>

<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/rkei.png"/>

<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/rkeup.png"/>
</center>

Al terminar el despliegue de _RKE_ se nos crea un fichero *"kube_config_cluster.yml"* con el cual nos conectaremos al cluster con el cliente _kubectl_

```shell
alias k="kubectl --kubeconfig kube_config_cluster.yml"
```
<center>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/kci.png"/>
</center>

#### Cert-Manager

Para el correcto despliegue de muchas aplicaciones requerimos de una identidad certificadora dentro del clúster. Dicha identidad certificadora es “cert-manager” la cual se encarga de emitir, revocar certificados de seguridad, etc.... Para el despliegue de dicho aplicativo, se crearon dos manifiestos en YML para su correcto despliegue

<center>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/cert-manager.png"/>

<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/cert-manager2.png"/>
</center>

#### Aplicaciones

Para esta pequeña demo yo estare utlizando varias aplicaciones como:

- MetalLB (Balanceador de Carga)
- Traefik (Ingress Controller)

#### Rancher 2.5

En la documentacion oficial de Rancher se recomienda el despliegue con helm

- [Docs Rancher 2](https://rancher.com/docs/rancher/v2.5/en/)

<center>
<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/rancher.png"/>

<img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/env-work/rancher2.png"/>
</center>