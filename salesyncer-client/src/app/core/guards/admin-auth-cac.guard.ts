import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedJwtToken } from 'src/app/shared/interfaces/interfaces';
import Swal from 'sweetalert2';

export const adminAuthCACGuard: CanActivateFn = (route, state) => {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     navigateToLogin();
//     return false;
//   }

//   const decodedToken: any = jwtDecode(token);
//   if (!decodedToken || decodedToken.role !== 'admin') {
//     navigateToLogin();
//     return false;
//   }

//   return true;
// };

// function navigateToLogin() {
//   const router = new Router();
//   Swal.fire('Error', 'Unauthorized access', 'error');
//   router.navigate(['/admin-login']);
// }


const token = localStorage.getItem('token');
  
  if (!token) {
    navigate('/admin-login');
    return false;
  }

  const decodedToken:DecodedJwtToken = jwtDecode(token);
  if (!decodedToken || decodedToken.role !== 'admin') {
    Swal.fire('Error', "Unauthorized access", 'error');
    navigate('/admin');
    return false;
  }

  return true;
};

function navigate(location:string) {
  const router = new Router();
  router.navigate([location]);
}
