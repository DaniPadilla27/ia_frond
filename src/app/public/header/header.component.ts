// header.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="h-screen w-64 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col p-6">
      <!-- Logo y Título -->
      <div class="mb-8 flex items-center">
        <!-- Icono de logo (puedes reemplazarlo por el de tu preferencia) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12h-4m-6 0H2m10-7v14" />
        </svg>
        <a routerLink="/" class="ml-3 text-2xl font-bold hover:text-gray-200 transition-colors">
          Plataforma Educativa
        </a>
      </div>
      
      <!-- Menú de navegación -->
      <nav class="flex flex-col space-y-4">
        <a 
          routerLink="/plantel"
          class="flex items-center py-2 px-4 hover:bg-blue-400 rounded transition-colors"
        >
          <!-- Icono para Principal -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
          <span>Principal</span>
        </a>
        
        <a 
          routerLink="/diagnostico1"
          class="flex items-center py-2 px-4 hover:bg-blue-400 rounded transition-colors"
        >
          <!-- Icono para Diagnóstico 1 -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 00-4-4H3m16 6v-2a4 4 0 014-4h2m-4-6V3m0 0H5m14 0h2" />
          </svg>
          <span>Diagnóstico 1</span>
        </a>
        
        <a 
          routerLink="/diagnostico2"
          class="flex items-center py-2 px-4 hover:bg-blue-400 rounded transition-colors"
        >
          <!-- Icono para Diagnóstico 2 -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8H6a2 2 0 01-2-2V6a2 2 0 012-2h3.28a2 2 0 011.948 1.368l1.62 4.86a2 2 0 001.948 1.368h2.544a2 2 0 001.948-1.368l1.62-4.86A2 2 0 0118.72 4H22a2 2 0 012 2v12a2 2 0 01-2 2h-5" />
          </svg>
          <span>Diagnóstico 2</span>
        </a>
      </nav>
      
      <!-- Botón para cerrar sesión -->
      <div class="mt-auto pt-8">
        <button 
          (click)="cerrarSesion()"
          class="w-full flex items-center py-2 px-4 hover:bg-blue-400 rounded transition-colors"
        >
          <!-- Icono para cerrar sesión -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(private router: Router) { }

  cerrarSesion() {
    // Aquí puedes agregar la lógica de cierre de sesión
    this.router.navigate(['/login']);
  }
}
