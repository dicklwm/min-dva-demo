/** Created by Min on 2017/6/29.  */
import { Model } from 'min-dva';
import * as Service from '../../services/LedgerDemo';

const namespace = 'Table/MTableDemo';
const initializeState = {
  query: {
    keyword: '',
    dates: [],
    status: undefined,
  },
  data: [],
  total: 0,
};
export default Model.extend({
  namespace,
  state: initializeState,
  effects: {
    *fetch(action, { callWithLoading, put, select }) {
      const query = { ...yield select(state => state[namespace].query) };
      query.start_date = query.dates[0] ? query.dates[0].format('YYYY-MM-DD') : '';
      query.end_date = query.dates[1] ? query.dates[1].format('YYYY-MM-DD') : '';
      delete query.dates;
      const res = yield callWithLoading(Service.userData, query);
      if (res.errorCode === 0) {
        yield put({
          type: 'fetchSuccess',
          payload: res.data,
        });
      }
    },
  },
  reducers: {
    fetchSuccess(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    queryDataChange(state, action) {
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload,
        },
      };
    },
    clearQuery(state) {
      return {
        ...state,
        query: initializeState.query,
      };
    },
  },
  subscriptions: {
    setup({ listen }) {
      // action为 redux action
      listen(`/${namespace}`, { type: 'fetch' });
    },
  },
});
