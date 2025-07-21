# 📋 TaskFlow - Gestión de Tareas Personales

Una aplicación web completa para gestionar tareas personales con backend en Node.js + Express y frontend en Angular 17.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** + **Express.js**
- **MySQL** (Railway)
- **Sequelize** (ORM)
- **CORS** para comunicación con frontend

### Frontend
- **Angular 17**
- **Angular Material** (UI Components)
- **TypeScript**
- **RxJS**

## 📁 Estructura del Proyecto

```
proyecto-pc3/
├── backend/           # API REST en Node.js
│   ├── index.js      # Servidor principal
│   ├── db.js         # Configuración MySQL directa
│   ├── sequelize.js  # Configuración Sequelize
│   ├── models/       # Modelos de datos
│   └── package.json  # Dependencias backend
├── frontend/         # Aplicación Angular
│   ├── src/          # Código fuente
│   ├── angular.json  # Configuración Angular
│   └── package.json  # Dependencias frontend
└── README.md         # Este archivo
```

## 🛠️ Instalación y Configuración

### Backend

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Configurar variables de entorno:**
   - Crear archivo `.env` o usar variables de Railway:
   ```
   DB_HOST=yamanote.proxy.rlwy.net
   DB_PORT=15124
   DB_USER=root
   DB_PASSWORD=YtbZJnwJjtCrYcfXSFuUQrcXSygLmpVV
   DB_NAME=railway
   PORT=3000
   ```

3. **Ejecutar servidor:**
   ```bash
   npm start
   ```

### Frontend

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configurar URL del backend:**
   - Editar `src/app/services/task.service.ts`
   - Cambiar `baseUrl` a la URL de tu backend en Railway

3. **Ejecutar aplicación:**
   ```bash
   ng serve
   ```

## 🌐 Despliegue en Railway

### Backend
1. Crear proyecto en Railway
2. Conectar repositorio GitHub
3. Agregar plugin MySQL
4. Configurar variables de entorno
5. Desplegar automáticamente

### Frontend
1. Configurar URL del backend desplegado
2. Desplegar en Railway o Vercel

## 📋 Funcionalidades

- ✅ **CRUD completo de tareas**
- ✅ **Interfaz moderna con Angular Material**
- ✅ **Persistencia en base de datos MySQL**
- ✅ **API REST robusta**
- ✅ **Manejo de errores**
- ✅ **Responsive design**

## 🔧 Endpoints API

- `GET /api/tareas` - Listar todas las tareas
- `POST /api/tareas` - Crear nueva tarea
- `PUT /api/tareas/:id` - Actualizar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea
- `GET /health` - Health check

## 📊 Estado del Proyecto

- ✅ Backend configurado y listo para Railway
- ✅ Frontend funcional con Angular Material
- ✅ Base de datos MySQL configurada
- ✅ API REST completa
- 🚧 Despliegue en Railway (en progreso)

## 🎯 Próximos Pasos

1. Desplegar backend en Railway
2. Configurar base de datos MySQL
3. Actualizar URL del backend en frontend
4. Desplegar frontend
5. Testing y optimización

---

**Desarrollado con ❤️ para gestión eficiente de tareas personales** 