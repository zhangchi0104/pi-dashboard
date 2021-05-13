import { RootState, store } from '../store';
import axios from 'axios';

const apiConfig = store.getState().config;
let axiosClient = axios.create({
  baseURL: `http://${apiConfig.url}:${apiConfig.port}`,
  headers: {
    Authorization: `Token ${apiConfig.token}`,
  },
});

function observeStore<T>(
  reduxStore: typeof store,
  selector: (state: RootState) => T,
  onChange: (selectedState: T) => void
) {
  let currState: T;
  const handleChange = () => {
    const newState = selector(reduxStore.getState());
    if (newState !== currState) {
      currState = newState;
      onChange(currState);
    }
  };
  const unsubscribe = reduxStore.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

observeStore(
  store,
  (state) => state.config,
  (state) => {
    axiosClient.defaults.baseURL = `http://${state.url}:${state.port}`;
    axiosClient.defaults.headers = {
      Authorization: `TOKEN ${state.token}`,
    };
  }
);

axiosClient.defaults.baseURL;
