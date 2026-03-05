import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="panel-wrapper">
      <!-- Mobile topbar -->
      <div class="mobile-topbar d-md-none">
        <button class="toggle-btn" (click)="toggleSidebar()">
          <i class="pi pi-bars"></i>
        </button>
        <span class="topbar-title">Matecocido Admin</span>
      </div>

      <!-- Backdrop -->
      @if (sidebarOpen()) {
        <div class="backdrop d-md-none" (click)="closeSidebar()"></div>
      }

      <!-- Sidebar -->
      <nav class="sidebar" [class.open]="sidebarOpen()">
        <div class="sidebar-header">
          <h4>Matecocido</h4>
          <small>Panel Admin</small>
        </div>
        <ul class="sidebar-nav">
          <li><a routerLink="/admin/resumen" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-home"></i> Resumen</a></li>
          <li><a routerLink="/admin/productos" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-box"></i> Productos</a></li>
          <li><a routerLink="/admin/categorias" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-tags"></i> Categorias</a></li>
          <li><a routerLink="/admin/colores" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-palette"></i> Colores</a></li>
          <li><a routerLink="/admin/ordenes" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-shopping-cart"></i> Ordenes</a></li>
          <li><a routerLink="/admin/usuarios" routerLinkActive="active" (click)="closeSidebar()"><i class="pi pi-users"></i> Usuarios</a></li>
        </ul>
        <div class="sidebar-footer">
          <a routerLink="/" class="btn-back"><i class="pi pi-arrow-left"></i> Volver a la tienda</a>
          <button class="btn-logout" (click)="onLogout()"><i class="pi pi-sign-out"></i> Cerrar sesion</button>
        </div>
      </nav>

      <!-- Main content -->
      <div class="panel-content">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .panel-wrapper {
      display: flex;
      min-height: 100vh;
    }
    .mobile-topbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: var(--text-dark, #3C2F1E);
      color: white;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0 1rem;
      z-index: 1001;
    }
    .toggle-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.25rem;
      cursor: pointer;
    }
    .topbar-title {
      font-weight: 600;
      font-size: 1rem;
    }
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1002;
    }
    .sidebar {
      width: 250px;
      background: var(--text-dark, #3C2F1E);
      color: white;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
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
    .panel-content {
      flex: 1;
      padding: 1.5rem;
      min-width: 0;
    }

    @media (max-width: 767.98px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: -250px;
        bottom: 0;
        z-index: 1003;
        transition: left 0.3s ease;
        &.open { left: 0; }
      }
      .panel-content {
        padding-top: 66px;
      }
    }
    @media (min-width: 768px) {
      .mobile-topbar { display: none !important; }
    }
  `],
})
export class PanelLayoutComponent {
  sidebarOpen = signal(false);

  constructor(private authService: AuthService) {}

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

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
