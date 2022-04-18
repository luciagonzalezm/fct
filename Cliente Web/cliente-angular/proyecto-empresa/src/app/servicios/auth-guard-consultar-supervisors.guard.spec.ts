import { TestBed } from '@angular/core/testing';

import { AuthGuardConsultarSupervisorsGuard } from './auth-guard-consultar-supervisors.guard';

describe('AuthGuardConsultarSupervisorsGuard', () => {
  let guard: AuthGuardConsultarSupervisorsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardConsultarSupervisorsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
