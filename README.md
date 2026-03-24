# Barbershop — Sistema de gestión de turnos

Sistema web para la gestión de turnos de una barbería. Permite a los usuarios registrarse con foto de perfil, confirmar su cuenta por email, iniciar sesión, reservar turnos y cancelarlos. Los administradores pueden gestionar turnos y servicios desde su panel.

---

## Stack tecnológico

### PERN Stack

| Capa | Tecnología | Versión |
|---|---|---|
| **P**ostgreSQL | Base de datos relacional | 20 |
| **E**xpress | Framework de servidor HTTP | ^5.2.1 |
| **R**eact | Librería de UI | ^19.2.0 |
| **N**ode.js | Runtime del servidor | 22 |

### Frontend adicional

| Tecnología | Uso | Versión |
|---|---|---|
| TypeScript | Tipado estático | ~5.9.3 |
| Vite | Bundler y dev server | ^7.2.4 |
| TailwindCSS | Estilos utilitarios | ^4.1.18 |
| React Router Dom | Navegación SPA | ^7.13.0 |
| React Hook Form | Manejo de formularios | ^7.71.1 |
| Axios | Cliente HTTP | ^1.13.4 |
| SweetAlert2 | Alertas y confirmaciones | ^11.26.24 |
| React Loader Spinner | Indicadores de carga | ^8.0.2 |
| Bootstrap Icons | Iconografía | ^1.13.1 |

### Backend adicional

| Tecnología | Uso | Versión |
|---|---|---|
| jsonwebtoken | Autenticación con JWT | ^9.0.3 |
| bcrypt | Hash de contraseñas | ^6.0.0 |
| cookie-parser | Lectura de cookies HTTP | ^1.4.6 |
| nodemailer | Envío de emails | ^7.0.13 |
| cloudinary | Gestión de imágenes | ^2.9.0 |
| multer | Subida de archivos | ^2.1.1 |
| dotenv | Variables de entorno | ^17.2.3 |
| nodemon | Hot reload en desarrollo | ^3.1.11 |

---

## Arquitectura general

```
turnero-pern/
├── backend/
│   ├── config/          # Conexión DB, Cloudinary, Nodemailer
│   ├── controllers/     # Lógica de cada endpoint
│   ├── middleware/      # verifyToken, verifyRole, multer
│   ├── repository/      # Queries SQL directas a PostgreSQL
│   ├── routes/          # Definición de rutas Express
│   └── index.js         # Entry point del servidor
│
└── frontend/
    └── src/
        ├── components/  # Componentes reutilizables (layout y ui)
        ├── context/     # AuthContext, TurnContext, ServiceContext
        ├── hooks/       # useAuth, useDashboardUser, useDashboardAdmin, useTurns, useServices
        ├── pages/       # Vistas principales
        ├── services/    # Llamadas HTTP con axios
        ├── types/       # Interfaces TypeScript centralizadas
        └── utils/       # Funciones utilitarias (formatTurn)
```

### Diagrama de arquitectura

```mermaid
graph TB
    subgraph Frontend["Frontend (React + TypeScript + Vite)"]
        Pages["Páginas\n(Home, UserPanel, AdminPanel,\nNewTurn, RegisterUser, LoginUser, LoginAdmin)"]
        Ctx["Contextos\n(AuthContext, TurnContext, ServiceContext)"]
        Hooks["Hooks\n(useAuth, useTurns, useServices,\nuseDashboardUser, useDashboardAdmin)"]
        SVCs["Servicios HTTP\n(authService, turnService, serviceService)"]
        Pages --> Ctx --> Hooks --> SVCs
    end

    subgraph Backend["Backend (Node.js + Express)"]
        Routes["Rutas\n(/auth, /user, /turn, /admin, /services)"]
        MW["Middlewares\n(verifyToken, verifyRole, multer)"]
        Controllers["Controladores\n(auth, user, turn, admin, services)"]
        Repos["Repositorios\n(user, turn, admin, services)"]
        Routes --> MW --> Controllers --> Repos
    end

    subgraph Externos["Servicios externos"]
        PG[(PostgreSQL)]
        Cloud[Cloudinary]
        Mail[Gmail SMTP]
    end

    SVCs -- "HTTP + Cookie JWT" --> Routes
    Repos --> PG
    Controllers --> Cloud
    Controllers --> Mail
```

