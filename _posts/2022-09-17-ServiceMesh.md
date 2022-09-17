---
title: Service Mesh en Kubernetes
layout: post
post-image: "https://servicemesh.es/img/openservicemesh.svg"
description: Service Mesh (Istio y Linkerd)
tags:
- post
- kubernetes
- devops
- service-mesh
---

_¿Que es Service Mesh?_

_Una malla de servicios o service mesh, se utiliza para controlar el intercambio de datos entre las distintas partes de una aplicación. A diferencia de otros sistemas que también administran esta comunicación, la malla de servicios es una capa visible y específica de la infraestructura integrada a la aplicación, la cual puede registrar si las distintas partes interactúan bien o no, a fin de facilitar la optimización de las comunicaciones y evitar el tiempo de inactividad a medida que crece una aplicación._

<center>
    <img src="https://www.tibco.com/sites/tibco/files/media_entity/2021-05/service-mesh-diagram.svg" alt="Service Mesh"/>
</center>

_Un Service Mesh, normalmente usa un tipo de proxy conocido como Sidecar. Un “Proxy Sidecar”, se vincula a un servicio para ampliar o añadir funcionalidades. Su nombre proviene de la semejanza de su implantación con el sidecar de una moto. En el caso que estamos desarrollando, y al ser una estructura de microservicios en Kubernetes, cada proxy sidecar se implantará en cada pod. Una vez implementado el proxy, se podrán distinguir dos “capas” en el Service Mesh: el data plane(o plano de datos) y el control plane(o plano de control). El data plane está formado por las instancias, los sidecars y sus interacciones; mientras que, por otro lado, el control plane, es el encargado de la administración de tareas, la monitorización, y la implementación de políticas._

### Software Lider

Linkerd e Istio son mallas de servicio muy poderosas y realmente depende de sus requisitos en cuanto a cuál debe usar. Si desea algo para resolver sus problemas de malla de servicios y desea que su plano de datos sea muy rápido, requiera menos recursos y sea menos complejo de administrar, Linkerd debe ser su elección. 

Si desea muchas funciones y tiene un gran equipo para administrar su red de servicios y sus componentes y complejidad, puede optar por Istio. Con Istio, puede configurar fácilmente la salida y las reglas sobre el tráfico saliente, algo que también puede ser un poco complicado con Linkerd. Por supuesto, el uso de recursos y la latencia son dos factores adicionales que debe tener en cuenta al tomar esta decisión, y Linkerd es la opción preferida para ambos. 

<center>
    <img src="https://external-preview.redd.it/LB_oqBdYn_7gEnP94X7JRB-vJ20BR-tLGRsZBRJDe1Y.jpg?auto=webp&s=3775420e6d1c8d7750f417caa8d387445c7c73b1" alt="versus">
</center>

La implementación de un Service Mesh resuelve algunos problemas clave a la hora de montar una estructura de microservicios, pero no todos. Entre las ventajas que destacan a la hora de montar una Service Mesh destacan:
- Simplifica la comunicación entre los microservicios.
-  Facilidad a la hora de encontrar fallos en la comunicación, ya que esta se  encuentra “empaquetada” en su propia capa de infraestructura.
- Permite el cifrado, la autenticación y la autorización.
- Permite un desarrollo, prueba y despliegue de las aplicaciones.
- Mejora en la administración de las redes de un cluster de contenedores.

Por otro lado, también existen desventajas relacionadas con la implantación de un Service Mesh, entre ellas:
- El tiempo de ejecución de las instancias aumenta exponencialmente.
- Añade un paso más en la comunicación, ya que la comunicación debe pasar a través del proxy.

### Malla de servicios en sistemas distribuidos

Asumiendo que existen los problemas descritos por James Glosling, en los sistemas distribuidos, ¿cómo debemos atacarlos y en qué nos puede ayudar un service mesh?

 - **La red no es robusta ni confiable**. Como ingenieros o arquitectos de software necesitamos estar preparados para lidiar con estos escenarios, introduciendo suficiente redundancia en el sistema en el lado del servidor, pero también en el lado del cliente se necesita añadir mecanismos de reintentos para poder manejar problemas de red transitorios.
 

