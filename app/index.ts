import koa from 'koa';
import serve from 'koa-static';

const app = koa();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(serve(publicDir));
app.use(renderApp);

app.listen(port, () => console.log({ port, env: process.env.NODE_ENV, pid: process.pid }, 'Server is listening'));