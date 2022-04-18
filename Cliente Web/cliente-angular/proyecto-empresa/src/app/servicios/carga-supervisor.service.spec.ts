import { TestBed } from '@angular/core/testing';

import { CargaSupervisorService } from './carga-supervisor.service';

describe('CargaSupervisorService', () => {
  let service: CargaSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
