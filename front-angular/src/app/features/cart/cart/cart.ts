import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, AsyncPipe, CurrencyPipe],
  template: `
    <h2 class="mb-4">Carrito</h2>

    @if ((items$ | async); as items) {
      @if (items.length === 0) {
        <p class="text-muted">Tu carrito esta vacio. <a routerLink="/tienda">Ver productos</a></p>
      } @else {
        <div class="cart-items">
          @for (item of items; track item.id_prod) {
            <div class="cart-item d-flex align-items-center gap-3 mb-3 p-3">
              <div class="flex-grow-1">
                <h5 class="mb-1">{{ item.nombre }}</h5>
                <p class="mb-0 text-muted">{{ item.precio | currency:'ARS':'symbol':'1.0-0' }} x {{ item.cantidad }}</p>
              </div>
              <div class="qty-control">
                <button (click)="updateQty(item.id_prod, item.cantidad - 1)">-</button>
                <span>{{ item.cantidad }}</span>
                <button (click)="updateQty(item.id_prod, item.cantidad + 1)">+</button>
              </div>
              <strong>{{ item.precio * item.cantidad | currency:'ARS':'symbol':'1.0-0' }}</strong>
              <button class="btn-remove" (click)="remove(item.id_prod)"><i class="pi pi-trash"></i></button>
            </div>
          }
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4 p-3" style="background: white; border-radius: 8px;">
          <h4 class="mb-0">Total: {{ total$ | async | currency:'ARS':'symbol':'1.0-0' }}</h4>
          <a routerLink="/checkout" class="btn-checkout">Finalizar compra</a>
        </div>
      }
    }
  `,
  styles: [`
    .cart-item {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .qty-control {
      display: flex; align-items: center; gap: 0.5rem;
      button { width: 28px; height: 28px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; }
    }
    .btn-remove { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 1rem; }
    .btn-checkout {
      background: var(--primary-color);
      color: white;
      padding: 0.6rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      &:hover { background: var(--primary-dark); color: white; }
    }
  `],
})
export class CartComponent {
  private cartService = inject(CartService);
  items$ = this.cartService.items$;
  total$ = this.cartService.total$;

  updateQty(idProd: number, qty: number): void {
    this.cartService.updateQuantity(idProd, qty);
  }

  remove(idProd: number): void {
    this.cartService.removeItem(idProd);
  }
}
