import * as path from 'path';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as react from 'koa-react-view';
import * as staticCache from 'koa-static-cache';
import router from './routes';

const port = process.env.PORT || 3000;

const viewsPath = path.resolve(__dirname, 'views');
const publicPath = path.resolve(__dirname, 'public');

const app = new Koa();
react(app, {
    extname: 'tsx',
    views: viewsPath
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticCache(publicPath));

const server = app.listen(port);
console.log('Server listening on %s:%s', server.address().address, server.address().port);