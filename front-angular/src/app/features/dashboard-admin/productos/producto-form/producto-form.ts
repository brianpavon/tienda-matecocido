import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../../core/services/productos.service';
import { CategoriasService } from '../../../../core/services/categorias.service';
import { ColoresService } from '../../../../core/services/colores.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, InputNumberModule, TextareaModule, MultiSelectModule],
  template: `
    <h2 class="mb-4">{{ isEdit ? 'Editar producto' : 'Nuevo producto' }}</h2>

    <div class="form-card">
      @if (error) {
        <div class="alert-error mb-3">{{ error }}</div>
      }

      <form (ngSubmit)="onSubmit()">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Codigo</label>
            <input pInputText [(ngModel)]="form.codigo" name="codigo" class="w-100" [disabled]="isEdit" required />
          </div>
          <div class="col-md-8">
            <label class="form-label">Nombre</label>
            <input pInputText [(ngModel)]="form.nombre" name="nombre" class="w-100" required />
          </div>
          <div class="col-12">
            <label class="form-label">Descripcion</label>
            <textarea pTextarea [(ngModel)]="form.descripcion" name="descripcion" [rows]="3" class="w-100"></textarea>
          </div>
          <div class="col-md-4">
            <label class="form-label">Precio</label>
            <p-inputNumber [(ngModel)]="form.precio" name="precio" mode="currency" currency="ARS" locale="es-AR" [min]="0" styleClass="w-100" />
          </div>
          <div class="col-md-4">
            <label class="form-label">Stock</label>
            <p-inputNumber [(ngModel)]="form.stock" name="stock" [min]="0" [showButtons]="true" styleClass="w-100" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Categorias</label>
            <p-multiselect [(ngModel)]="selectedCategorias" name="categorias" [options]="categorias" optionLabel="nombre" optionValue="id_categ" placeholder="Seleccionar" styleClass="w-100" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Colores</label>
            <p-multiselect [(ngModel)]="selectedColores" name="colores" [options]="colores" optionLabel="nombre" optionValue="id_color" placeholder="Seleccionar" styleClass="w-100" />
          </div>
          <div class="col-12">
            <label class="form-label">Imagenes</label>
            <input type="file" (change)="onFileSelect($event)" multiple accept="image/*" class="form-input" />
          </div>
        </div>

        <div class="d-flex gap-2 mt-4">
          <p-button label="Guardar" icon="pi pi-check" type="submit" [loading]="saving" />
          <p-button label="Cancelar" [text]="true" (click)="onCancel()" />
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .form-label { display: block; font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem; }
    .form-input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
    .alert-error { background: #fef2f2; color: #dc2626; padding: 0.75rem; border-radius: 4px; font-size: 0.875rem; }
  `],
})
export class ProductoFormComponent implements OnInit {
  isEdit = false;
  saving = false;
  error = '';
  form = { codigo: '', nombre: '', descripcion: '', precio: 0, stock: 0 };
  categorias: any[] = [];
  colores: any[] = [];
  selectedCategorias: number[] = [];
  selectedColores: number[] = [];
  files: File[] = [];
  private editId = 0;

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private coloresService: ColoresService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.categorias = res.content; },
    });
    this.coloresService.getAll().subscribe({
      next: (res: any) => { if (res.success) this.colores = res.content; },
    });

    const codProd = this.route.snapshot.paramMap.get('codProd');
    if (codProd) {
      this.isEdit = true;
      this.productosService.getByCodigo(codProd).subscribe({
        next: (res: any) => {
          if (res.success) {
            const p = res.content;
            this.editId = p.id_prod;
            this.form = { codigo: p.codigo, nombre: p.nombre, descripcion: p.descripcion ?? '', precio: +p.precio, stock: p.stock };
            this.selectedCategorias = p.categorias?.map((c: any) => c.id_categ) ?? [];
            this.selectedColores = p.colores?.map((c: any) => c.id_color) ?? [];
          }
        },
      });
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.files = input.files ? Array.from(input.files) : [];
  }

  onSubmit(): void {
    this.error = '';
    this.saving = true;

    const fd = new FormData();
    fd.append('codigo', this.form.codigo);
    fd.append('nombre', this.form.nombre);
    fd.append('descripcion', this.form.descripcion);
    fd.append('precio', String(this.form.precio));
    fd.append('stock', String(this.form.stock));

    this.selectedCategorias.forEach(id => fd.append('categorias[]', String(id)));
    this.selectedColores.forEach(id => fd.append('colores[]', String(id)));
    this.files.forEach(f => fd.append('imagenes[]', f));

    const obs = this.isEdit
      ? this.productosService.update(this.editId, fd)
      : this.productosService.create(fd);

    obs.subscribe({
      next: () => { this.saving = false; this.router.navigate(['/admin/productos']); },
      error: (err: any) => { this.saving = false; this.error = err.error?.message || 'Error al guardar'; },
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/productos']);
  }
}
