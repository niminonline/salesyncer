import { CanActivateFn } from '@angular/router';

export const authCAGuard: CanActivateFn = (route, state) => {
  return true;
};