---

## Roles del sistema

| Rol | Acceso |
|---|---|
| `user` | Registro, login, reservar, ver y cancelar sus propios turnos |
| `admin` | Login, ver todos los turnos activos, gestión de servicios |

---

## Autenticación

- Basada en **JWT almacenado en cookie `httpOnly`** (no accesible desde JavaScript)
- Al cargar la app, el frontend llama a `GET /me` para restaurar la sesión desde la cookie
- La cookie de sesión expira en **7 días**
- La confirmación de cuenta se realiza por **email** con un token JWT de **1 hora**

### Flujo de autenticación

```mermaid
sequenceDiagram
    participant U as Usuario / Admin
    participant FE as Frontend
    participant BE as Backend
    participant DB as PostgreSQL
    participant Mailer as Gmail SMTP

    Note over FE,BE: Registro de usuario
    U->>FE: Completa formulario + foto
    FE->>BE: POST /registerUser (multipart/form-data)
    BE->>BE: Hash contraseña (bcrypt)
    BE->>DB: INSERT usuario (is_confirmed=false)
    BE->>Mailer: Envía email con token JWT (1h)
    BE-->>FE: 200 OK

    Note over FE,BE: Confirmación de cuenta
    U->>FE: Click en link del email
    FE->>BE: GET /confirmRegister/:token
    BE->>DB: UPDATE is_confirmed=true
    BE-->>FE: 200 OK

    Note over FE,BE: Login y restauración de sesión
    U->>FE: Email + contraseña
    FE->>BE: POST /loginUser
    BE->>DB: SELECT usuario por email
    BE->>BE: Verifica contraseña (bcrypt)
    BE-->>FE: Set-Cookie JWT (httpOnly, 7 días)
    FE->>BE: GET /me (cookie automática)
    BE-->>FE: { id, role }
```

### Protección de rutas

**Frontend** — componente `VerifyAuth` y `useEffect` en cada panel:
- Sin sesión → redirige a `/`
- Role incorrecto → redirige al panel correspondiente

**Backend** — middlewares encadenados en cada ruta:
- `verifyToken` → valida el JWT de la cookie
- `verifyRole(role)` → valida que el role coincida con el endpoint requerido

---

## Endpoints

### Auth

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| `GET` | `/me` | Restaura sesión desde la cookie | `verifyToken` |

### Usuarios

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| `POST` | `/registerUser` | Registra un usuario con foto de perfil (multipart/form-data) | Pública |
| `GET` | `/confirmRegister/:token` | Confirma el registro por email | Pública |
| `POST` | `/loginUser` | Inicia sesión del usuario | Pública |
| `POST` | `/logout` | Cierra sesión y limpia la cookie | Pública |
| `GET` | `/dashboardUser` | Devuelve los datos del perfil del usuario | `verifyToken` |

### Administrador

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| `POST` | `/loginAdmin` | Inicia sesión del administrador (username + password) | Pública |
| `GET` | `/dashboardAdmin` | Devuelve los datos del admin | `verifyToken` + `verifyRole("admin")` |

### Turnos

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| `POST` | `/newTurn` | Crea un nuevo turno | `verifyToken` + `verifyRole("user")` |
| `GET` | `/userTurns` | Lista todos los turnos del usuario (activos e historial) | `verifyToken` + `verifyRole("user")` |
| `GET` | `/activeTurn` | Devuelve el próximo turno activo del usuario | `verifyToken` + `verifyRole("user")` |
| `GET` | `/adminTurns` | Lista todos los turnos activos con datos del usuario | `verifyToken` + `verifyRole("admin")` |
| `PATCH` | `/cancelTurnByUser/:turnId` | Cancela el turno del usuario y notifica al admin por email | `verifyToken` + `verifyRole("user")` |

