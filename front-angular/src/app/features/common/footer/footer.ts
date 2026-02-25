import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container text-center py-4">
        <p class="mb-1">Matecocido &mdash; Ceramica artesanal</p>
        <small>&copy; {{ year }} Todos los derechos reservados</small>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--text-dark, #3C2F1E);
      color: rgba(255,255,255,0.7);
      margin-top: auto;
      small { opacity: 0.6; }
    }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
