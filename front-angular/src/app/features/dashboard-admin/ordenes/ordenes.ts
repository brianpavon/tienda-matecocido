import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenesService } from '../../../core/services/ordenes.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-admin-ordenes',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule, TableModule, ButtonModule, TagModule, SelectModule, DialogModule],
  template: `
    <h2 class="mb-4">Ordenes</h2>

    <p-table [value]="ordenes" [paginator]="true" [rows]="10" styleClass="p-datatable-sm" [scrollable]="true" scrollDirection="horizontal">
      <ng-template #header>
        <tr>
          <th pSortableColumn="id_orden">#</th>
          <th>Cliente</th>
          <th pSortableColumn="total">Total</th>
          <th>Estado</th>
          <th pSortableColumn="created_at">Fecha</th>
          <th style="width: 100px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-orden>
        <tr>
          <td>{{ orden.id_orden }}</td>
          <td>{{ orden.usuario?.email }}</td>
          <td>{{ orden.total | currency:'ARS':'symbol':'1.0-0' }}</td>
          <td>
            <span class="badge-estado" [attr.data-estado]="orden.estado">{{ orden.estado }}</span>
          </td>
          <td>{{ orden.created_at | date:'dd/MM/yyyy HH:mm' }}</td>
          <td>
            <p-button icon="pi pi-eye" [rounded]="true" [text]="true" (click)="openDetail(orden)" />
            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="info" (click)="openEstado(orden)" />
          </td>
        </tr>
      </ng-template>
      <ng-template #emptymessage>
        <tr><td colspan="6" class="text-center p-4 text-muted">No hay ordenes</td></tr>
      </ng-template>
    </p-table>

    <!-- Detail dialog -->
    <p-dialog [(visible)]="detailVisible" header="Detalle de orden" [modal]="true" [style]="{width: '500px'}" [breakpoints]="{'960px': '90vw'}">
      @if (selectedOrden) {
        <p><strong>Orden #{{ selectedOrden.id_orden }}</strong></p>
        <p>Cliente: {{ selectedOrden.usuario?.email }}</p>
        <p>Envio: {{ selectedOrden.nombre_envio }} - {{ selectedOrden.direccion_envio }}</p>
        <p>Telefono: {{ selectedOrden.telefono_envio }}</p>
        @if (selectedOrden.notas) {
          <p>Notas: {{ selectedOrden.notas }}</p>
        }
        <table class="detail-table mt-3">
          <thead><tr><th>Producto</th><th>Cant.</th><th>P. Unit.</th><th>Subtotal</th></tr></thead>
          <tbody>
            @for (d of selectedOrden.detalles; track d.id_detalle) {
              <tr>
                <td>{{ d.producto?.nombre }}</td>
                <td>{{ d.cantidad }}</td>
                <td>{{ d.precio_unitario | currency:'ARS':'symbol':'1.0-0' }}</td>
                <td>{{ d.subtotal | currency:'ARS':'symbol':'1.0-0' }}</td>
              </tr>
            }
          </tbody>
        </table>
        <p class="mt-2 text-end"><strong>Total: {{ selectedOrden.total | currency:'ARS':'symbol':'1.0-0' }}</strong></p>
      }
    </p-dialog>

    <!-- Estado dialog -->
    <p-dialog [(visible)]="estadoVisible" header="Cambiar estado" [modal]="true" [style]="{width: '350px'}" [breakpoints]="{'960px': '90vw'}">
      <div class="mb-3">
        <label class="form-label">Estado</label>
        <p-select [(ngModel)]="nuevoEstado" [options]="estados" optionLabel="label" optionValue="value" styleClass="w-100" />
      </div>
      <ng-template #footer>
        <p-button label="Cancelar" [text]="true" (click)="estadoVisible = false" />
        <p-button label="Guardar" icon="pi pi-check" (click)="saveEstado()" />
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .badge-estado {
      padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;
      &[data-estado="PENDIENTE"] { background: #fef3c7; color: #92400e; }
      &[data-estado="CONFIRMADA"] { background: #dbeafe; color: #1e40af; }
      &[data-estado="ENVIADA"] { background: #e0e7ff; color: #3730a3; }
      &[data-estado="ENTREGADA"] { background: #d1fae5; color: #065f46; }
      &[data-estado="CANCELADA"] { background: #fee2e2; color: #991b1b; }
    }
    .detail-table { width: 100%; border-collapse: collapse; }
    .detail-table th { padding: 0.5rem; text-align: left; font-size: 0.8rem; border-bottom: 1px solid #eee; }
    .detail-table td { padding: 0.5rem; border-bottom: 1px solid #f5f5f5; font-size: 0.875rem; }
    .form-label { display: block; font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem; }
  `],
})
export class OrdenesComponent implements OnInit {
  ordenes: any[] = [];
  selectedOrden: any = null;
  detailVisible = false;
  estadoVisible = false;
  nuevoEstado = '';
  private estadoOrdenId = 0;

  estados = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Confirmada', value: 'CONFIRMADA' },
    { label: 'Enviada', value: 'ENVIADA' },
    { label: 'Entregada', value: 'ENTREGADA' },
    { label: 'Cancelada', value: 'CANCELADA' },
  ];

  constructor(private ordenesService: OrdenesService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.ordenesService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.ordenes = res.content; },
    });
  }

  openDetail(orden: any): void {
    this.ordenesService.getById(orden.id_orden).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.selectedOrden = res.content;
          this.detailVisible = true;
        }
      },
    });
  }

  openEstado(orden: any): void {
    this.estadoOrdenId = orden.id_orden;
    this.nuevoEstado = orden.estado;
    this.estadoVisible = true;
  }

  saveEstado(): void {
    this.ordenesService.cambiarEstado(this.estadoOrdenId, this.nuevoEstado).subscribe({
      next: () => { this.estadoVisible = false; this.load(); },
    });
  }
}
