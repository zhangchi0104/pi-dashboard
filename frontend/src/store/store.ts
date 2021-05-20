import axios, { AxiosRequestConfig } from 'axios'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appBarReducers from './appBar';
import configReducers from './config';
import dashboardReducers from './dashboard';
const axiosClient = axios.create();
export const store = configureStore({
  reducer: {
    appbar: appBarReducers,
    config: configReducers,
    dashboard: dashboardReducers
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: {
      extraArgument: {
        client: axiosClient
      }
    }
  }),
  devTools: process.env.NODE_ENV === 'development',
});

function configClient(options: AxiosRequestConfig) {

  axiosClient.interceptors.request.use(config => {
    config.baseURL = options.baseURL;
    config.headers = { ...config.headers, ...options.headers }
    return config
  })
}
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
observeStore(store, state => state.config, config => {
  configClient({
    baseURL: `http://${config.url}:${config.port}${config.apiPath}`,
    headers: {
      Authorization: config.token ? `Token ${config.token}` : ""
    }
  })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export interface TypedThunkApi {
  dispatch: AppDispatch,
  extra: {
    client: typeof axiosClient
  },
  state: RootState
}