// header.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="h-screen w-64 bg-[#5ab2da] text-white flex flex-col p-6">
      <!-- Título/Logo -->
      <div class="mb-8">
        <a 
          routerLink="/"
          class="text-2xl font-bold hover:text-gray-200 transition-colors"
        >
          Plataforma Educativa
        </a>
      </div>
      <!-- Menú de navegación -->
      <nav class="flex flex-col space-y-4">
        <a 
          routerLink="/plantel"
          class="block py-2 px-4 hover:bg-[#4a90c3] rounded transition-colors"
        >
          Principal
        </a>
<a 
  routerLink="/diagnostico1"
  class="block py-2 px-4 hover:bg-[#4a90c3] rounded transition-colors"
>
  Diagnóstico 1
</a>

        <a 
          routerLink="/diagnostico2"
          class="block py-2 px-4 hover:bg-[#4a90c3] rounded transition-colors"
        >
          Diagnóstico 2
        </a>
        <a 
  routerLink="/promt"
  class="block py-2 px-4 hover:bg-[#4a90c3] rounded transition-colors flex items-center gap-2"
>
  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" class="w-5 h-5">
  Diagnóstico 3
</a>

      </nav>
      
      <!-- Botón para cerrar sesión -->
      <div class="mt-auto pt-8">
        <button 
          (click)="cerrarSesion()"
          class="w-full text-left py-2 px-4 hover:bg-[#4a90c3] rounded transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(private router: Router) { }

  cerrarSesion() {
    // Redirige al login al cerrar sesión
    this.router.navigate(['/login']);
  }


}
