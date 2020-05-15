import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromViews from './views.reducer';
import * as ViewsActions from './views.actions';

@Injectable()
export class ViewsEffects {
  loadViews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewsActions.loadViews),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ViewsActions.loadViewsSuccess({ views: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ViewsActions.loadViewsFailure({ error });
        }
      })
    )
  );

  constructor(private actions$: Actions) {}
}
