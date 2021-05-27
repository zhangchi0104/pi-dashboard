/** @format */

import Router from '@koa/router';
import * as services from '../../docker/services';

const srvService = new Router({
  prefix: '/services',
});

srvService.get('/', async (ctx, next) => {
  const resp = await services.list();
  if (resp.status / 100 !== 2) {
    ctx.throw(JSON.stringify({ error: resp.data.message }), resp.status);
  }
  ctx.response.body = resp.data;
  await next();
});

export default srvService.routes();
