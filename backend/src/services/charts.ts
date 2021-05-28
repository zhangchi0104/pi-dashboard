/** @format */

import Router from '@koa/router';
import dayjs from 'dayjs';
import { mem, currentLoad } from 'systeminformation';
import { round } from 'lodash';
const chartsService = new Router({
  prefix: '/charts',
});

chartsService.get('/loads', async (ctx, next) => {
  try {
    const [memResp, loadResp] = await Promise.all([mem(), currentLoad()]);
    const nowTimeStr = dayjs().format('YYYY/MM/DD HH:mm:ss');
    const res = {
      memory: [nowTimeStr, round((memResp.active / memResp.total) * 100, 2)],
      cpu: [nowTimeStr, round(loadResp.currentLoad, 2)],
    };
    ctx.response.body = res;
  } catch (err) {
    ctx.throw(JSON.stringify({ error: err.message }), 500);
  } finally {
    await next();
  }
});

export default chartsService.routes();
