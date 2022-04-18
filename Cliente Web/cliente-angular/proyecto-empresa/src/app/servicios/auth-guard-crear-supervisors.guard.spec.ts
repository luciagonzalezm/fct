import { TestBed } from '@angular/core/testing';

import { AuthGuardCrearSupervisorsGuard } from './auth-guard-crear-supervisors.guard';

describe('AuthGuardCrearSupervisorsGuard', () => {
  let guard: AuthGuardCrearSupervisorsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCrearSupervisorsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
