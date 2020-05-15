import { async, TestBed } from '@angular/core/testing';
import { LmbaseLiveQueryModule } from './live-query.module';

describe('LmbaseStoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseLiveQueryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseLiveQueryModule).toBeDefined();
  });
});
