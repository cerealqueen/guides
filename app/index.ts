import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();

const port = process.env.PORT || 3000;

app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods());

app.listen(port, () => console.log({ port, env: process.env.NODE_ENV, pid: process.pid }, 'Server is listening'));