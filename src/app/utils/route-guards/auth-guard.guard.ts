import { CanActivateFn, Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const mainService = inject(MainService);
  const router = inject(Router);

  if (mainService.isLoggedIn) {
    return true;
  } else {
    mainService.isLoggedIn === false;
    router.navigate(['/']);
    return false;
  }
};
