/** Created by Min on 2017-07-04.  */
import { Model } from 'min-dva';
import * as Service from '../../services/LedgerDemo';

const namespace = 'Table/EditTableDemo';

export default Model.extend({
  namespace,
  state: {
    query: {
      keyword: '',
      date: [],
      status: undefined,
    },
    data: [],
  },
  effects: {
    *fetch(action, { callWithLoading, put }) {
      const res = yield callWithLoading(Service.userData);
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
  },
  subscriptions: {
    setup({ listen }) {
      // action为 redux action
      listen(`/${namespace}`, { type: 'fetch' });
    },
  },
});
