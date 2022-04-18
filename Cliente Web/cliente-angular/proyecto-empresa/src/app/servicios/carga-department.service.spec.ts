import { TestBed } from '@angular/core/testing';

import { CargaDepartmentService } from './carga-department.service';

describe('CargaDepartmentService', () => {
  let service: CargaDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
