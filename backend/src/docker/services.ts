/** @format */

import { AxiosResponse } from 'axios';
import client from './client';
import { makeModulePath } from './helpers';
interface BuilderArgs<T> {
  request: (args: T) => Promise<AxiosResponse>;
}
function apiBuilder<T = void>(args: BuilderArgs<T>) {
  return async (config: T) => {
    try {
      const resp = await args.request(config);
      return resp;
    } catch (err) {
      return err.response as AxiosResponse<any>;
    }
  };
}
const BASE_PATH = '/services';
const modulePath = makeModulePath(BASE_PATH);
export const list = apiBuilder({
  request: () => client.get(modulePath('')),
});
