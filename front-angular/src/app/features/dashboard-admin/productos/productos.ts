import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../../core/services/productos.service';
import { environment } from '../../../../environments/environment';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, TableModule, ButtonModule, TagModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Productos</h2>
      <p-button label="Nuevo producto" icon="pi pi-plus" routerLink="/admin/productos/nuevo" />
    </div>

    <p-table [value]="productos" [paginator]="true" [rows]="10" styleClass="p-datatable-sm" [tableStyle]="{'min-width': '60rem'}">
      <ng-template #header>
        <tr>
          <th style="width: 60px">Img</th>
          <th pSortableColumn="codigo">Codigo</th>
          <th pSortableColumn="nombre">Nombre</th>
          <th pSortableColumn="precio">Precio</th>
          <th pSortableColumn="stock">Stock</th>
          <th>Categorias</th>
          <th style="width: 120px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-prod>
        <tr>
          <td>
            @if (prod.imagenes?.length) {
              <img [src]="getImgUrl(prod)" class="thumb" />
            } @else {
              <div class="thumb-empty"><i class="pi pi-image"></i></div>
            }
          </td>
          <td>{{ prod.codigo }}</td>
          <td>{{ prod.nombre }}</td>
          <td>{{ prod.precio | currency:'ARS':'symbol':'1.0-0' }}</td>
          <td>
            @if (prod.stock > 0) {
              {{ prod.stock }}
            } @else {
              <p-tag value="Sin stock" severity="danger" />
            }
          </td>
          <td>{{ getCatNames(prod) }}</td>
          <td>
            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="info" [routerLink]="['/admin/productos/editar', prod.codigo]" />
            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (click)="onDelete(prod)" />
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: [`
    .thumb { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; }
    .thumb-empty { width: 40px; height: 40px; border-radius: 4px; background: #f5f0eb; display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
  `],
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.productosService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.productos = res.content; },
    });
  }

  getImgUrl(prod: any): string {
    const path = prod.imagenes?.[0]?.path_img;
    return path ? `${environment.storageUrl}/${path}` : '';
  }

  getCatNames(prod: any): string {
    return prod.categorias?.map((c: any) => c.nombre).join(', ') ?? '';
  }

  onDelete(prod: any): void {
    if (!confirm(`Eliminar producto "${prod.nombre}"?`)) return;
    this.productosService.delete(prod.id_prod).subscribe({
      next: () => this.load(),
    });
  }
}
