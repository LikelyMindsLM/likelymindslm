import { async, TestBed } from '@angular/core/testing';
import { LmbaseStoreModule } from './store.module';

describe('LmbaseStoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseStoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseStoreModule).toBeDefined();
  });
});
