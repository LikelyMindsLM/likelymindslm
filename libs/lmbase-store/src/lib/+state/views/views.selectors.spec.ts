import { ViewsEntity } from './views.models';
import { State, viewsAdapter, initialState } from './views.reducer';
import * as ViewsSelectors from './views.selectors';

describe('Views Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getViewsId = it => it['id'];
  const createViewsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ViewsEntity);

  let state;

  beforeEach(() => {
    state = {
      views: viewsAdapter.addAll(
        [
          createViewsEntity('PRODUCT-AAA'),
          createViewsEntity('PRODUCT-BBB'),
          createViewsEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Views Selectors', () => {
    it('getAllViews() should return the list of Views', () => {
      const results = ViewsSelectors.getAllViews(state);
      const selId = getViewsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ViewsSelectors.getSelected(state);
      const selId = getViewsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getViewsLoaded() should return the current 'loaded' status", () => {
      const result = ViewsSelectors.getViewsLoaded(state);

      expect(result).toBe(true);
    });

    it("getViewsError() should return the current 'error' state", () => {
      const result = ViewsSelectors.getViewsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
