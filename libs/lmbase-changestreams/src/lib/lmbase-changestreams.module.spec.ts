import { async, TestBed } from '@angular/core/testing';
import { LmbaseChangestreamsModule } from './lmbase-changestreams.module';

describe('LmbaseChangestreamsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseChangestreamsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseChangestreamsModule).toBeDefined();
  });
});
