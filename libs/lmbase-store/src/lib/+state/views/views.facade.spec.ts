import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ViewsEntity } from './views.models';
import { ViewsEffects } from './views.effects';
import { ViewsFacade } from './views.facade';

import * as ViewsSelectors from './views.selectors';
import * as ViewsActions from './views.actions';
import {
  VIEWS_FEATURE_KEY,
  State,
  initialState,
  reducer
} from './views.reducer';

interface TestSchema {
  views: State;
}

describe('ViewsFacade', () => {
  let facade: ViewsFacade;
  let store: Store<TestSchema>;
  const createViewsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ViewsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VIEWS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ViewsEffects])
        ],
        providers: [ViewsFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ViewsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allViews$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ViewsActions.loadViews());

        list = await readFirst(facade.allViews$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadViewsSuccess` to manually update list
     */
    it('allViews$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allViews$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ViewsActions.loadViewsSuccess({
            views: [createViewsEntity('AAA'), createViewsEntity('BBB')]
          })
        );

        list = await readFirst(facade.allViews$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
