import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./public/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'plantel',
    loadComponent: () =>
      import('./private/plantel/plantel.component').then((m) => m.PlantelComponent),
  },
  {
    path: 'docente',
    loadComponent: () =>
      import('./private/docete/docente.component').then((m) => m.DocenteComponent),
  },
  {
    path: 'diagnostico1',
    loadComponent: () =>
      import('./private/diagnostico1/diagnostico1.component').then((m) => m.Diagnostico1Component),
  },
  {
    path: 'diagnostico2',
    loadComponent: () =>
      import('./private/diagnostico2/diagnostico2.component').then((m) => m.Diagnostico2Component),
  },
  // Redirige la ruta raíz a 'login'
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
