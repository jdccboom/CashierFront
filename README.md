# 📋 Prueba Técnica - Gestión de Usuarios

Sistema web de gestión de usuarios desarrollado en Angular con arquitectura hexagonal y Domain-Driven Design (DDD).

## 🎯 Descripción

Aplicación web que permite a usuarios con diferentes roles (Administrador y Cajero) gestionar usuarios del sistema. Los administradores tienen acceso completo (CRUD) mientras que los cajeros solo pueden visualizar la información.

## 🛠️ Tecnologías Utilizadas

- **Framework**: Angular 17+
- **Lenguaje**: TypeScript
- **Arquitectura**: Hexagonal + DDD
- **Guards**: Functional Route Guards
- **Formularios**: Reactive Forms
- **Routing**: Angular Router
- **Storage**: LocalStorage
- **Testing**: Jasmine + Karma
- **Estilos**: CSS/SCSS (Framework CSS opcional)

## 🏗️ Arquitectura del Proyecto

```
src/app/
├── config/                     # Configuraciones y providers
├── domain/                     # Capa de Dominio
│   ├── use-cases/             # Casos de uso de la aplicación
│   └── models/                # Modelos de dominio
│       └── class/
│           ├── gateway/       # Interfaces (puertos)
│           └── *.class.ts     # Entidades y value objects
├── infrastructure/            # Capa de Infraestructura
│   ├── drivers-adapters/      # Adaptadores (servicios, guards)
│   └── helpers/               # Utilidades y helpers
└── UI/                        # Capa de Presentación
    ├── components/            # Componentes reutilizables
    ├── pages/                 # Páginas de la aplicación
    └── shared/                # Módulos compartidos
```

## ⚡ Instalación y Configuración

### Prerrequisitos
- Node.js (v18+)
- npm o yarn
- Angular CLI

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd prueba-tecnica-front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
ng serve
```

4. **Acceder a la aplicación**
```
http://localhost:4200
```

## 🔐 Credenciales de Acceso

### Administrador
- **Usuario**: `Admin`
- **Contraseña**: `LealAdmin`
- **Acceso**: Dashboard completo con CRUD de usuarios

### Cajero
- **Usuario**: `Cajero`
- **Contraseña**: `LealCajero`
- **Acceso**: Solo visualización de usuarios

## 🚀 Características Implementadas

### ✅ Funcionalidades Principales

- **Autenticación**: Sistema de login con validación mock
- **Autorización**: Guards basados en roles y permisos
- **CRUD Usuarios**: Crear, leer, actualizar y eliminar usuarios (solo Admin)
- **Visualización**: Lista y contador de usuarios para ambos roles
- **Persistencia**: Datos almacenados en LocalStorage
- **Navegación protegida**: Rutas protegidas según rol

### ✅ Componentes Desarrollados

- `app-table-user`: Tabla de usuarios con acciones según rol
- `app-count-user`: Contador de usuarios registrados
- `app-user-form`: Formulario reactivo para crear/editar usuarios
- Login: Página de autenticación
- Dashboard Admin: Panel completo de administración
- Dashboard Cajero: Panel de solo lectura

### ✅ Características Técnicas

- **Arquitectura Hexagonal**: Separación clara de capas
- **DDD**: Modelos de dominio con lógica de negocio
- **Functional Guards**: Guards modernos de Angular
- **Reactive Forms**: Validación robusta de formularios
- **Observable Patterns**: Manejo reactivo de estado
- **Error Handling**: Gestión centralizada de errores

## 📱 Rutas de la Aplicación

```
/                           → Redirect a /login
/login                      → Página de autenticación
/dashboard/admin            → Panel de administrador (CRUD)
/dashboard/cajero           → Panel de cajero (solo lectura)
/**                         → Redirect a /login
```

## 🧪 Testing

### Ejecutar pruebas
```bash
# Pruebas unitarias
ng test

# Pruebas con coverage
ng test --code-coverage

# Generar reporte de coverage
ng test --watch=false --browsers=ChromeHeadless --code-coverage
```

### Coverage Objetivo
- **Mínimo requerido**: 85%
- **Cobertura incluye**:
  - Servicios y Use Cases
  - Componentes
  - Guards
  - Helpers

## 📊 Estructura de Datos

### Usuario
```typescript
interface User {
  id: number;
  names: string;
  surnames: string;
  accumulatePoints: number;
  userActive: boolean;
}
```

### Roles y Permisos
```typescript
enum UserRole {
  ADMIN = 'admin',
  CAJERO = 'cajero'
}

enum Permission {
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users'
}
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
ng serve                          # Servidor de desarrollo
ng build                          # Build de producción
ng test                           # Ejecutar tests
ng lint                           # Linting del código

# Generación de código
ng generate component [name]      # Crear componente
ng generate service [name]        # Crear servicio
ng generate guard [name]          # Crear guard

# Testing
ng test --watch=false            # Tests sin watch
ng test --code-coverage          # Tests con coverage
```

## 📋 Datos Mock Iniciales

El sistema incluye 5 usuarios de prueba:
- Juan Carlos Pérez García (1250 pts, activo)
- María Elena Rodríguez López (850 pts, activo)
- Carlos Alberto Martínez Silva (2100 pts, inactivo)
- Ana Sofía González Vargas (675 pts, activo)
- Luis Fernando Hernández Castro (1800 pts, activo)

## 🎨 Puntos Opcionales Implementados

- [ ] Integración con Stencil.js
- [ ] Framework CSS (Bootstrap/Tailwind/Materialize)

## 📝 Consideraciones de Desarrollo

### Principios Aplicados
- **SOLID**: Principios de desarrollo limpio
- **DRY**: No repetir código
- **KISS**: Mantener simplicidad
- **Clean Code**: Código legible y mantenible

### Patrones Utilizados
- **Repository Pattern**: Abstracción de acceso a datos
- **Use Case Pattern**: Encapsulación de lógica de negocio
- **Observer Pattern**: Comunicación reactiva con RxJS
- **Guard Pattern**: Protección de rutas

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de dependencias**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Puerto ocupado**
```bash
ng serve --port 4201
```

3. **Limpiar LocalStorage**
```javascript
// En DevTools Console
localStorage.clear();
```

## 👨‍💻 Autor

Desarrollado como parte de la Prueba Técnica Frontend para Leal.

---

## 📄 Licencia

Este proyecto es de uso académico/técnico para evaluación.