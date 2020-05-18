import { TestBed } from '@angular/core/testing';

import { CollectionsMetadata } from './collections-metadata';

describe('CollectionsMetadataService', () => {
  let service: CollectionsMetadata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsMetadata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
