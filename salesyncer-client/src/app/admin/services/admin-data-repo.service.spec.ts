import { TestBed } from '@angular/core/testing';

import { AdminDataRepoService } from './admin-data-repo.service';

describe('AdminDataRepoService', () => {
  let service: AdminDataRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDataRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
