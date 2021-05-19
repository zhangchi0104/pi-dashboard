import Router from '@koa/router';
import { osInfo } from 'systeminformation';
import os from 'os'
const router = new Router({
  prefix: '/meta'
})

router.get('/', async (ctx, next) => {
  try {
    const { distro, release } = await osInfo(); // get os Info
    const networkInfo = os.networkInterfaces()['eth0'];
    const usename = os.userInfo().username;
    const upTime = os.uptime();
    ctx.response.body = {
      os: `${distro} ${release}`,
      ipAddr: networkInfo![0].address,
      username: usename,
      uptime: upTime
    }
  } catch (err) {
    ctx.throw(JSON.stringify({ err: err.message }), 500)
  } finally {
    next()
  }
})

export default router.routes()