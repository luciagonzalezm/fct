import { TestBed } from '@angular/core/testing';

import { CargaPollService } from './carga-poll.service';

describe('CargaPollService', () => {
  let service: CargaPollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaPollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
