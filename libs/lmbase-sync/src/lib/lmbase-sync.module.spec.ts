import { async, TestBed } from '@angular/core/testing';
import { LmbaseSyncModule } from './lmbase-sync.module';

describe('LmbaseSyncModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseSyncModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseSyncModule).toBeDefined();
  });
});