- **La latencia es alta**. Patrones como circuit breaker tienen como objetivo manejar escenarios de latencias, encapsulando la llamada a un servicio remoto en un objeto que realiza un seguimiento de fallos, de tal forma que, si existen fallos, no se invocará más al servicio externo, y se devuelve instantáneamente un error al cliente. Si no se tienen en cuenta este tipo de consideraciones, estos fallos pueden tener un efecto cascada en el ecosistema completo.
 

- **El ancho de banda es finito**. Para superar situaciones como las del crecimiento de servicios, se hace necesario que las aplicaciones tengan un mecanismo de cuotas de alojamiento y trazabilidad de su consumo. Un crecimiento de microservicios también puede crear problemas de saturación en los balanceadores de carga y así degradar su rendimiento. Insertar balanceo de carga en el lado del cliente suele ser un buen enfoque para afrontar situaciones similares.
 

- **La red no es segura**. En arquitecturas de microservicios, cada uno de los equipos de desarrollo debe responsabilizarse de la seguridad. La comunicación entre microservicios necesita ser controlada. La autenticación a nivel de servicio es imprescindible para filtrar conexiones desconocidas.
 

- **La topología cambia**. Como ya comentamos, un simple escalado horizontal en un servicio puede cambiar flujos de tráfico e insertar fallos inesperados. Un sistema de descubrimiento de servicios puede solucionar este tipo de problemas en gran medida.
 

- **Hay varios administradores del sistema**. Para tener éxito en este aspecto se necesita un acceso basado en roles o RBAC.
 

- **El coste de transporte no es cero**. La transmisión de datos puede incurrir también en costes. Los datos deben ser serializados entre extremos. Protocolos como SOAP/XML son altamente ineficientes, JSON se considera mejor elección, pero protocolos binarios como buffers de protocolo, independientes del lenguaje han mejorado JSON. Considerando que el intercambio de información ocurre entre aplicaciones, es preferible usar un protocolo binario para el ecosistema completo.
 

- **La red es heterogénea**. Una malla de servicio nos permite desacoplar la infraestructura del código de la aplicación. También simplifica la topología de red subyacente, ya que la red solo proporciona la conexión física. Todos los firewalls, balanceadores de carga y subredes se pueden eliminar, dado que no quieren controlar ninguna interacción de servicio.

### Instalando Istio

