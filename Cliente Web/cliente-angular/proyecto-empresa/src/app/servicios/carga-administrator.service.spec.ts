import { TestBed } from '@angular/core/testing';

import { CargaAdministratorService } from './carga-administrator.service';

describe('CargaAdministratorService', () => {
  let service: CargaAdministratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaAdministratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
