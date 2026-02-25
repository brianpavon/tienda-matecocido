import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { OrdenesService } from '../../../core/services/ordenes.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CurrencyPipe, RouterLink],
  template: `
    <h2 class="mb-4">Finalizar compra</h2>

    @if (!authService.isAuthenticated()) {
      <div class="alert-info mb-4">
        <a routerLink="/auth/login">Inicia sesion</a> o <a routerLink="/auth/registro">registrate</a> para completar tu compra.
      </div>
    } @else {
      <div class="row g-4">
        <div class="col-md-7">
          <div class="checkout-card">
            <h4 class="mb-3">Datos de envio</h4>

            @if (error) {
              <div class="alert-error mb-3">{{ error }}</div>
            }

            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">Nombre completo</label>
                <input class="form-input" [(ngModel)]="form.nombre_envio" name="nombre" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Direccion</label>
                <input class="form-input" [(ngModel)]="form.direccion_envio" name="direccion" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Telefono</label>
                <input class="form-input" [(ngModel)]="form.telefono_envio" name="telefono" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email (opcional)</label>
                <input type="email" class="form-input" [(ngModel)]="form.email_envio" name="email">
              </div>
              <div class="mb-3">
                <label class="form-label">Notas (opcional)</label>
                <textarea class="form-input" [(ngModel)]="form.notas" name="notas" rows="2"></textarea>
              </div>
              <button type="submit" class="btn-submit w-100" [disabled]="loading">
                {{ loading ? 'Procesando...' : 'Confirmar pedido' }}
              </button>
            </form>
          </div>
        </div>

        <div class="col-md-5">
          <div class="checkout-card">
            <h4 class="mb-3">Resumen</h4>
            @for (item of cartService.getItems(); track item.id_prod) {
              <div class="d-flex justify-content-between mb-2">
                <span>{{ item.nombre }} x{{ item.cantidad }}</span>
                <span>{{ item.precio * item.cantidad | currency:'ARS':'symbol':'1.0-0' }}</span>
              </div>
            }
            <hr>
            <div class="d-flex justify-content-between">
              <strong>Total</strong>
              <strong>{{ total$ | async | currency:'ARS':'symbol':'1.0-0' }}</strong>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .checkout-card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .form-label { font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem; display: block; }
    .form-input {
      width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 0.95rem; box-sizing: border-box;
      &:focus { outline: none; border-color: var(--primary-color); }
    }
    .btn-submit {
      background: var(--primary-color); color: white; border: none; padding: 0.75rem; border-radius: 4px; font-size: 1rem; cursor: pointer;
      &:hover { background: var(--primary-dark); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .alert-info { background: #eff6ff; color: #1d4ed8; padding: 0.75rem; border-radius: 4px; }
    .alert-error { background: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 4px; }
  `],
})
export class CheckoutComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  private ordenesService = inject(OrdenesService);
  private router = inject(Router);

  form = { nombre_envio: '', direccion_envio: '', telefono_envio: '', email_envio: '', notas: '' };
  error = '';
  loading = false;
  total$ = this.cartService.total$;

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    const items = this.cartService.getItems().map(i => ({
      id_prod: i.id_prod,
      cantidad: i.cantidad,
    }));

    this.ordenesService.create({ ...this.form, items }).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success) {
          this.cartService.clearCart();
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al crear la orden';
      },
    });
  }
}
