import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { leadEditResolver } from './lead-edit.resolver';

describe('leadEditResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => leadEditResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
