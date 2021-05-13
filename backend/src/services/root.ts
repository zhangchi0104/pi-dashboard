import Router from '@koa/router';
import cpuService from './cpu'
import memoryService from './memory'
import diskService from './disk'
const API_VERSION = "v1"
const rootService = new Router({prefix: `/api/${API_VERSION}`});
rootService.use(cpuService)
rootService.use(memoryService)
rootService.use(diskService)
export default rootService.routes()