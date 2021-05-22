/** @format */

import Router from '@koa/router';
import { mem } from 'systeminformation';


const memoryService = new Router({ prefix: '/memory' });
const BYTES_IN_MB = 1024 * 1024;
const toMb = (v: number) => v / BYTES_IN_MB;
memoryService.get('/', async (ctx, next) => {

  try {
    const memInfoRaw = await mem();
    const { total, free, active, swapused, swaptotal, cached, buffcache } = memInfoRaw;
    const percentages = {
      free: (free / total) * 100,
      used: (active / total) * 100,
    };
    const res = {
      total: toMb(total),
      used: toMb(active),
      swapUsed: toMb(swapused),
      swapTotal: toMb(swaptotal),
      usedPercent: percentages.used,
      cached: toMb(cached),
      bufferCache: toMb(buffcache)
    };
    ctx.response.body = res;
  } catch (err) {
    ctx.throw(JSON.stringify({ error: err.message }), 500);
    console.log(err);
  } finally {
    next();
  }
});
memoryService.get('/load', async (ctx, next) => {
  try {
    const { total, active, buffcache } = await mem()
    ctx.response.body = {
      usedPercent: active / total * 100,
      used: toMb(active),
      bufferCache: toMb(buffcache)
    }
  } catch (err) {
    ctx.throw(JSON.stringify({ error: err.message }), 500);
    console.log(err)
  } finally {
    await next()
  }

})
export default memoryService.routes();
