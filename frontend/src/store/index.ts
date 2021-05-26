import { store } from './store';
import {
  RootState,
  useTypedDispatch,
  useTypedSelector,
  observeStore,
} from './store';

export { useTypedDispatch, useTypedSelector, observeStore };
export type { RootState };

export default store;
