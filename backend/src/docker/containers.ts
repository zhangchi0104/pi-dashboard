/** @format */

import { AxiosResponse } from 'axios';
import client from './client';
import { makeModulePath } from './helpers';

const moduleUrl = '/containers';
const modulePath = makeModulePath(moduleUrl);

export const list = async (verbose: boolean = false) => {
  const message = await client.get(modulePath('/json'));
  const containers = message.data as any[];
  if (!verbose) {
    return containers.map((v) => ({
      id: v.Id,
      name: v.Image,
      command: v.Command,
      created: v.Created,
      status: v.Status,
      ports: v.Ports,
      service: v.Labels!['com.docker.compose.project'] || null,
    }));
  }
  return containers;
};
function makeContainerAction(action: string) {
  return async (id: string) => {
    try {
      const resp = await client.post(modulePath(`${id}/${action}`));
      return resp;
    } catch (err) {
      return err.response as AxiosResponse<any>;
    }
  };
}
export const stop = makeContainerAction('stop');

export const restart = makeContainerAction('restart');

export const pause = makeContainerAction('pause');

export const unpause = makeContainerAction('unpause');
