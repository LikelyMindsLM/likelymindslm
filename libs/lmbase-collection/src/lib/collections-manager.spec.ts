import { TestBed } from '@angular/core/testing';

import { CollectionsManager } from './collections-manager';

describe('CollectionsManagerService', () => {
  let service: CollectionsManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
