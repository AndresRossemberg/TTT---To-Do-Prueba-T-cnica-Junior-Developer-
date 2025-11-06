# ☁️ PARTE TEÓRICA: Cloud, DevOps y Arquitectura

Este documento contiene las respuestas a la sección teórica de la prueba, cubriendo nociones de despliegue, almacenamiento en la nube y herramientas autogestionadas.

---

## 1. Despliegue de la API (NestJS) en AWS o GCP

La estrategia ideal es usar **contenedores** (Docker) y servicios sin servidor (Serverless Container) para lograr eficiencia en costos y alta escalabilidad.

### Opción Recomendada: Google Cloud Run (GCP) o AWS Fargate (AWS)

* **Contenerización:** Se empaqueta la aplicación NestJS en una imagen de Docker.
* **Servicio Serverless:** Se despliega el contenedor en Cloud Run (GCP) o Fargate (AWS), que gestionan la infraestructura subyacente.
* **Escalabilidad:** Escala automáticamente a cero si no hay tráfico y solo se paga por el tiempo de ejecución de la solicitud.
* **Base de Datos:** Para producción, la base de datos se migraría de SQLite a un servicio administrado (como Cloud SQL o AWS RDS) para asegurar la persistencia y concurrencia.

---

## 2. Beneficios de Usar S3 / Cloud Storage para Archivos Estáticos

El almacenamiento de objetos es la solución estándar para archivos estáticos (imágenes, adjuntos) debido a su escalabilidad y eficiencia.

* **Escalabilidad Ilimitada:** Ofrecen capacidad de almacenamiento casi infinita sin preocuparse por el disco del servidor.
* **Descarga de Carga:** El servidor NestJS se libera de la tarea de manejar y servir archivos grandes, enfocándose solo en la lógica de la API.
* **Durabilidad y Respaldo:** Proporcionan alta durabilidad (99.999999999%) y redundancia automática.
* **Acceso Global:** Facilitan la integración con Redes de Entrega de Contenido (CDN) para un acceso rápido a los archivos a nivel mundial.
* **Implementación:** La API solo guarda la URL pública del archivo en la base de datos, no el archivo en sí.

---

## 3. Nextcloud: Propósito y Montaje

Nextcloud es una plataforma de código abierto que permite crear una nube privada y autogestionada.

* **Propósito:** Es una alternativa a Google Drive o Dropbox, enfocada en la colaboración, almacenamiento y sincronización de archivos con **control total sobre los datos**.
* **Montaje:** Se implementaría en una máquina virtual (AWS EC2 o GCP Compute Engine) utilizando Docker Compose, con una base de datos externa (PostgreSQL o MySQL).
* **Beneficio Clave:** La **privacidad y la soberanía de los datos**. Es utilizado por organizaciones que necesitan cumplir regulaciones estrictas y no desean alojar datos sensibles en nubes públicas de terceros.