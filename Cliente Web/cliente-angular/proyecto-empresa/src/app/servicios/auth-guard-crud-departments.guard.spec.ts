import { TestBed } from '@angular/core/testing';

import { AuthGuardCrudDepartmentsGuard } from './auth-guard-crud-departments.guard';

describe('AuthGuardCrudDepartmentsGuard', () => {
  let guard: AuthGuardCrudDepartmentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCrudDepartmentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
