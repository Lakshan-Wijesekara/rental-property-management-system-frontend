import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  console.log(authenticationService.isLoggedIn());
  if (authenticationService.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  } else {
    // router.navigate(['/login']);
    return true;
  }
};
