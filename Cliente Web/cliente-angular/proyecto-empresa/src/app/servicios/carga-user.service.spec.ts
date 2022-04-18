import { TestBed } from '@angular/core/testing';

import { CargaUserService } from './carga-user.service';

describe('CargaUserService', () => {
  let service: CargaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