Para la instalacion de Istio se ha seguido la guia de su sitio web [Getting Started](https://istio.io/latest/docs/setup/getting-started/). 

> Presentan diversas situaciones y configuraciones dependiendo del problema en cuestion. [Labs](https://istio.io/latest/docs/tasks/traffic-management/)

Esta pequeña demostración se puede llevar a cabo localmente a través de Docker y Minikube, este último es la versión mínima de Kubernetes, de forma que contamos en local con un cluster de Kubernetes formado por un único nodo que hace de máster y de esclavo al mismo tiempo.

```bash
lucho@buzz:~$ curl -L https://istio.io/downloadIstio | sh - # Get Istio
lucho@buzz:~$ cd istio-1.15.0 
lucho@buzz:~/istio-1.15.0$ export PATH=$PWD/bin:$PATH
lucho@buzz:~/istio-1.15.0$ istioctl install --set profile=demo -y
✔ Istio core installed
✔ Istiod installed
✔ Egress gateways installed
✔ Ingress gateways installed
✔ Installation complete

lucho@buzz:~/istio-1.15.0$ kubectl label namespace default istio-injection=enabled
namespace/default labeled

lucho@buzz:~/istio-1.15.0$ kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
service/details created
serviceaccount/bookinfo-details created
deployment.apps/details-v1 created
service/ratings created
serviceaccount/bookinfo-ratings created
deployment.apps/ratings-v1 created
service/reviews created
serviceaccount/bookinfo-reviews created
deployment.apps/reviews-v1 created
deployment.apps/reviews-v2 created
deployment.apps/reviews-v3 created
service/productpage created
serviceaccount/bookinfo-productpage created
deployment.apps/productpage-v1 created

lucho@buzz:~/istio-1.15.0$ kubectl get services
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.0.0.212      <none>        9080/TCP   2m
kubernetes    ClusterIP   10.0.0.1        <none>        443/TCP    20m
productpage   ClusterIP   10.0.0.57       <none>        9080/TCP   2m
ratings       ClusterIP   10.0.0.33       <none>        9080/TCP   2m
reviews       ClusterIP   10.0.0.28       <none>        9080/TCP   2m

lucho@buzz:~/istio-1.15.0$ kubectl get pods
NAME                              READY   STATUS    RESTARTS   AGE
details-v1-558b8b4b76-2llld       2/2     Running   0          2m41s
productpage-v1-6987489c74-lpkgl   2/2     Running   0          2m40s
ratings-v1-7dc98c7588-vzftc       2/2     Running   0          2m41s
reviews-v1-7f99cc4496-gdxfn       2/2     Running   0          2m41s
reviews-v2-7d79d5bd5d-8zzqd       2/2     Running   0          2m41s
reviews-v3-7dbcdcbc56-m8dph       2/2     Running   0          2m41s

lucho@buzz:~/istio-1.15.0$ kubectl exec "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl -sS productpage:9080/productpage | grep -o "<title>.*</title>"
<title>Simple Bookstore App</title>


lucho@buzz:~/istio-1.15.0$ kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml # Permitir el traficpo externo al aplicativo
gateway.networking.istio.io/bookinfo-gateway created
virtualservice.networking.istio.io/bookinfo created

lucho@buzz:~/istio-1.15.0$ istioctl analyze
✔ No validation issues found when analyzing namespace: default.

lucho@buzz:~/istio-1.15.0$ minikube tunnel &
lucho@buzz:~/istio-1.15.0$ export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
lucho@buzz:~/istio-1.15.0$ export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
lucho@buzz:~/istio-1.15.0$ export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].port}')
lucho@buzz:~/istio-1.15.0$ export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT

lucho@buzz:~/istio-1.15.0$ kubectl apply -f samples/addons
serviceaccount/grafana created
configmap/grafana created
service/grafana created
deployment.apps/grafana created
configmap/istio-grafana-dashboards created
configmap/istio-services-grafana-dashboards created
deployment.apps/jaeger created
service/tracing created
service/zipkin created
service/jaeger-collector created
serviceaccount/kiali created
configmap/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrole.rbac.authorization.k8s.io/kiali created
clusterrolebinding.rbac.authorization.k8s.io/kiali created
role.rbac.authorization.k8s.io/kiali-controlplane created
rolebinding.rbac.authorization.k8s.io/kiali-controlplane created
service/kiali created
deployment.apps/kiali created
serviceaccount/prometheus created
configmap/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
service/prometheus created
deployment.apps/prometheus created

lucho@buzz:~/istio-1.15.0$ kubectl rollout status deployment/kiali -n istio-system
deployment "kiali" successfully rolled out

# Generar trafico en la app para visualizarlo en Kiali
lucho@buzz:~/istio-1.15.0$ for i in $(seq 1 100); do curl -s -o /dev/null "http://$GATEWAY_URL/productpage"; done
```

### Visualizando el trafico

En dicho ejemplo, se presentan varios microservicios que se comunican entre ellos, y cada uno cuenta con un Proxy de tipo sidecar, como se ha descrito previamente. Esto permite jugar con la gestión del tráfico, entre otros.

<center>
    <img src="https://miro.medium.com/max/630/1*KJNzT_diYFgy3C-3ZawKHg.png" alt="svc">
    <br>
    <hr>
    <img src="https://miro.medium.com/max/2160/1*zyBWiRRJ5UYcGIg1nWuWrA.png" alt="demo">
    <br>
    <hr>
    <img src="https://raw.githubusercontent.com/Lucho00Cuba/lucho00cuba.github.io/main/assets/images/k8s/istio.gif" alt="kiali">
</center>