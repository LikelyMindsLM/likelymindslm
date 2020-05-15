import { async, TestBed } from '@angular/core/testing';
import { LmbaseRemoteSyncModule } from './remote-sync.module';

describe('LmbaseSyncModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LmbaseRemoteSyncModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LmbaseRemoteSyncModule).toBeDefined();
  });
});
