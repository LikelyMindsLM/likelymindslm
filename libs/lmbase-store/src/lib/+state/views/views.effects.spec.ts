import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ViewsEffects } from './views.effects';
import * as ViewsActions from './views.actions';

describe('ViewsEffects', () => {
  let actions: Observable<any>;
  let effects: ViewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ViewsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ViewsEffects);
  });

  describe('loadViews$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ViewsActions.loadViews() });

      const expected = hot('-a-|', {
        a: ViewsActions.loadViewsSuccess({ views: [] })
      });

      expect(effects.loadViews$).toBeObservable(expected);
    });
  });
});
