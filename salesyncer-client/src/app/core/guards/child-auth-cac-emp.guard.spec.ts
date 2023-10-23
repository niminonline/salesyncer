import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { childAuthCACEmpGuard } from './child-auth-cac-emp.guard';

describe('childAuthCACEmpGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childAuthCACEmpGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
