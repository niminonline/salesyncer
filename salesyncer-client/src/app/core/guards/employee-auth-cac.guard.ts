import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

export const employeeAuthCACGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigateToLogin();
    return false;
  }

  const decodedToken:any = jwtDecode(token);
  if (!decodedToken || decodedToken.role !== 'employee') {
    Swal.fire('Error', "Unauthorized access", 'error');
   // navigateToLogin();
    return false;
  }

  return true;
};

function navigateToLogin() {
  Swal.fire('Error', "Unauthorized access", 'error');
  const router = new Router();
  router.navigate(['/login']);
}
