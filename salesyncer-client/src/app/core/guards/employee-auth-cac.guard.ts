import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { DecodedJwtToken } from 'src/app/shared/interfaces/interfaces';
import Swal from 'sweetalert2';

export const employeeAuthCACGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigateToLogin();
    return false;
  }

  const decodedToken:DecodedJwtToken = jwtDecode(token);
  if (!decodedToken || decodedToken.role !== 'employee') {
    Swal.fire('Error', "Unauthorized access", 'error');
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    navigateToLogin();
    return false;
  }

  return true;
};

function navigateToLogin() {
  const router = new Router();
  router.navigate(['/login']);
}

