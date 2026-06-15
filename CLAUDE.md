# Tienda Matecocido

E-commerce de productos de ceramica artesanal. Backend Laravel 12 + Sanctum, frontend Angular 20 + PrimeNG.

**Stack**: PHP 8.2 + Laravel 12 + Sanctum + Eloquent + MySQL | Angular 20 + PrimeNG 20 + Bootstrap 5 | XAMPP local
**Structure**: `api/` (Laravel 12 backend), `front-angular/` (Angular 20 SPA), `db/` (SQL schema)

Para arquitectura detallada, ver [docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md).

## Roles del sistema

- **ADMIN**: Gestiona productos, categorias, colores, usuarios, ordenes
- **CLIENTE**: Navega tienda, agrega al carrito, compra

## Comandos

```bash
# Backend - instalar dependencias (usar PHP 8.2 explícito en este entorno)
cd api && /c/xampp8/php/php.exe "C:/ProgramData/ComposerSetup/bin/composer.phar" install

# Backend - iniciar servidor de desarrollo
cd api && /c/xampp8/php/php.exe artisan serve
# URL: http://127.0.0.1:8000

# Frontend Angular
cd front-angular && npm install && ng serve
# URL: http://localhost:4200

# Base de datos
# 1. Importar db/tienda-matecocido.sql (schema original)
# 2. Ejecutar db/migration-v2.sql (migracion: FKs, ordenes, bcrypt, etc.)
```

## Arquitectura Backend (api/)

- **Auth**: Laravel Sanctum (Bearer tokens), device-aware via X-Device-Id header
- **Respuestas**: ApiResponseTrait envelope `{success, message, content}`
- **Middleware**: ForceJsonResponse (prepend), CheckRole (alias `role`)
- **Modelos**: Usuario, Producto, Categoria, Color, ProductoImagen, DatosPersonales, Orden, DetalleOrden
- **Controllers**: Auth, Producto, Categoria, Color, Orden, Usuario, Health
- **Rutas**: 29 endpoints en routes/api.php (publicas, auth, cliente, admin)
- **Storage**: Imagenes en storage/app/public/imgs-productos/{codigo}/, symlink via artisan storage:link

## Arquitectura Frontend (front-angular/)

- **Angular 20**: Standalone components, lazy loading, change detection con Zone.js (`provideZoneChangeDetection` + eventCoalescing — NO es zoneless)
- **UI**: PrimeNG 20 (p-table, p-dialog, p-button, p-select, etc.) + Bootstrap 5 grid
- **Auth**: Interceptor inyecta Bearer token, guards protegen rutas admin
- **State**: AuthService + CartService (BehaviorSubject + localStorage)
- **Layouts**: PublicLayout (header+footer) y PanelLayout (sidebar admin)
- **Routing**: Lazy-loaded feature modules

## API Endpoints Principales

| Grupo | Endpoints |
|-------|-----------|
| Public | GET /health, GET /productos, GET /productos/{codigo}, GET /categorias, GET /colores |
| Auth | POST /auth/registro, POST /auth/login, POST /auth/logout, GET /auth/me, PUT /auth/cambiar-password |
| Cliente | POST /ordenes, GET /ordenes/mis-ordenes |
| Admin | CRUD /admin/productos, /admin/categorias, /admin/colores, GET/PATCH /admin/ordenes, GET/PATCH /admin/usuarios |
