import { TestBed } from '@angular/core/testing';

import { CargaLoginService } from './carga-login.service';

describe('CargaLoginService', () => {
  let service: CargaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
