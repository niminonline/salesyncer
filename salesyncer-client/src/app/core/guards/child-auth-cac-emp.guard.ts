import { CanActivateFn, Router } from '@angular/router';

export const childAuthCACEmpGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};