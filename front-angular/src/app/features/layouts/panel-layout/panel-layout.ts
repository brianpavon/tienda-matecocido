import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="d-flex" style="min-height: 100vh">
      <!-- Sidebar -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <h4>Matecocido</h4>
          <small>Panel Admin</small>
        </div>
        <ul class="sidebar-nav">
          <li><a routerLink="/admin/resumen" routerLinkActive="active"><i class="pi pi-home"></i> Resumen</a></li>
          <li><a routerLink="/admin/productos" routerLinkActive="active"><i class="pi pi-box"></i> Productos</a></li>
          <li><a routerLink="/admin/categorias" routerLinkActive="active"><i class="pi pi-tags"></i> Categorias</a></li>
          <li><a routerLink="/admin/colores" routerLinkActive="active"><i class="pi pi-palette"></i> Colores</a></li>
          <li><a routerLink="/admin/ordenes" routerLinkActive="active"><i class="pi pi-shopping-cart"></i> Ordenes</a></li>
          <li><a routerLink="/admin/usuarios" routerLinkActive="active"><i class="pi pi-users"></i> Usuarios</a></li>
        </ul>
        <div class="sidebar-footer">
          <a routerLink="/" class="btn-back"><i class="pi pi-arrow-left"></i> Volver a la tienda</a>
          <button class="btn-logout" (click)="onLogout()"><i class="pi pi-sign-out"></i> Cerrar sesion</button>
        </div>
      </nav>

      <!-- Main content -->
      <div class="flex-grow-1 p-4">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: var(--text-dark, #3C2F1E);
      color: white;
      display: flex;
      flex-direction: column;
    }
    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      h4 { margin: 0; }
      small { opacity: 0.7; }
    }
    .sidebar-nav {
      list-style: none;
      padding: 0.5rem 0;
      margin: 0;
      flex: 1;
      li a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        transition: background 0.2s;
        &:hover, &.active {
          background: rgba(255,255,255,0.1);
          color: white;
        }
      }
    }
    .sidebar-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .btn-back {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      &:hover { color: white; }
    }
    .btn-logout {
      background: none;
      border: 1px solid rgba(255,255,255,0.3);
      color: rgba(255,255,255,0.8);
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      &:hover { background: rgba(255,255,255,0.1); color: white; }
    }
  `],
})
export class PanelLayoutComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => window.location.href = '/',
      error: () => {
        this.authService.clearSession();
        window.location.href = '/';
      },
    });
  }
}
