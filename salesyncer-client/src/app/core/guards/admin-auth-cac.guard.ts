import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

export const adminAuthCACGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigateToLogin();
    return false;
  }

  const decodedToken:any = jwtDecode(token);
  if (!decodedToken || decodedToken.role !== 'admin') {
    navigateToLogin();
    return false;
  }

  return true;
};

function navigateToLogin() {
  const router = new Router();
  router.navigate(['/admin/login']);
}
