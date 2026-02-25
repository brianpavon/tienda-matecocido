import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  id_prod: number;
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart$ = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  items$ = this.cart$.asObservable();
  total$ = this.cart$.pipe(map(items => items.reduce((sum, i) => sum + i.precio * i.cantidad, 0)));
  totalItems$ = this.cart$.pipe(map(items => items.reduce((sum, i) => sum + i.cantidad, 0)));

  addItem(item: CartItem): void {
    const items = [...this.cart$.value];
    const idx = items.findIndex(i => i.id_prod === item.id_prod);

    if (idx >= 0) {
      items[idx] = { ...items[idx], cantidad: items[idx].cantidad + item.cantidad };
    } else {
      items.push({ ...item });
    }

    this.cart$.next(items);
    this.saveToStorage();
  }

  removeItem(idProd: number): void {
    const items = this.cart$.value.filter(i => i.id_prod !== idProd);
    this.cart$.next(items);
    this.saveToStorage();
  }

  updateQuantity(idProd: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeItem(idProd);
      return;
    }

    const items = this.cart$.value.map(i =>
      i.id_prod === idProd ? { ...i, cantidad } : i
    );
    this.cart$.next(items);
    this.saveToStorage();
  }

  clearCart(): void {
    this.cart$.next([]);
    this.saveToStorage();
  }

  getItems(): CartItem[] {
    return this.cart$.value;
  }

  private saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart$.value));
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
