import { TestBed } from '@angular/core/testing';

import { IdbAdapter } from './idb-adapter';

describe('DexieService', () => {
  let service: IdbAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdbAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
