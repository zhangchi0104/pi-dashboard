/** @format */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import apiRoot from './services/root';
import logger from 'koa-logger';
const app = new Koa();
const APP_RORT = 3000;
app.use(logger());
// app.use(logMiddleware);
app.use(bodyParser());

app.use(apiRoot);

app.use((ctx, next) => {
  if (ctx.status === 404) {
    ctx.throw(JSON.stringify({ error: 'resource not found' }), 404);
  }
  ctx.response.body = JSON.stringify(ctx.response.body);
  ctx.response.headers.contentType = 'application/json';
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', [
    'POST',
    'GET',
    'OPTIONS',
    'PUT',
    'DELETE',
  ]);
  ctx.set('Access-Control-Allow-Headers', ['Content-Type', 'Authorization']);
  next();
});

app.listen(APP_RORT);
console.log('server is listenning on [::]:' + APP_RORT);
