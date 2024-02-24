import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeAuthCACGuard } from './employee-auth-cac.guard';

describe('employeeAuthCACGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeAuthCACGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
