import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductosService } from '../../../core/services/productos.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <section class="hero text-center mb-5">
      <h1>Ceramica artesanal</h1>
      <p>Piezas unicas hechas a mano con amor</p>
      <a routerLink="/tienda" class="btn-primary-custom">Ver tienda</a>
    </section>

    <section>
      <h2 class="mb-4">Productos destacados</h2>
      <div class="row g-4">
        @for (prod of productos; track prod.id_prod) {
          <div class="col-6 col-md-4 col-lg-3">
            <a [routerLink]="['/tienda/producto', prod.codigo]" class="product-card">
              @if (prod.imagenes?.length) {
                <div class="product-img" [style.background-image]="'url(' + getImgUrl(prod) + ')'"></div>
              } @else {
                <div class="product-img no-img"><i class="pi pi-image"></i></div>
              }
              <div class="p-3">
                <h5>{{ prod.nombre }}</h5>
                <p class="price">{{ prod.precio | currency:'ARS':'symbol':'1.0-0' }}</p>
              </div>
            </a>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 3rem 0;
      h1 { font-size: 2.5rem; color: var(--primary-color); }
      p { color: var(--text-muted); margin-bottom: 1.5rem; }
    }
    .btn-primary-custom {
      background: var(--primary-color);
      color: var(--on-primary);
      padding: 0.75rem 2rem;
      border-radius: 4px;
      text-decoration: none;
      &:hover { background: var(--primary-dark); color: var(--on-primary); }
    }
    .product-card {
      display: block;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      text-decoration: none;
      color: var(--text-dark);
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); color: var(--text-dark); }
    }
    .product-img {
      height: 200px;
      background-size: cover;
      background-position: center;
      background-color: #f7eef2;
    }
    .no-img {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: var(--text-muted);
    }
    h5 { font-size: 1rem; margin-bottom: 0.25rem; }
    .price { color: var(--primary-color); font-weight: 600; margin: 0; }
    @media (max-width: 576px) {
      .product-img { height: 150px; }
      .hero h1 { font-size: 1.75rem; }
    }
  `],
})
export class HomeComponent implements OnInit {
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getAll().subscribe({
      next: (res: any) => {
        if (res.success) this.productos = res.content.slice(0, 8);
      },
    });
  }

  getImgUrl(prod: any): string {
    const path = prod.imagenes[0]?.path_img;
    return path ? `${environment.storageUrl}/${path}` : '';
  }
}
