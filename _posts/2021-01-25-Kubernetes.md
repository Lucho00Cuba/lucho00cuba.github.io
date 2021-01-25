---
layout: post
title: Kukernetes
autor: Lucho
categories: [Virtualizacion]
tags: [Contenedores]
---

_Hola amigooos. En este post estaremos hablando un poquito de kubernetes._

_¿Que es Kubernetes?_

_Kubernetes (referido en inglés comúnmente como “K8s”) es un sistema de código libre para la automatización del despliegue, ajuste de escala y manejo de aplicaciones en contenedores_

![K8S](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Kubernetes_logo.svg/1280px-Kubernetes_logo.svg.png)

[Wiki](https://es.wikipedia.org/wiki/Kubernetes)

[Recurso](https://kubernetes.io/es/)

_Conceptos Basicos_

* _Namespaces_
    * _Espacios de Trabajos_

* _Pods_
    * _Un contenedor o una serie de contenedores unificados por etiquetas_

* _Deployments_
    * _Manifiesto declarativo de estado para crear Pods y ReplicaSets que el Controlador se encarga de conseguir el estado deseado_

* _Services_
    * _Es un conjunto de pods que trabajan en conjunto, como una capa de una aplicación multicapas_

* _Ingress_
    * _Objeto que nos va a permitir controlar muchos aspectos de nuestra red en nuestro cluster de Kubernetes_

![K8S](https://blog.ichasco.com/wp-content/uploads/2019/06/NGINX-Ingress-Controller-4-services_social.png)

# Tutorial

## Instalacion

_Instalacion con el uso de snap_
```shell
sudo snap install microk8s --class
```
```shell
microk8s status --wait-ready 
```
_Habilitar Addons de MicroK8S_
```shell
microk8s enable dashboard dns storage 
```

_Agregar este alias al bashrc_
```shell
alias mkctl="microk8s kubectl"
```
```shell
source ~/.bashrc
```

_Listo_
```shell
mkctl get namespace
```

## Namespaces

_Ver los namespaces por defecto_

![Vns](../img/k8s/ns_default.PNG)

_Creando namespaces_

![Cns](../img/k8s/ns_create.PNG)

_Usando YAML_

![CYns](../img/k8s/yns_create.PNG)

_Eliminar namespaces_

![Dns](../img/k8s/ns_delete.PNG)

## Pods

_Crear un pod_

![CreatePod](../img/k8s/pod_create.PNG)

_Nota: Para ver mas informacion sobre el Pod_
```shell
mkctl describe pod wildfly
``` 

_Acceso a un Pod_

![IntroPod](../img/k8s/pod_intro.PNG)

_Ver logs de de un  pods_

```shell
mkctl logs -f wildfly

=========================================================================

  JBoss Bootstrap Environment

  JBOSS_HOME: /opt/jboss/wildfly

  JAVA: /usr/lib/jvm/java/bin/java

  JAVA_OPTS:  -server -Xms64m -Xmx512m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m -Djava.net.preferIPv4Stack=true -Djboss.modules.system.pkgs=org.jboss.byteman -Djava.awt.headless=true  --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-exports=jdk.unsupported/sun.misc=ALL-UNNAMED --add-exports=jdk.unsupported/sun.reflect=ALL-UNNAMED

=========================================================================

16:08:12,663 INFO  [org.wildfly.extension.undertow] (MSC service thread 1-2) WFLYUT0006: Undertow HTTPS listener https listening on 0.0.0.0:8443
16:08:12,849 INFO  [org.jboss.ws.common.management] (MSC service thread 1-1) JBWS022052: Starting JBossWS 5.4.2.Final (Apache CXF 3.3.7)
16:08:12,984 INFO  [org.jboss.as.server] (Controller Boot Thread) WFLYSRV0212: Resuming server
16:08:12,986 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0025: WildFly Full 21.0.2.Final (WildFly Core 13.0.3.Final) started in 6641ms - Started 317 of 579 services (370 services are lazy, passive or on-demand)
16:08:12,987 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0060: Http management interface listening on http://127.0.0.1:9990/management
16:08:12,988 INFO  [org.jboss.as] (Controller Boot Thread) WFLYSRV0051: Admin console listening on http://127.0.0.1:9990
```

## Deployments

_Crear Deployment_

![D_Create](../img/k8s/deploy_create.PNG)

_Al aplicar el despliegue se nos crea el pod que declaramos en el archivo yaml_

![D_Pod](../img/k8s/deploy_pod.PNG)

_Eliminar Deployment_

![D_Delete](../img/k8s/deploy_delete.PNG)

## Services

_Crear un Service_

- Crear un Deployment

![D-W-M](../img/k8s/d_w_m.PNG)
![Deploy](../img/k8s/deploy_w_m.PNG)
![Service](../img/k8s/service.PNG)

_Hasta la proxima..._