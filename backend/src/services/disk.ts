import Router from '@koa/router';
import { diskLayout, fsSize, fsStats } from 'systeminformation'
const router = new Router({ prefix: "/disk" });

router.get("/", async (ctx, next) => {
  try {
    const [sizeInfo, layoutResp] = await Promise.all([fsSize(), diskLayout()])
    const sizeResp = sizeInfo.map(item => ({
      used: item.used,
      available: item.available,
      total: item.size,
      usedPercent: item.use,
      mountPoint: item.mount,

    }))
    ctx.response.body = {
      usages: sizeResp,
      type: layoutResp[0].type,
      interface: layoutResp[0].interfaceType
    }
  } catch (e) {
    console.log(e);
    ctx.throw(500, JSON.stringify({ error: e.message }))
  } finally {
    next()
  }
})

export default router.routes();