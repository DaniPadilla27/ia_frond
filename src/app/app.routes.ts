import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'plantel',
      loadComponent: () => 
        import('./private/plantel/plantel.component').then((m) => m.PlantelComponent),
    },
    // Redirige la ruta raíz a 'plantel' o a otro componente
    { path: '', redirectTo: 'plantel', pathMatch: 'full' },
  ];