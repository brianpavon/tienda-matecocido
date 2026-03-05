import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CategoriasService } from '../../../core/services/categorias.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  template: `
    <header class="header">
      <div class="container d-flex justify-content-between align-items-center py-3">
        <a routerLink="/" class="logo">Matecocido</a>

        <!-- Hamburger button (mobile only) -->
        <button class="hamburger d-md-none" (click)="toggleMenu()">
          <i class="pi" [class.pi-bars]="!menuOpen()" [class.pi-times]="menuOpen()"></i>
        </button>

        <!-- Desktop nav -->
        <nav class="desktop-nav d-none d-md-flex align-items-center gap-3">
          <a routerLink="/tienda" routerLinkActive="active">Tienda</a>
          @for (cat of categorias; track cat.id_categ) {
            <a [routerLink]="['/tienda/categoria', cat.codigo]" routerLinkActive="active">{{ cat.nombre }}</a>
          }
        </nav>

        <!-- Desktop actions -->
        <div class="desktop-actions d-none d-md-flex align-items-center gap-3">
          <a routerLink="/cart" class="cart-link">
            <i class="pi pi-shopping-cart"></i>
            @if ((totalItems$ | async); as total) {
              <span class="badge">{{ total }}</span>
            }
          </a>

          @if (isAuthenticated$ | async) {
            @if (userRole === 'ADMIN') {
              <a routerLink="/admin" class="btn-admin">Admin</a>
            }
            <button class="btn-logout" (click)="onLogout()">Salir</button>
          } @else {
            <a routerLink="/auth/login" class="btn-login">Ingresar</a>
          }
        </div>
      </div>

      <!-- Mobile menu overlay -->
      @if (menuOpen()) {
        <div class="mobile-menu d-md-none">
          <nav class="d-flex flex-column gap-2 mb-3">
            <a routerLink="/tienda" routerLinkActive="active" (click)="closeMenu()">Tienda</a>
            @for (cat of categorias; track cat.id_categ) {
              <a [routerLink]="['/tienda/categoria', cat.codigo]" routerLinkActive="active" (click)="closeMenu()">{{ cat.nombre }}</a>
            }
          </nav>
          <div class="d-flex align-items-center gap-3">
            <a routerLink="/cart" class="cart-link" (click)="closeMenu()">
              <i class="pi pi-shopping-cart"></i>
              @if ((totalItems$ | async); as total) {
                <span class="badge">{{ total }}</span>
              }
            </a>

            @if (isAuthenticated$ | async) {
              @if (userRole === 'ADMIN') {
                <a routerLink="/admin" class="btn-admin" (click)="closeMenu()">Admin</a>
              }
              <button class="btn-logout" (click)="onLogout()">Salir</button>
            } @else {
              <a routerLink="/auth/login" class="btn-login" (click)="closeMenu()">Ingresar</a>
            }
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    .header {
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      text-decoration: none;
    }
    .hamburger {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-dark);
      cursor: pointer;
      padding: 0.25rem;
    }
    .desktop-nav a, .mobile-menu nav a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      &:hover, &.active { color: var(--primary-color); }
    }
    .mobile-menu {
      padding: 0 1rem 1rem;
      border-top: 1px solid #eee;
      nav a {
        padding: 0.5rem 0;
      }
    }
    .cart-link {
      position: relative;
      color: var(--text-dark);
      font-size: 1.25rem;
    }
    .badge {
      position: absolute;
      top: -8px;
      right: -10px;
      background: var(--primary-color);
      color: white;
      font-size: 0.7rem;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-login, .btn-admin {
      padding: 0.4rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      text-decoration: none;
    }
    .btn-login {
      background: var(--primary-color);
      color: white;
      &:hover { background: var(--primary-dark); color: white; }
    }
    .btn-admin {
      background: var(--text-dark);
      color: white;
      &:hover { opacity: 0.9; color: white; }
    }
    .btn-logout {
      background: none;
      border: 1px solid var(--text-muted);
      color: var(--text-muted);
      padding: 0.4rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      &:hover { border-color: var(--text-dark); color: var(--text-dark); }
    }
  `],
})
export class HeaderComponent implements OnInit {
  private categoriasService = inject(CategoriasService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  categorias: any[] = [];
  totalItems$ = this.cartService.totalItems$;
  isAuthenticated$ = this.authService.isAuthenticated$;
  userRole = this.authService.getUserRole();
  menuOpen = signal(false);

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe({
      next: (res: any) => {
        if (res.success) this.categorias = res.content;
      },
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
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
