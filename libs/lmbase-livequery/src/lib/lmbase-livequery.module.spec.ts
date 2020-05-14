import { async, TestBed } from '@angular/core/testing';
import { LmbaseLivequeryModule } from './lmbase-livequery.module';

describe('LmbaseLivequeryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseLivequeryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseLivequeryModule).toBeDefined();
  });
});
