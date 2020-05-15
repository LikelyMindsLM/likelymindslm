import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ViewsActions from './views.actions';
import { ViewsEntity } from './views.models';

export const VIEWS_FEATURE_KEY = 'views';

export interface State extends EntityState<ViewsEntity> {
  selectedId?: string | number; // which Views record has been selected
  loaded: boolean; // has the Views list been loaded
  error?: string | null; // last none error (if any)
}

export interface ViewsPartialState {
  readonly [VIEWS_FEATURE_KEY]: State;
}

export const viewsAdapter: EntityAdapter<ViewsEntity> = createEntityAdapter<
  ViewsEntity
>();

export const initialState: State = viewsAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const viewsReducer = createReducer(
  initialState,
  on(ViewsActions.loadViews, state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(ViewsActions.loadViewsSuccess, (state, { views }) =>
    viewsAdapter.addAll(views, { ...state, loaded: true })
  ),
  on(ViewsActions.loadViewsFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return viewsReducer(state, action);
}
