import { Request } from 'koa';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx: any, next) => {
    ctx.status = 200;
    ctx.render('index');
    await next();
});

export default router;