import { TestBed } from '@angular/core/testing';

import { AuthGuardModificarSupervisorsGuard } from './auth-guard-modificar-supervisors.guard';

describe('AuthGuardModificarSupervisorsGuard', () => {
  let guard: AuthGuardModificarSupervisorsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardModificarSupervisorsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
