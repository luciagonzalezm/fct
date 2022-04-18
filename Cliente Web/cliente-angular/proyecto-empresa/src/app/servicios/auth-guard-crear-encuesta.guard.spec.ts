import { TestBed } from '@angular/core/testing';

import { AuthGuardCrearEncuestaGuard } from './auth-guard-crear-encuesta.guard';

describe('AuthGuardCrearEncuestaGuard', () => {
  let guard: AuthGuardCrearEncuestaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardCrearEncuestaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
