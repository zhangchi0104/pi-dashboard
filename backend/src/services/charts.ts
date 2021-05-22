import Router from '@koa/router';
import { mem, currentLoad } from 'systeminformation'
const chartsService = new Router({
  prefix: '/charts'
});

chartsService.get('/loads', async (ctx, next) => {
  try {
    const [memResp, loadResp] = await Promise.all([mem(), currentLoad()])
    const res = {
      memory: memResp.active / memResp.total * 100,
      cpu: loadResp.currentLoad
    }
    ctx.response.body = res;
  } catch (err) {
    ctx.throw(JSON.stringify({ error: err.message }), 500)
  } finally {
    await next();
  }
})

export default chartsService.routes()
