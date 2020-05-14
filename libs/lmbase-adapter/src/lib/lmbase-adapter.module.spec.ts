import { async, TestBed } from '@angular/core/testing';
import { LmbaseAdapterModule } from './lmbase-adapter.module';

describe('LmbaseAdapterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseAdapterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseAdapterModule).toBeDefined();
  });
});
