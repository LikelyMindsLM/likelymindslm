import { TestBed } from '@angular/core/testing';

import { Lmbase } from './lmbase';

describe('LmbaseService', () => {
  let service: Lmbase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lmbase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
