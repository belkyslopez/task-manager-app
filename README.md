# 📱 Task Manager App

Aplicación móvil híbrida desarrollada con **Ionic + Angular + TypeScript** para la gestión de tareas.

Permite:
- 📋 Listar tareas
- 🔍 Ver el detalle de una tarea
- ➕ Crear nuevas tareas
- 🔄 Administrar el estado (Completada / Pendiente)

---

## 🚀 Pasos para correr el proyecto

### 1. Clonar el repositorio


```bash
git clone https://github.com/belkyslopez/task-manager-app.
cd task-manager-app
```

### 2. ** Instalar dependencias **
```bash
npm install
```
### 3. ** Ejecutar en entorno de desarrollo**
```bash
ionic serve
```
# ✅  Decisiones técnicas 

Se utilizó Ionic con Angular Standalone Components para simplificar la arquitectura.

Separación clara de responsabilidades:

## Pages
 para vistas principales

## Components
 reutilizables

## Services
 para lógica de negocio y consumo de API

## Consumo de API pública para obtener tareas:
```bash
https://jsonplaceholder.typicode.com/todos
```
# 📦  Librerías utilizadas

Ionic Framework – Componentes UI mobile

Angular – Framework frontend

TypeScript – Tipado estático

SCSS – Estilos personalizados

Ionicons – Iconografía

# 🛠️ Mejoras a implementar con más tiempo

✅ Filtros por estado (completadas / pendientes)

✅ Búsqueda de tareas por título

🔐 Autenticación de usuarios

🧪 Pruebas unitarias 

📱 Mejoras de accesibilidad
