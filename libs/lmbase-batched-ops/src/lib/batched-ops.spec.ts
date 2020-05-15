import { TestBed } from '@angular/core/testing';

import { BatchedOps } from './batched-ops';

describe('BatchedOps', () => {
  let service: BatchedOps;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchedOps);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
