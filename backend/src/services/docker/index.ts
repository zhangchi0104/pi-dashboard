/** @format */

import Router from '@koa/router';
import containerService from './containers';

const dockerService = new Router({
  prefix: '/docker',
});

dockerService.use(containerService);

export default dockerService.routes();
