import { async, TestBed } from '@angular/core/testing';
import { LmbaseModule } from './lmbase.module';

describe('LmbaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseModule).toBeDefined();
  });
});
