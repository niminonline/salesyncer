import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

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
  Swal.fire('Error', "Unauthorized access", 'error');
  router.navigate(['/admin-login']);
}
