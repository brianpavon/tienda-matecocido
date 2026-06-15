import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="row justify-content-center py-5">
      <div class="col-md-5">
        <div class="auth-card">
          <h2 class="mb-4 text-center">Iniciar sesion</h2>

          @if (error) {
            <div class="alert-error mb-3">{{ error }}</div>
          }

          <form (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" [(ngModel)]="email" name="email" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input type="password" class="form-input" [(ngModel)]="password" name="password" required>
            </div>
            <button type="submit" class="btn-submit w-100" [disabled]="loading">
              {{ loading ? 'Ingresando...' : 'Ingresar' }}
            </button>
          </form>

          <p class="mt-3 text-center">
            No tenes cuenta? <a routerLink="/auth/registro">Registrate</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .form-label { font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem; display: block; }
    .form-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.95rem;
      box-sizing: border-box;
      &:focus { outline: none; border-color: var(--primary-color); }
    }
    .btn-submit {
      background: var(--primary-color);
      color: var(--on-primary);
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      &:hover { background: var(--primary-dark); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .alert-error {
      background: #fef2f2;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }
  `],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success) {
          const role = res.content.role;
          this.router.navigate([role === 'ADMIN' ? '/admin' : '/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al iniciar sesion';
      },
    });
  }
}
