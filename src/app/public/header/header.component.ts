// header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="bg-[#5ab2da] shadow-md">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Texto -->
          <div class="flex-shrink-0">
            <a routerLink="/" class="text-white text-xl font-bold hover:text-gray-100 transition-colors">
              Plataforma Educativa
            </a>
          </div>

          <!-- Menú de navegación -->
          <div class="hidden md:flex space-x-8">
            <a routerLink="/plantel" 
               class="text-white hover:text-gray-100 px-3 py-2 rounded-md transition-colors">
              Registro Escuelas
            </a>
            <a href="#" 
               class="text-white hover:text-gray-100 px-3 py-2 rounded-md transition-colors">
              Diagnóstico
            </a>
            <a href="#" 
               class="text-white hover:text-gray-100 px-3 py-2 rounded-md transition-colors">
              Docentes
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {}