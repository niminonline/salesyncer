import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { childAuthCACGuard } from './child-auth-cac.guard';

describe('childAuthCACGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childAuthCACGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
