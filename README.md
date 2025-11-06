# TTT - To-Do List (Prueba Técnica — Junior Developer)

**Proyecto:** Aplicación Full-Stack de lista de tareas persistente (To-Do)
**Autor:** <Andres Felipe Rossemberg Hernandez>
**Estado:** Funcional completo (Persistencia con SQLite)

---

## Resumen del Proyecto

Aplicación simple de lista de tareas (To-Do) con un enfoque en la arquitectura moderna Full-Stack y **persistencia de datos**.

* **Backend:** NestJS (API REST) con **Prisma ORM** y **SQLite**.
* **Frontend:** Next.js (React + TypeScript) con validación local y manejo de errores de API.
* **Funcionalidad:** Crear, listar, marcar completada (PATCH) y eliminar tareas.
* **Valor Añadido:** Se migró el almacenamiento de memoria a una **Base de Datos SQLite persistente**.

---

## Tecnologías Actualizadas

| Componente | Herramienta | Notas de Implementación |
| :--- | :--- | :--- |
| **Backend** | NestJS, TypeScript, **Prisma** | Migración de datos, ORM para consultas seguras. |
| **Base de Datos** | **SQLite** | Almacenamiento local persistente (`dev.db`). |
| **Frontend** | Next.js, React, TypeScript | Comunicación centralizada con la API. |
| **Estilos** | TailwindCSS | Estilos rápidos y responsive. |
| **Documentación** | Swagger | Disponible en `/api/docs`. |

---

##  Estructura del Repositorio

El proyecto mantiene una estructura modular Full-Stack, separando el backend, el frontend y la configuración de persistencia:

````
ttt-todo-project/
├─ backend-nest/           # Servidor NestJS (API REST)
│  ├─ prisma/               # Archivos de Schema y Migraciones de Prisma
│  │  ├─ migrations/         # Historial de cambios de la DB
│  │  └─ schema.prisma       # Definición del modelo Task (Int ID)
│  ├─ src/
│  │  ├─ prisma/             # PrismaService inyectable
│  │  └─ tasks/              # Módulo principal de Tareas (Controller, Service, DTOs)
│  └─ dev.db                # Base de datos SQLite (ignorada por Git)
└─ frontend-next/          # Aplicación NextJS (React)
   ├─ src/
   │  ├─ components/         # Componentes React (TaskForm, TaskList)
   │  ├─ services/           # Lógica de comunicación API (Manejo de errores HTTP)
   │  └─ types/              # Definiciones de tipos (Task ID: number)
   └─ .env.local            # Variables de entorno públicas (NEXT_PUBLIC_API_URL)
````

---

## Cómo Ejecutar Localmente (Rápido)

### 1. Backend (NestJS + Prisma/SQLite)

El backend usa ahora una base de datos persistente. Es crucial ejecutar la migración al inicio.

```bash
# 1. Desde la raíz del proyecto, entrar al backend
cd backend-nest

# 2. Instalar dependencias
npm install

# 3. EJECUTAR MIGRACIÓN Y CREAR BASE DE DATOS (Necesario para la persistencia)
npm run prisma:migrate -- --name init_db_with_int_id

# 4. Ejecutar en modo desarrollo
npm run start:dev

Servidor API: http://localhost:3001 Swagger: http://localhost:3001/api/docs

2. Frontend (NextJS)
En una segunda terminal:

# 1. Desde la raíz del proyecto, entrar al frontend
cd frontend-next

# 2. Instalar dependencias
npm install

# 3. Ejecutar la aplicación
npm run dev

Aplicación UI: http://localhost:3000

Notas Técnicas y Decisiones de Diseño

Persistencia y ORM

Migración Exitosa: Se reemplazó el almacenamiento en memoria por SQLite utilizando Prisma ORM. Esto asegura que las tareas persistan entre reinicios del servidor.

Tipo de ID: Se cambió el ID de la tabla Task de UUID (String) a un ID numérico autoincrementable (Int) para optimizar el rendimiento y mejorar la práctica del Frontend.

Frontend y UX

Validación de Formulario: Se implementó la validación del campo Título en el Frontend (código del cliente) y un manejo robusto de errores 400 Bad Request del servidor.

Manejo de Errores HTTP: Las funciones de API (services/api.ts) ahora capturan errores HTTP (4xx, 5xx) y los lanzan con el cuerpo del mensaje del servidor, lo que permite mostrar la razón de la falla de forma clara en el formulario.

Corrección de Endpoint: Se corrigió el método HTTP para la acción de completar de PUT a PATCH (/tasks/:id/complete), según la convención RESTful.

Endpoints Principales (Actualizados)

Método,    Endpoint,      Descripción
POST,/     tasks,         "Crear tarea (body: { title: string, description?: string })"
GET,/      tasks,         Listar todas las tareas (persistentes).
PATCH,/    tasks/:id/     complete,Marcar tarea como completada (Método corregido).
DELETE,/   tasks/:id,     Eliminar tarea.
