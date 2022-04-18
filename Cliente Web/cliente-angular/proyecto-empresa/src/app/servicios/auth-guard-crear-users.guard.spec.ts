import { TestBed } from '@angular/core/testing';

import { AuthGuardCrearUsersGuard } from './auth-guard-crear-users.guard';

describe('AuthGuardCrearUsersGuard', () => {
  let guard: AuthGuardCrearUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCrearUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
