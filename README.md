# Barbershop — Sistema de gestión de turnos

> ⚠️ **Proyecto en desarrollo activo.** La arquitectura, endpoints y features pueden cambiar.

Sistema web para la gestión de turnos de una barbería. Permite a los usuarios registrarse, confirmar su cuenta por email, iniciar sesión y reservar turnos. Los administradores pueden ver y gestionar todos los turnos activos.

---

## Stack tecnológico

### PERN Stack

| Capa | Tecnología | Versión |
|---|---|---|
| **P**ostgreSQL | Base de datos relacional | — |
| **E**xpress | Framework de servidor HTTP | ^5.2.1 |
| **R**eact | Librería de UI | ^19.2.0 |
| **N**ode.js | Runtime del servidor | — |

### Frontend adicional

| Tecnología | Uso | Versión |
|---|---|---|
| TypeScript | Tipado estático | ~5.9.3 |
| Vite | Bundler y dev server | ^7.2.4 |
| TailwindCSS | Estilos utilitarios | ^4.1.18 |
| React Router Dom | Navegación SPA | ^7.13.0 |
| React Hook Form | Manejo de formularios | ^7.71.1 |
| Axios | Cliente HTTP | ^1.13.4 |

### Backend adicional

| Tecnología | Uso | Versión |
|---|---|---|
| jsonwebtoken | Autenticación con JWT | ^9.0.3 |
| bcrypt | Hash de contraseñas | ^6.0.0 |
| cookie-parser | Lectura de cookies HTTP | ^1.4.6 |
| nodemailer | Envío de emails | ^7.0.13 |
| cloudinary | Gestión de imágenes | ^2.9.0 |
| dotenv | Variables de entorno | ^17.2.3 |
| nodemon | Hot reload en desarrollo | ^3.1.11 |

---

## Arquitectura general

```
barbershop-pern-stack/
├── backend/
│   ├── config/          # Conexión DB, Cloudinary, Mail
│   ├── controllers/     # Lógica de cada endpoint
│   ├── middleware/      # verifyToken, verifyRole
│   ├── repository/      # Queries SQL directas a PostgreSQL
│   ├── routes/          # Definición de rutas Express
│   └── index.js         # Entry point del servidor
│
└── frontend/
    └── src/
        ├── components/  # Componentes reutilizables
        ├── context/     # AuthContext (sesión global)
        ├── hooks/       # useDashboardUser, useDashboardAdmin
        ├── pages/       # Vistas principales
        ├── services/    # Llamadas HTTP con axios
        └── types/       # Interfaces TypeScript centralizadas
```

---

## Roles del sistema

| Rol | Acceso |
|---|---|
| `user` | Registro, login, ver y cancelar sus propios turnos |
| `admin` | Login, ver y cancelar todos los turnos activos |

---

## Autenticación

- Basada en **JWT almacenado en cookie `httpOnly`** (no accesible desde JavaScript)
- Al cargar la app el frontend llama a `GET /me` para restaurar la sesión desde la cookie
- La cookie tiene expiración de **7 días**
- La confirmación de cuenta se realiza por **email** con un token JWT de 1 hora

### Protección de rutas

**Frontend** — componente `VerifyAuth` y `useEffect` en cada panel:
- Sin sesión → redirige a `/`
- Role incorrecto → redirige al panel correspondiente

**Backend** — middlewares encadenados en cada ruta:
- `verifyToken` → valida el JWT de la cookie
- `verifyRole(role)` → valida que el role coincida con el endpoint

---

## Funcionalidades implementadas

### Usuarios
- [x] Registro con confirmación por email
- [x] Login con email **o** username
- [x] Logout
- [x] Dashboard con datos del perfil
- [x] Ver turnos activos propios
- [ ] Reservar turno *(en desarrollo)*
- [ ] Cancelar turno *(en desarrollo)*

### Administrador
- [x] Login
- [x] Dashboard
- [x] Ver todos los turnos activos
- [ ] Cancelar turno de cualquier usuario *(en desarrollo)*
- [ ] Gestión de servicios *(en desarrollo)*

---

## Variables de entorno

### Backend (`.env`)

```env
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
FRONTEND_URL=
NODE_ENV=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend (`.env`)

```env
VITE_API_URL=
```

---

## Correr el proyecto

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Futuras features

- [ ] **Testing unitario con Jest** en el backend (controllers y repositories)
- [ ] Paginación en el listado de turnos del admin
- [ ] Panel de gestión de servicios (CRUD)
- [ ] Notificaciones por email al reservar o cancelar un turno
- [ ] Historial de turnos cancelados
- [ ] Upload de foto de perfil con Cloudinary
