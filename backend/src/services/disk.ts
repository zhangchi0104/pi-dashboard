import Router from '@koa/router'; 
import  {fsSize, fsStats} from 'systeminformation'
const router = new Router({ prefix: "/disk"});

router.get("/", async (ctx, next) => {
  try {
    const [sizeInfo] = await Promise.all([fsSize(), fsStats()])
    const sizeResp = sizeInfo.map(item => ({
      used: item.used,
      available: item.available,
      total: item.size,
      usedPercent: item.use,
      mountPoint: item.mount
    }))
    ctx.response.body = sizeResp
  } catch (e) {
    console.log(e);
    ctx.throw(500, JSON.stringify({ error: e.message }))
  } finally {
    next()
  }
})

export default router.routes();