import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authCAGuard } from './auth-ca.guard';

describe('authCAGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCAGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
