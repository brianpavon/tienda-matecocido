import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColoresService } from '../../../core/services/colores.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-colores',
  standalone: true,
  imports: [FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Colores</h2>
      <p-button label="Nuevo color" icon="pi pi-plus" (click)="openNew()" />
    </div>

    <p-table [value]="colores" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
      <ng-template #header>
        <tr>
          <th>Codigo</th>
          <th>Nombre</th>
          <th style="width: 120px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-color>
        <tr>
          <td>{{ color.codigo }}</td>
          <td>{{ color.nombre }}</td>
          <td>
            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="info" (click)="openEdit(color)" />
            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (click)="onDelete(color)" />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog [(visible)]="dialogVisible" [header]="editMode ? 'Editar color' : 'Nuevo color'" [modal]="true" [style]="{width: '400px'}">
      <div class="mb-3">
        <label class="form-label">Codigo</label>
        <input pInputText [(ngModel)]="form.codigo" class="w-100" [disabled]="editMode" />
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input pInputText [(ngModel)]="form.nombre" class="w-100" />
      </div>
      @if (error) {
        <div class="alert-error mb-3">{{ error }}</div>
      }
      <ng-template #footer>
        <p-button label="Cancelar" [text]="true" (click)="dialogVisible = false" />
        <p-button label="Guardar" icon="pi pi-check" (click)="onSave()" [loading]="saving" />
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .form-label { display: block; font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem; }
    .alert-error { background: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 4px; font-size: 0.875rem; }
  `],
})
export class ColoresComponent implements OnInit {
  colores: any[] = [];
  dialogVisible = false;
  editMode = false;
  saving = false;
  error = '';
  form = { codigo: '', nombre: '' };
  private editId = 0;

  constructor(private coloresService: ColoresService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.coloresService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.colores = res.content; },
    });
  }

  openNew(): void {
    this.form = { codigo: '', nombre: '' };
    this.editMode = false;
    this.error = '';
    this.dialogVisible = true;
  }

  openEdit(color: any): void {
    this.form = { codigo: color.codigo, nombre: color.nombre };
    this.editId = color.id_color;
    this.editMode = true;
    this.error = '';
    this.dialogVisible = true;
  }

  onSave(): void {
    this.error = '';
    this.saving = true;

    const obs = this.editMode
      ? this.coloresService.update(this.editId, { nombre: this.form.nombre })
      : this.coloresService.create(this.form);

    obs.subscribe({
      next: () => { this.saving = false; this.dialogVisible = false; this.load(); },
      error: (err: any) => { this.saving = false; this.error = err.error?.message || 'Error'; },
    });
  }

  onDelete(color: any): void {
    if (!confirm(`Eliminar color "${color.nombre}"?`)) return;
    this.coloresService.delete(color.id_color).subscribe({
      next: () => this.load(),
    });
  }
}
