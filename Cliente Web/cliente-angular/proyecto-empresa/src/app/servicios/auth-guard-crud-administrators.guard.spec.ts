import { TestBed } from '@angular/core/testing';

import { AuthGuardCrudAdministratorsGuard } from './auth-guard-crud-administrators.guard';

describe('AuthGuardCrudAdministratorsGuard', () => {
  let guard: AuthGuardCrudAdministratorsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCrudAdministratorsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
