/** @format */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import apiRoot from './services/root';
import logger from 'koa-logger';
import cors from '@koa/cors';
const app = new Koa();
const APP_RORT = 3000;
app.use(logger());
// app.use(logMiddleware);
app.use(bodyParser());
app.use(
  cors({
    origin: '*',
    allowHeaders: 'Authorization',
  })
);
app.use(apiRoot);

app.listen(APP_RORT);
console.log('server is listenning on [::]:' + APP_RORT);
