import { createAction, props } from '@ngrx/store';
import { ViewsEntity } from './views.models';

export const loadViews = createAction('[Views] Load Views');

export const loadViewsSuccess = createAction(
  '[Views] Load Views Success',
  props<{ views: ViewsEntity[] }>()
);

export const loadViewsFailure = createAction(
  '[Views] Load Views Failure',
  props<{ error: any }>()
);
