import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductosService } from '../../../core/services/productos.service';
import { OrdenesService } from '../../../core/services/ordenes.service';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <h2 class="mb-4">Panel de Administracion</h2>

    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="stat-card">
          <i class="pi pi-box"></i>
          <div>
            <h3>{{ totalProductos }}</h3>
            <p>Productos</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <i class="pi pi-shopping-cart"></i>
          <div>
            <h3>{{ totalOrdenes }}</h3>
            <p>Ordenes</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <i class="pi pi-users"></i>
          <div>
            <h3>{{ totalUsuarios }}</h3>
            <p>Usuarios</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card">
          <i class="pi pi-dollar"></i>
          <div>
            <h3>{{ ventasTotal | currency:'ARS':'symbol':'1.0-0' }}</h3>
            <p>Ventas totales</p>
          </div>
        </div>
      </div>
    </div>

    @if (ultimasOrdenes.length) {
      <div class="card-section">
        <h4 class="mb-3">Ultimas ordenes</h4>
        <table class="admin-table">
          <thead><tr><th>#</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
          <tbody>
            @for (o of ultimasOrdenes; track o.id_orden) {
              <tr>
                <td>{{ o.id_orden }}</td>
                <td>{{ o.usuario?.email }}</td>
                <td>{{ o.total | currency:'ARS':'symbol':'1.0-0' }}</td>
                <td><span class="badge-estado" [attr.data-estado]="o.estado">{{ o.estado }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  styles: [`
    .stat-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      i { font-size: 2rem; color: var(--primary-color); }
      h3 { margin: 0; font-size: 1.5rem; }
      p { margin: 0; color: var(--text-muted); font-size: 0.875rem; }
    }
    .card-section { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .admin-table { width: 100%; border-collapse: collapse; }
    .admin-table th { padding: 0.75rem; text-align: left; font-size: 0.875rem; border-bottom: 2px solid #eee; }
    .admin-table td { padding: 0.75rem; border-bottom: 1px solid #f0f0f0; }
    .badge-estado {
      padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;
      &[data-estado="PENDIENTE"] { background: #fef3c7; color: #92400e; }
      &[data-estado="CONFIRMADA"] { background: #dbeafe; color: #1e40af; }
      &[data-estado="ENVIADA"] { background: #e0e7ff; color: #3730a3; }
      &[data-estado="ENTREGADA"] { background: #d1fae5; color: #065f46; }
      &[data-estado="CANCELADA"] { background: #fee2e2; color: #991b1b; }
    }
  `],
})
export class ResumenComponent implements OnInit {
  totalProductos = 0;
  totalOrdenes = 0;
  totalUsuarios = 0;
  ventasTotal = 0;
  ultimasOrdenes: any[] = [];

  constructor(
    private productosService: ProductosService,
    private ordenesService: OrdenesService,
    private usuariosService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.productosService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.totalProductos = res.content.length; },
    });
    this.ordenesService.getAll().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.totalOrdenes = res.content.length;
          this.ventasTotal = res.content.reduce((sum: number, o: any) => sum + +o.total, 0);
          this.ultimasOrdenes = res.content.slice(0, 5);
        }
      },
    });
    this.usuariosService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.totalUsuarios = res.content.length; },
    });
  }
}
