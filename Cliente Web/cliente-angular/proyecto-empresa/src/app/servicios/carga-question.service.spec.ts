import { TestBed } from '@angular/core/testing';

import { CargaQuestionService } from './carga-question.service';

describe('CargaQuestionService', () => {
  let service: CargaQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
