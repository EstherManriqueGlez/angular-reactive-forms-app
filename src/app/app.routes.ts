import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive',
    loadChildren: () =>
      import('./reactive/reactive.routs').then((m) => m.reactiveRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routs'),
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./country/country.routs').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }
];
