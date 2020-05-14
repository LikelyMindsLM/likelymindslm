import { TestBed } from '@angular/core/testing';

import { LmbaseService } from './lmbase.service';

describe('LmbaseService', () => {
  let service: LmbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
