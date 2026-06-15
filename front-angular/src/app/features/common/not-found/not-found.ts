import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center py-5">
      <h1 style="font-size: 4rem; color: var(--primary-color)">404</h1>
      <p class="mb-4">La pagina que buscas no existe</p>
      <a routerLink="/" class="btn-home">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .btn-home {
      background: var(--primary-color);
      color: var(--on-primary);
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      text-decoration: none;
      &:hover { background: var(--primary-dark); color: var(--on-primary); }
    }
  `],
})
export class NotFoundComponent {}
