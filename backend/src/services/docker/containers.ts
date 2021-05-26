/** @format */

import * as containerApi from '../../docker/containers';
import Router from '@koa/router';
import { Next, ParameterizedContext } from 'koa';
import { AxiosResponse } from 'axios';

const containerService = new Router({
  prefix: '/containers',
});

containerService.get('/', async (ctx, next) => {
  const verbose = ctx.query['verbose'] === 'true';
  try {
    ctx.response.body = await containerApi.list(verbose);
    await next();
  } catch (err) {
    console.log((err as Error).stack);
    ctx.throw(JSON.stringify({ error: err.message }), 500);
  }
});

const makeCotainerActionEndpoint = (
  action: (id: string) => Promise<AxiosResponse>
) => {
  return async (
    ctx: ParameterizedContext<any, Router.RouterParamContext<any, {}>, any>,
    next: Next
  ) => {
    if (!ctx.request.body.id) {
      ctx.throw(JSON.stringify({ error: 'Container id is not provided' }), 400);
    }
    const id = ctx.request.body.id;
    const resp = await action(id);
    console.log(resp);
    if (resp.status !== 204) {
      const respCode = resp.status === 404 ? 400 : resp.status;
      ctx.throw(JSON.stringify({ error: resp.data.message }), respCode);
    } else {
      ctx.response.body = resp.data;
    }
    await next();
  };
};

containerService.post('/stop', makeCotainerActionEndpoint(containerApi.stop));
containerService.post(
  '/restart',
  makeCotainerActionEndpoint(containerApi.restart)
);
containerService.post('/pause', makeCotainerActionEndpoint(containerApi.pause));
containerService.post(
  '/unpause',
  makeCotainerActionEndpoint(containerApi.unpause)
);

export default containerService.routes();
