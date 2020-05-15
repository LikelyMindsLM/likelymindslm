import { ViewsEntity } from './views.models';
import * as ViewsActions from './views.actions';
import { State, initialState, reducer } from './views.reducer';

describe('Views Reducer', () => {
  const createViewsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ViewsEntity);

  beforeEach(() => {});

  describe('valid Views actions', () => {
    it('loadViewsSuccess should return set the list of known Views', () => {
      const views = [
        createViewsEntity('PRODUCT-AAA'),
        createViewsEntity('PRODUCT-zzz')
      ];
      const action = ViewsActions.loadViewsSuccess({ views });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
