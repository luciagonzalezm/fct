import { TestBed } from '@angular/core/testing';

import { AuthGuardModificarUsersGuard } from './auth-guard-modificar-users.guard';

describe('AuthGuardModificarUsersGuard', () => {
  let guard: AuthGuardModificarUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardModificarUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
