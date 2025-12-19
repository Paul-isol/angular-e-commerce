import { Component } from '@angular/core';
import { Header } from '../core/components/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../core/components/footer';

@Component({
  selector: 'main-layout',
  imports: [Header, RouterOutlet, Footer],
  template: `
    <app-header />
    <div class="flex-1 container px-10">
      <router-outlet />
    </div>
    <app-footer />
  `,
  host: {
    class: 'min-h-screen flex flex-col',
  },
})
export class MainLayout {}
