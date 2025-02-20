import { Routes } from '@angular/router';
import { PracticeComponent } from './pages/practice/practice.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './utils/route-guards/auth-guard.guard';

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
];
