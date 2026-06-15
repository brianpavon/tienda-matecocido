import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastosService } from '../../../core/services/gastos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admin-gastos',
  standalone: true,
  imports: [
    CurrencyPipe, DatePipe, FormsModule, TableModule, ButtonModule,
    DialogModule, SelectModule, InputNumberModule, DatePickerModule, InputTextModule,
  ],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Gastos</h2>
      <p-button label="Nuevo gasto" icon="pi pi-plus" (click)="openNew()" />
    </div>

    <p-table [value]="gastos" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
      <ng-template #header>
        <tr>
          <th pSortableColumn="fecha">Fecha</th>
          <th>Tipo</th>
          <th>Descripcion</th>
          <th pSortableColumn="monto">Monto</th>
          <th style="width: 120px">Acciones</th>
        </tr>
      </ng-template>
      <ng-template #body let-gasto>
        <tr>
          <td>{{ gasto.fecha | date:'dd/MM/yyyy' }}</td>
          <td><span class="badge-tipo" [attr.data-tipo]="gasto.tipo">{{ tipoLabel(gasto.tipo) }}</span></td>
          <td>{{ gasto.descripcion || '-' }}</td>
          <td>{{ gasto.monto | currency:'ARS':'symbol':'1.2-2' }}</td>
          <td>
            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="info" (click)="openEdit(gasto)" />
            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (click)="onDelete(gasto)" />
          </td>
        </tr>
      </ng-template>
      <ng-template #footer>
        <tr>
          <td colspan="3" class="text-end"><strong>Total</strong></td>
          <td colspan="2"><strong>{{ total | currency:'ARS':'symbol':'1.2-2' }}</strong></td>
        </tr>
      </ng-template>
      <ng-template #emptymessage>
        <tr><td colspan="5" class="text-center p-4 text-muted">No hay gastos cargados</td></tr>
      </ng-template>
    </p-table>

    <p-dialog [(visible)]="dialogVisible" [header]="editMode ? 'Editar gasto' : 'Nuevo gasto'" [modal]="true" [style]="{width: '420px'}" [breakpoints]="{'960px': '90vw'}">
      <div class="mb-3">
        <label class="form-label">Tipo</label>
        <p-select [(ngModel)]="form.tipo" [options]="tipos" optionLabel="label" optionValue="value" placeholder="Seleccionar tipo" styleClass="w-100" appendTo="body" />
      </div>
      <div class="mb-3">
        <label class="form-label">Monto</label>
        <p-inputNumber [(ngModel)]="form.monto" mode="currency" currency="ARS" locale="es-AR" [min]="0" styleClass="w-100" inputStyleClass="w-100" />
      </div>
      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <p-datepicker [(ngModel)]="form.fecha" dateFormat="dd/mm/yy" [showIcon]="true" styleClass="w-100" appendTo="body" />
      </div>
      <div class="mb-3">
        <label class="form-label">Descripcion (opcional)</label>
        <input pInputText [(ngModel)]="form.descripcion" class="w-100" maxlength="250" />
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
    .badge-tipo {
      padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;
      &[data-tipo="INSUMOS"] { background: #dbeafe; color: #1e40af; }
      &[data-tipo="HORNEADAS"] { background: #fee2e2; color: #991b1b; }
      &[data-tipo="ALQUILER"] { background: #fef3c7; color: #92400e; }
      &[data-tipo="PUBLICIDAD"] { background: #e0e7ff; color: #3730a3; }
      &[data-tipo="OTROS"] { background: #f3f4f6; color: #374151; }
    }
  `],
})
export class GastosComponent implements OnInit {
  gastos: any[] = [];
  dialogVisible = false;
  editMode = false;
  saving = false;
  error = '';
  form: { tipo: string; monto: number | null; fecha: Date | null; descripcion: string } = {
    tipo: '', monto: null, fecha: null, descripcion: '',
  };
  private editId = 0;

  tipos = [
    { label: 'Insumos', value: 'INSUMOS' },
    { label: 'Horneadas', value: 'HORNEADAS' },
    { label: 'Alquiler', value: 'ALQUILER' },
    { label: 'Publicidad', value: 'PUBLICIDAD' },
    { label: 'Otros', value: 'OTROS' },
  ];

  constructor(private gastosService: GastosService) {}

  ngOnInit(): void { this.load(); }

  get total(): number {
    return this.gastos.reduce((acc, g) => acc + Number(g.monto), 0);
  }

  tipoLabel(value: string): string {
    return this.tipos.find(t => t.value === value)?.label ?? value;
  }

  load(): void {
    this.gastosService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.gastos = res.content; },
    });
  }

  openNew(): void {
    this.form = { tipo: '', monto: null, fecha: new Date(), descripcion: '' };
    this.editMode = false;
    this.error = '';
    this.dialogVisible = true;
  }

  openEdit(gasto: any): void {
    this.form = {
      tipo: gasto.tipo,
      monto: Number(gasto.monto),
      fecha: this.parseDate(gasto.fecha),
      descripcion: gasto.descripcion ?? '',
    };
    this.editId = gasto.id_gasto;
    this.editMode = true;
    this.error = '';
    this.dialogVisible = true;
  }

  onSave(): void {
    this.error = '';

    if (!this.form.tipo || this.form.monto == null || !this.form.fecha) {
      this.error = 'Tipo, monto y fecha son obligatorios';
      return;
    }

    this.saving = true;
    const payload = {
      tipo: this.form.tipo,
      monto: this.form.monto,
      fecha: this.toYmd(this.form.fecha),
      descripcion: this.form.descripcion || null,
    };

    const obs = this.editMode
      ? this.gastosService.update(this.editId, payload)
      : this.gastosService.create(payload);

    obs.subscribe({
      next: () => { this.saving = false; this.dialogVisible = false; this.load(); },
      error: (err: any) => { this.saving = false; this.error = err.error?.message || 'Error'; },
    });
  }

  onDelete(gasto: any): void {
    if (!confirm(`Eliminar gasto de ${this.tipoLabel(gasto.tipo)} por $${gasto.monto}?`)) return;
    this.gastosService.delete(gasto.id_gasto).subscribe({
      next: () => this.load(),
    });
  }

  private toYmd(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private parseDate(ymd: string): Date {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
}
