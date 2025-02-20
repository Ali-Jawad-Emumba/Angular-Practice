import { Routes } from '@angular/router';
import { PracticeComponent } from './pages/practice/practice.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './utils/route-guards/auth-guard.guard';
import { RouteBasedFilterComponent } from './pages/route-based-filter/route-based-filter.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'practice',
    component: PracticeComponent,
    pathMatch: 'full',
  },
  {
    path: 'filter/:city/:type/:price',
    component: RouteBasedFilterComponent,
    pathMatch: 'full',
  },
  {
    path: 'filter/:city/:type',
    component: RouteBasedFilterComponent,
    pathMatch: 'full',
  },
  {
    path: 'filter/:city',
    component: RouteBasedFilterComponent,
    pathMatch: 'full',
  },
  {
    path: 'filter',
    component: RouteBasedFilterComponent,
    pathMatch: 'full',
  },
];
