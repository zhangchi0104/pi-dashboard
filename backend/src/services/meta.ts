import Router from '@koa/router';
import os from 'os'
import { exec } from 'child_process';
const router = new Router({
  prefix: '/meta'
})

interface OSRelease {
  VERSION: string,
  VERSION_ID: string,
  NAME: string,
  DISTRIB_RELEASE: string
  [index: string]: string
}

interface OSInfo {
  release: string
  distro: string,
}


async function getOsInfo() {
  return new Promise<OSInfo>((resolve: Function) => {
    process.nextTick(() => {
      const metaPath = process.env.USING_DOCKER === 'true' ? '/hostfs/etc/os-relase' : '/etc/os-release'
      console.log(metaPath)
      exec(`cat ${metaPath}`, (err, stdout) => {
        const lines = stdout.toString().split('\n')
        let release: OSRelease = {
          VERSION: "",
          VERSION_ID: "",
          NAME: "",
          DISTRIB_RELEASE: ""
        }
        lines.forEach(function (line) {
          if (line.indexOf('=') !== -1) {
            release[line.split('=')[0].trim().toUpperCase()] = line.split('=')[1].trim().replace(/"/g, '').trim()
          }
        });
        console.log(release)
        resolve({
          release: release.VERSION_ID,
          distro: release.NAME,
        })
      })
    })
  })
}
router.get('/', async (ctx, next) => {
  try {
    const { distro, release } = await getOsInfo(); // get os Info
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
router.get('/uptime', async (ctx, next) => {
  const upTime = os.uptime();
  ctx.response.body = {
    upTime: upTime
  }
  await next()
})
export default router.routes()