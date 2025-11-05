# TTT - To-Do (Prueba Técnica — Junior Developer)

**Proyecto:** To-Do list (Next.js + NestJS)  
**Autor:** <Andres Felipe Rossemberg Hernandez>  
** entregado como prueba técnica para Two To Tango (TTT).  

---

## Resumen (qué es este proyecto)

Aplicación simple de lista de tareas (To-Do) con:

- **Backend:** NestJS (API REST)  
- **Frontend:** Next.js (React + TypeScript)  
- **Documentación API:** Swagger (`/api/docs`)  
- **Funcionalidad:** Crear, listar, marcar completada y eliminar tareas.  
- **Estado:** MVP funcional local - almacenamiento en memoria (no persistente).

---

## Tecnologías

- Node.js, npm  
- TypeScript  
- NestJS (Backend)  
- Next.js (Frontend)  
- TailwindCSS (estilos)  
- Swagger (documentación API)

---

## Estructura del repositorio

ttt-todo-project/
├─ backend-nest/ # NestJS backend
│ ├─ src/
│ │ ├─ tasks/
│ │ │ ├─ dto/
│ │ │ ├─ tasks.controller.ts
│ │ │ ├─ tasks.service.ts
│ │ │ └─ task.interface.ts
│ │ └─ main.ts
│ └─ package.json
└─ frontend-next/ # NextJS frontend
├─ src/
│ ├─ app/
│ │ └─ page.tsx
│ ├─ components/
│ ├─ services/
│ └─ types/
└─ package.json

---

## Pre-requisitos (local)

- Node.js (v16+ recomendado)  
- npm (v8+ recomendado)  
- Git  
- (Opcional) `gh` CLI para crear repositorios desde terminal

---

## Cómo ejecutar localmente (rápido)

### 1. Backend (NestJS)

```bash
# desde la raíz del proyecto
cd backend-nest

# instalar dependencias
npm install

# ejecutar en modo desarrollo (hot-reload)
npm run start:dev
El backend quedará corriendo por defecto en: http://localhost:3001

Swagger: http://localhost:3001/api/docs


2. Frontend (NextJS)

En otra terminal:

Copiar código
cd frontend-next
npm install
npm run dev
El frontend corre en: http://localhost:3000

La app usa la variable NEXT_PUBLIC_API_URL. Por defecto busca http://localhost:3001.

Variables de entorno
frontend-next/.env.local

NEXT_PUBLIC_API_URL=http://localhost:3001 (valor por defecto, ya configurado en el proyecto)

No hay variables secretas en este MVP (no hay JWT ni DB). Si más adelante se agrega DB o JWT, se documentarán aquí.

Endpoints principales (resumen)
POST /tasks — Crear tarea (body: { title: string, description?: string })

GET /tasks — Listar todas las tareas

PUT /tasks/:id/complete — Marcar tarea como completada

DELETE /tasks/:id — Eliminar tarea

La documentación interactiva está en /api/docs.

Cómo probar manualmente

Levanta backend y frontend (ver arriba).

Abre Swagger: http://localhost:3001/api/docs y prueba los endpoints.

Abre UI: http://localhost:3000 — crea tareas, márcalas y elimínalas.

Decisiones de diseño y notas técnicas

MVP en memoria: Para entregar funcionalidad en el tiempo solicitado, el backend guarda datos en memoria (Task[]). Esto facilita el desarrollo y la prueba rápida. En producción, se reemplazaría por una base de datos (SQLite/Postgres) y migraciones (Prisma/TypeORM).

Validación: Usamos DTOs y class-validator en NestJS para validar los inputs en POST /tasks.

Documentación: @nestjs/swagger provee documentación interactiva en /api/docs.

Frontend: Next.js con Client Components para los formularios y hooks de React (useState, useEffect). La comunicación contra la API está centralizada en src/services/api.ts.

Estilos: TailwindCSS para estilos rápidos y responsive.

