import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticate = localStorage.getItem('auth') === 'true';

  if (!isAuthenticate) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