### Servicios

| Método | Ruta | Descripción | Protección |
|---|---|---|---|
| `GET` | `/services` | Lista todos los servicios activos | `verifyToken` |
| `POST` | `/services` | Crea un nuevo servicio | `verifyToken` + `verifyRole("admin")` |
| `DELETE` | `/services/:id` | Elimina un servicio (soft delete) | `verifyToken` + `verifyRole("admin")` |

### Validaciones al crear un turno

- La fecha debe ser **posterior a hoy**
- El horario debe estar entre **08:00 y 18:00**
- El usuario no puede tener **más de un turno activo** a la vez
- El slot de fecha y hora no puede estar **ya reservado**

---

## Rutas del Frontend

| Ruta | Componente | Acceso |
|---|---|---|
| `/` | `Landing` | Pública |
| `/ingreso-usuario` | `LoginUser` | Pública |
| `/registro-usuario` | `RegisterUser` | Pública |
| `/confirmar/:token` | `ConfirmedUser` | Pública |
| `/ingreso-admin` | `LoginAdmin` | Pública |
| `/panel-usuario` | `UserPanel` | Protegida (`user`) |
| `/panel-admin` | `AdminPanel` | Protegida (`admin`) |
| `/nuevo-turno` | `NewTurn` | Protegida (`user`) |

---

## Flujo de turnos

```mermaid
flowchart TD
    A([Usuario autenticado]) --> B[/panel-usuario/]
    B --> C{¿Tiene turno activo?}
    C -- Sí --> D[Muestra ActiveTurn\nfecha, hora, servicio]
    C -- No --> E[Muestra botón Nuevo Turno]
    D --> F{¿Cancelar turno?}
    F -- Confirmar --> G[PATCH /cancelTurnByUser/:id]
    G --> H[Email de notificación al admin]
    G --> I[state = cancelled]
    E --> J[/nuevo-turno/]
    J --> K[Selecciona fecha, hora, servicio]
    K --> L[POST /newTurn]
    L --> M{Validaciones}
    M -- Fecha pasada --> N[❌ Error]
    M -- Turno ya activo --> N
    M -- Horario ocupado --> N
    M -- OK --> O[✅ Turno creado]
    O --> B
```

---

## Funcionalidades implementadas

### Usuarios
- [x] Registro con foto de perfil (subida a Cloudinary) y confirmación por email
- [x] Login con email y contraseña
- [x] Logout
- [x] Dashboard con datos del perfil (nombre, apellido, email, teléfono, foto)
- [x] Reservar turno (con validación de fecha futura, horario y turno activo único)
- [x] Ver turno activo (próximo turno reservado)
- [x] Ver historial de todos los turnos propios
- [x] Cancelar turno activo (con notificación por email al admin)

### Administrador
- [x] Login con username y contraseña
- [x] Dashboard con datos del admin
- [x] Ver todos los turnos activos (con datos del usuario: nombre, apellido, teléfono, foto)
- [x] Crear servicios (nombre, descripción, duración, precio)
- [x] Listar servicios activos
- [x] Eliminar servicios (soft delete)

---

## Componentes principales

### Layout
| Componente | Descripción |
|---|---|
| `Header` | Navegación fija con logo, links y botones de auth; menú hamburguesa responsive |
| `Landing` | Wrapper que combina `Header` + `Home` |
| `HeaderDashboardUser` | Cabecera del panel de usuario con foto, nombre, botones de editar y logout |
| `HeaderDashboardAdmin` | Sidebar del admin con 3 opciones de navegación y logout |
| `ActiveTurn` | Muestra el próximo turno activo con fecha formateada y botón de cancelación |
| `UserTurns` | Lista el historial de turnos del usuario |
| `AdminTurnCard` | Card de turno para el admin con foto del usuario, servicio, fecha y notas |
| `ServiceCard` | Card de servicio con nombre, descripción, duración, precio y botón de eliminar |

