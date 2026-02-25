import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductosService } from '../../../core/services/productos.service';
import { CartService } from '../../../core/services/cart.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    @if (producto) {
      <div class="row g-4">
        <div class="col-md-6">
          @if (producto.imagenes?.length) {
            <img [src]="getImgUrl(producto.imagenes[selectedImg])" [alt]="producto.nombre" class="main-img">
            @if (producto.imagenes.length > 1) {
              <div class="d-flex gap-2 mt-2">
                @for (img of producto.imagenes; track img.id_img_prod; let i = $index) {
                  <img [src]="getImgUrl(img)" class="thumb" [class.active]="i === selectedImg" (click)="selectedImg = i">
                }
              </div>
            }
          } @else {
            <div class="no-img"><i class="pi pi-image"></i></div>
          }
        </div>
        <div class="col-md-6">
          <h1>{{ producto.nombre }}</h1>
          <p class="price">{{ producto.precio | currency:'ARS':'symbol':'1.0-0' }}</p>
          <p>{{ producto.descripcion }}</p>

          @if (producto.categorias?.length) {
            <p><strong>Categorias:</strong> {{ getCategoryNames() }}</p>
          }
          @if (producto.colores?.length) {
            <p><strong>Colores:</strong> {{ getColorNames() }}</p>
          }

          <p class="stock">
            @if (producto.stock > 0) {
              Stock: {{ producto.stock }} disponible(s)
            } @else {
              <span class="text-danger">Sin stock</span>
            }
          </p>

          <div class="d-flex align-items-center gap-3 mt-4">
            <div class="qty-control">
              <button (click)="qty > 1 && qty = qty - 1">-</button>
              <span>{{ qty }}</span>
              <button (click)="qty < producto.stock && qty = qty + 1">+</button>
            </div>
            <button class="btn-add" (click)="addToCart()" [disabled]="producto.stock <= 0">
              <i class="pi pi-shopping-cart"></i> Agregar al carrito
            </button>
          </div>

          @if (added) {
            <p class="added-msg mt-2">Agregado al carrito!</p>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .main-img { width: 100%; border-radius: 8px; object-fit: cover; max-height: 400px; }
    .thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid transparent; }
    .thumb.active { border-color: var(--primary-color); }
    .no-img { height: 300px; background: #f5f0eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--text-muted); }
    h1 { font-size: 1.75rem; }
    .price { font-size: 1.5rem; color: var(--primary-color); font-weight: 600; }
    .qty-control {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      button { width: 32px; height: 32px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-size: 1.1rem; }
      span { font-weight: 600; min-width: 20px; text-align: center; }
    }
    .btn-add {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      &:hover { background: var(--primary-dark); }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .added-msg { color: green; font-weight: 500; }
  `],
})
export class ProductoDetailComponent implements OnInit {
  producto: any;
  selectedImg = 0;
  qty = 1;
  added = false;

  constructor(
    private productosService: ProductosService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const codProd = this.route.snapshot.paramMap.get('codProd')!;
    this.productosService.getByCodigo(codProd).subscribe({
      next: (res: any) => {
        if (res.success) this.producto = res.content;
      },
    });
  }

  getImgUrl(img: any): string {
    return img?.path_img ? `${environment.storageUrl}/${img.path_img}` : '';
  }

  getCategoryNames(): string {
    return this.producto?.categorias?.map((c: any) => c.nombre).join(', ') ?? '';
  }

  getColorNames(): string {
    return this.producto?.colores?.map((c: any) => c.nombre).join(', ') ?? '';
  }

  addToCart(): void {
    this.cartService.addItem({
      id_prod: this.producto.id_prod,
      codigo: this.producto.codigo,
      nombre: this.producto.nombre,
      precio: +this.producto.precio,
      cantidad: this.qty,
      imagen: this.producto.imagenes?.[0]?.path_img
        ? `${environment.storageUrl}/${this.producto.imagenes[0].path_img}`
        : undefined,
    });
    this.added = true;
    setTimeout(() => this.added = false, 2000);
  }
}
