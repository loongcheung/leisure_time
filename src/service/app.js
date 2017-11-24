/**
 * Created by zhanglongyu on 2017/11/24.
 */

const Koa = require('koa');
const app = new Koa();
const routes = require('./router/index.js');

app.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin','http://localhost:3000');
    await next();
});



app.use(routes);

app.listen(8000);
console.log('app started at port 8000');