### Auth
| Componente | Descripción |
|---|---|
| `VerifyAuth` | Guard de ruta; valida el token y redirige a home si no está autenticado |

### UI
| Componente | Descripción |
|---|---|
| `Loader` | Spinner de carga |
| `GoBack` | Botón de retroceso |
| `NewTurnBtn` | Botón para ir a crear un nuevo turno |

---

## Types principales (TypeScript)

### `auth.types.ts`

| Interface | Descripción |
|---|---|
| `RegisterUserData` | Datos del formulario de registro: `name`, `surname`, `email`, `password`, `phone`, `photo: FileList` |
| `LoginUserData` | Datos del login de usuario: `email`, `password` |
| `LoginAdminData` | Datos del login de admin: `username`, `password` |
| `Session` | Sesión en contexto: `{ id, role }` |
| `User` | Datos del perfil del usuario en el dashboard: `id`, `role?`, `name?`, `surname?`, `phone?`, `email?`, `photo?` |
| `Admin` | Datos del admin en el dashboard: `id`, `role` |
| `RegisterUserResponse` | Respuesta de `POST /registerUser` |
| `LoginUserResponse` | Respuesta de `POST /loginUser` |
| `LoginAdminResponse` | Respuesta de `POST /loginAdmin` |
| `DashboardUserResponse` | Respuesta de `GET /dashboardUser` |
| `DashboardAdminResponse` | Respuesta de `GET /dashboardAdmin` |

### `turns.types.ts`

| Interface | Descripción |
|---|---|
| `TurnsUser` | Turno del usuario: `id`, `date_turn`, `time_turn`, `notes`, `cancel_reason`, `service_name` |
| `TurnsAdmin` | Extiende `TurnsUser` con: `user_name`, `user_surname`, `user_phone`, `user_photo` |
| `ActiveTurn` | Próximo turno activo del usuario: `id`, `date_turn`, `time_turn`, `notes`, `service_name` |
| `NewTurnData` | Datos para crear un turno: `date`, `time`, `service: number`, `notes?` |
| `NewTurnResponse` | Respuesta de `POST /newTurn` |
| `ActiveTurnProps` | Props del componente `ActiveTurn` |
| `AdminTurnProps` | Props del componente `AdminTurnCard` |

### `services.types.ts`

| Interface | Descripción |
|---|---|
| `Service` | Servicio: `id`, `name`, `description`, `duration`, `price` |
| `NewServiceData` | Datos para crear un servicio: `name`, `description`, `duration`, `price` |
| `ServicesResponse` | Respuesta de `GET /services` |
| `NewServiceResponse` | Respuesta de `POST /services` |
| `ServiceDeleteResponse` | Respuesta de `DELETE /services/:id` |

### `ui.state.ts`

| Type / Interface | Descripción |
|---|---|
| `LoadingState` | Estados de carga por operación: `register`, `login`, `dashboard`, `confirm`, `adminTurns`, `userTurns`, `createTurn`, `createService`, `fetchServices`, `cancelTurnByUser` |
| `AdminPanelView` | Union type para las vistas del panel admin: `"turns" \| "services" \| "newService"` |
| `HeaderDashboardAdminProps` | Props del header del admin: `selected: AdminPanelView` y `onSelect` para cambiar la vista |

---

## Utilidades

### `formatTurn.ts`

| Función | Descripción |
|---|---|
| `formatTime(timeStr)` | Convierte `"HH:MM"` a formato localizado (es-AR), ej: `"10:00 a. m."` |
| `formatDateShort(dateStr)` | Formatea a `"Lun, 24 mar"` (es-AR) |
| `formatDateLong(dateStr)` | Formatea a `"lunes, 24 de marzo"` (es-AR) |

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
EMAIL_PASSWORD=
EMAIL_ADMIN=
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

- [ ] Cancelar turno por parte del admin
- [ ] Notificación por email al usuario al reservar un turno
- [ ] Paginación en el listado de turnos del admin
- [ ] Testing unitario en el backend (controllers y repositories)
