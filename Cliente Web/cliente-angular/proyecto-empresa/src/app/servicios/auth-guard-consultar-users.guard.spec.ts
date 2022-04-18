import { TestBed } from '@angular/core/testing';

import { AuthGuardConsultarUsersGuard } from './auth-guard-consultar-users.guard';

describe('AuthGuardConsultarUsersGuard', () => {
  let guard: AuthGuardConsultarUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardConsultarUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
