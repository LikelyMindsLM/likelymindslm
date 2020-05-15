import { async, TestBed } from '@angular/core/testing';
import { LmbaseBatchedOpsModule } from './batched-ops.module';

describe('LmbaseBatchedOpsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseBatchedOpsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseBatchedOpsModule).toBeDefined();
  });
});
