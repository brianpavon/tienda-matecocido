import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../../core/services/categorias.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [FormsModule, TableModule, ButtonModule, DialogModule, InputTextModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Categorias</h2>
      <p-button label="Nueva categoria" icon="pi pi-plus" (click)="openNew()" />
    </div>

    <p-table [value]="categorias" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
      <ng-template #header>
        <tr>
          <th>Codigo</th>
          <th>Nombre</th>
          <th style="width: 120px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-cat>
        <tr>
          <td>{{ cat.codigo }}</td>
          <td>{{ cat.nombre }}</td>
          <td>
            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="info" (click)="openEdit(cat)" />
            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (click)="onDelete(cat)" />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog [(visible)]="dialogVisible" [header]="editMode ? 'Editar categoria' : 'Nueva categoria'" [modal]="true" [style]="{width: '400px'}">
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
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  dialogVisible = false;
  editMode = false;
  saving = false;
  error = '';
  form = { codigo: '', nombre: '' };
  private editId = 0;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.categoriasService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.categorias = res.content; },
    });
  }

  openNew(): void {
    this.form = { codigo: '', nombre: '' };
    this.editMode = false;
    this.error = '';
    this.dialogVisible = true;
  }

  openEdit(cat: any): void {
    this.form = { codigo: cat.codigo, nombre: cat.nombre };
    this.editId = cat.id_categ;
    this.editMode = true;
    this.error = '';
    this.dialogVisible = true;
  }

  onSave(): void {
    this.error = '';
    this.saving = true;

    const obs = this.editMode
      ? this.categoriasService.update(this.editId, { nombre: this.form.nombre })
      : this.categoriasService.create(this.form);

    obs.subscribe({
      next: () => { this.saving = false; this.dialogVisible = false; this.load(); },
      error: (err: any) => { this.saving = false; this.error = err.error?.message || 'Error'; },
    });
  }

  onDelete(cat: any): void {
    if (!confirm(`Eliminar categoria "${cat.nombre}"?`)) return;
    this.categoriasService.delete(cat.id_categ).subscribe({
      next: () => this.load(),
    });
  }
}
