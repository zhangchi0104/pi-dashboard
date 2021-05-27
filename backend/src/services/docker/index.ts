/** @format */

import Router from '@koa/router';
import containerService from './containers';
import srvService from './services';

const dockerService = new Router({
  prefix: '/docker',
});

dockerService.use(containerService);
dockerService.use(srvService);
export default dockerService.routes();
