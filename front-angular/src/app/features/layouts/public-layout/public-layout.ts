import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../common/header/header';
import { FooterComponent } from '../../common/footer/footer';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <main class="container py-4" style="min-height: calc(100vh - 200px)">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class PublicLayoutComponent {}
