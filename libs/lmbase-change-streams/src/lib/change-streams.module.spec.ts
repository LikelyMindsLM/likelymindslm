import { async, TestBed } from '@angular/core/testing';
import { LmbaseChangeStreamsModule } from './change-streams.module';

describe('LmbaseChangestreamsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseChangeStreamsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseChangeStreamsModule).toBeDefined();
  });
});
