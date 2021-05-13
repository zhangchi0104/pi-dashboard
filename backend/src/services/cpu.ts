import Router from '@koa/router';
import {
  cpu,
  cpuCurrentSpeed,
  cpuTemperature,
  currentLoad,
} from 'systeminformation';
const router = new Router({
  prefix: '/cpu',
});


/**
 * returns all the cpu information here
 * cpu loads,
 * cpu temperature
 * cpu speed
 */
router.get('/', async (ctx, next)=> {
  try {
    const allInfo = await Promise.all([
      cpu(),
      cpuCurrentSpeed(),
      cpuTemperature(),
      currentLoad(),
    ]);
    const [cpuData, speed, temperature, load] = allInfo;
    const resp = {
      coreCount: cpuData.cores,
      clockSpeed: speed.avg,
      temperature: temperature.main,
      load: {
        total: load.currentLoad,
        user: load.currentLoadUser,
        nice: load.currentLoadNice,
        system: load.currentLoadSystem,
        idle: load.currentLoadIdle,
        cpus: load.cpus.map((item) => ({
          total: item.load,
          user: item.loadUser,
          nice: item.loadNice,
          system: item.loadSystem,
          idle: item.loadIdle,
        })),
      },
    };
    ctx.response.body = resp;
  } catch (err) {
    ctx.throw(JSON.stringify({error: 'Unkown error'}), 500);
    console.log(err.msg);
  } finally {
    next();
  }
});

export default router.routes();
