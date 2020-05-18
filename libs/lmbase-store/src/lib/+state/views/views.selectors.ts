import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  VIEWS_FEATURE_KEY,
  State,
  ViewsPartialState,
  viewsAdapter
} from './views.reducer';

// Lookup the 'Views' feature state managed by NgRx
export const getViewsState = createFeatureSelector<ViewsPartialState, State>(
  VIEWS_FEATURE_KEY
);

const { selectAll, selectEntities } = viewsAdapter.getSelectors();

export const getViewsLoaded = createSelector(
  getViewsState,
  (state: State) => state.loaded
);

export const getViewsError = createSelector(
  getViewsState,
  (state: State) => state.error
);

export const getAllViews = createSelector(getViewsState, (state: State) =>
  selectAll(state)
);

export const getViewsEntities = createSelector(getViewsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getViewsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getViewsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
