import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../../core/services/usuarios.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [DatePipe, TableModule, ButtonModule, TagModule, TooltipModule],
  template: `
    <h2 class="mb-4">Usuarios</h2>

    <p-table [value]="usuarios" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
      <ng-template #header>
        <tr>
          <th pSortableColumn="email">Email</th>
          <th>Rol</th>
          <th>Activo</th>
          <th pSortableColumn="created_at">Fecha registro</th>
          <th style="width: 100px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-user>
        <tr>
          <td>{{ user.email }}</td>
          <td>
            <p-tag [value]="user.role" [severity]="user.role === 'ADMIN' ? 'danger' : 'info'" />
          </td>
          <td>
            <p-tag [value]="user.activo ? 'Activo' : 'Inactivo'" [severity]="user.activo ? 'success' : 'warn'" />
          </td>
          <td>{{ user.created_at | date:'dd/MM/yyyy' }}</td>
          <td>
            <p-button
              [icon]="user.activo ? 'pi pi-ban' : 'pi pi-check'"
              [rounded]="true"
              [text]="true"
              [severity]="user.activo ? 'warn' : 'success'"
              [pTooltip]="user.activo ? 'Desactivar' : 'Activar'"
              (click)="toggleActivo(user)" />
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.usuariosService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.usuarios = res.content; },
    });
  }

  toggleActivo(user: any): void {
    this.usuariosService.toggleActivo(user.id_usuario).subscribe({
      next: () => this.load(),
    });
  }
}
