import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductosService } from '../../../core/services/productos.service';
import { CategoriasService } from '../../../core/services/categorias.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  template: `
    <h2 class="mb-4">{{ titulo }}</h2>
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
              @if (prod.stock <= 0) {
                <small class="text-danger">Sin stock</small>
              }
            </div>
          </a>
        </div>
      } @empty {
        <p class="text-muted">No se encontraron productos</p>
      }
    </div>
  `,
  styles: [`
    .product-card {
      display: block;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      text-decoration: none;
      color: var(--text-dark);
      transition: transform 0.2s;
      &:hover { transform: translateY(-4px); color: var(--text-dark); }
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
    }
  `],
})
export class ProductoListComponent implements OnInit {
  productos: any[] = [];
  titulo = 'Tienda';

  private categorias: any[] = [];

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe({
      next: (res: any) => {
        if (res.success) this.categorias = res.content;
      },
    });

    this.route.paramMap.subscribe(params => {
      const codCateg = params.get('codCateg');
      if (codCateg) {
        const cat = this.categorias.find((c: any) => c.codigo === codCateg);
        this.titulo = cat ? cat.nombre : codCateg;
      } else {
        this.titulo = 'Tienda';
      }
      this.loadProductos(codCateg ?? undefined);
    });
  }

  getImgUrl(prod: any): string {
    const path = prod.imagenes?.[0]?.path_img;
    return path ? `${environment.storageUrl}/${path}` : '';
  }

  private loadProductos(categoria?: string): void {
    this.productosService.getAll(categoria).subscribe({
      next: (res: any) => {
        if (res.success) this.productos = res.content;
      },
    });
  }
}
