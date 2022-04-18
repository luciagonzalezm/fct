import { TestBed } from '@angular/core/testing';

import { AuthGuardInicioGuard } from './auth-guard-inicio.guard';

describe('AuthGuardInicioGuard', () => {
  let guard: AuthGuardInicioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardInicioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
