import { async, TestBed } from '@angular/core/testing';
import { LmbaseCollectionModule } from './collection.module';

describe('LmbaseCollectionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseCollectionModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseCollectionModule).toBeDefined();
  });
});
