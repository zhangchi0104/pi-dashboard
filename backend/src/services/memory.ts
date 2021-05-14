/** @format */

import Router from '@koa/router';
import { mem } from 'systeminformation';

const memoryService = new Router({ prefix: '/memory' });

memoryService.get('/', async (ctx, next) => {
  const BYTES_IN_MB = 1024 * 1024;
  try {
    const memInfoRaw = await mem();
    const { total, free, used, swapused, swaptotal, cached } = memInfoRaw;
    const toMb = (v: number) => v / BYTES_IN_MB;
    const percentages = {
      free: (free / total) * 100,
      used: (used / total) * 100,
    };
    const res = {
      total: toMb(total),
      used: toMb(used),
      swapUsed: toMb(swapused),
      swapTotal: toMb(swaptotal),
      usedPercent: percentages.used,
      cached: toMb(cached),
    };
    ctx.response.body = res;
  } catch (err) {
    ctx.throw(JSON.stringify({ error: err.message }), 500);
    console.log(err);
  } finally {
    next();
  }
});

export default memoryService.routes();
