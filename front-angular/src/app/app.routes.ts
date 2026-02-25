import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './features/layouts/public-layout/public-layout';
import { PanelLayoutComponent } from './features/layouts/panel-layout/panel-layout';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // === RUTAS PUBLICAS ===
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home/home').then(m => m.HomeComponent),
      },
      {
        path: 'tienda',
        loadComponent: () => import('./features/tienda/producto-list/producto-list').then(m => m.ProductoListComponent),
      },
      {
        path: 'tienda/categoria/:codCateg',
        loadComponent: () => import('./features/tienda/producto-list/producto-list').then(m => m.ProductoListComponent),
      },
      {
        path: 'tienda/producto/:codProd',
        loadComponent: () => import('./features/tienda/producto-detail/producto-detail').then(m => m.ProductoDetailComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart/cart').then(m => m.CartComponent),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./features/cart/checkout/checkout').then(m => m.CheckoutComponent),
      },
    ],
  },
  // === AUTH ===
  {
    path: 'auth',
    component: PublicLayoutComponent,
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.default),
  },
  // === ADMIN ===
  {
    path: 'admin',
    component: PanelLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      {
        path: 'resumen',
        loadComponent: () => import('./features/dashboard-admin/resumen/resumen').then(m => m.ResumenComponent),
      },
      {
        path: 'productos',
        loadComponent: () => import('./features/dashboard-admin/productos/productos').then(m => m.ProductosComponent),
      },
      {
        path: 'productos/nuevo',
        loadComponent: () => import('./features/dashboard-admin/productos/producto-form/producto-form').then(m => m.ProductoFormComponent),
      },
      {
        path: 'productos/editar/:codProd',
        loadComponent: () => import('./features/dashboard-admin/productos/producto-form/producto-form').then(m => m.ProductoFormComponent),
      },
      {
        path: 'categorias',
        loadComponent: () => import('./features/dashboard-admin/categorias/categorias').then(m => m.CategoriasComponent),
      },
      {
        path: 'colores',
        loadComponent: () => import('./features/dashboard-admin/colores/colores').then(m => m.ColoresComponent),
      },
      {
        path: 'ordenes',
        loadComponent: () => import('./features/dashboard-admin/ordenes/ordenes').then(m => m.OrdenesComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./features/dashboard-admin/usuarios/usuarios').then(m => m.UsuariosComponent),
      },
    ],
  },
  // === 404 ===
  {
    path: '**',
    loadComponent: () => import('./features/common/not-found/not-found').then(m => m.NotFoundComponent),
  },
];
