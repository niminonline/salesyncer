import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { DecodedJwtToken } from 'src/app/shared/interfaces/interfaces';
import Swal from 'sweetalert2';

export const employeeAuthCACGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigate('/login');
    return false;
  }

  const decodedToken:DecodedJwtToken = jwtDecode(token);
  if (!decodedToken || decodedToken.role !== 'employee') {
    Swal.fire('Error', "Unauthorized access", 'error');
    navigate('/');
    return false;
  }

  return true;
};

function navigate(location:string) {
  Swal.fire('Error', "Unauthorized access", 'error');
  const router = new Router();
  router.navigate([location]);
}
