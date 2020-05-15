import { async, TestBed } from '@angular/core/testing';
import { LmbaseIdbAdapterModule } from './idb-adapter.module';

describe('LmbaseAdapterModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseIdbAdapterModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseIdbAdapterModule).toBeDefined();
  });
});
