import Router from '@koa/router';
import cpuService from './cpu'
import memoryService from './memory'
import diskService from './disk'
import metaService from './meta'
const API_VERSION = "v1"
const rootService = new Router({ prefix: `/api/${API_VERSION}` });
rootService.use(cpuService)
rootService.use(memoryService)
rootService.use(diskService)
rootService.use(metaService)
export default rootService.routes()