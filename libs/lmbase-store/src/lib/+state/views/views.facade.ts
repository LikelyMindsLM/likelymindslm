import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromViews from './views.reducer';
import * as ViewsSelectors from './views.selectors';

@Injectable()
export class ViewsFacade {
  loaded$ = this.store.pipe(select(ViewsSelectors.getViewsLoaded));
  allViews$ = this.store.pipe(select(ViewsSelectors.getAllViews));
  selectedViews$ = this.store.pipe(select(ViewsSelectors.getSelected));

  constructor(private store: Store<fromViews.ViewsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
