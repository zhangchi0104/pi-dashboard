/** @format */

import Router from '@koa/router';
import * as services from '../../docker/services';

const srvService = new Router({
  prefix: '/services',
});

export default srvService.routes();
