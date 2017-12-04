/**
 * Created by zhanglongyu on 2017/11/24.
 */
const router = require('koa-router')();
const api = require('../api/index.js');

router.get('/recommend',async (ctx,next)=>{
    await api.recommend(ctx.query).then((res)=>{
        ctx.response.body = res;
    });
    await next();
});

router.get('/videos',async (ctx,next)=>{
    await api.getVideos().then((res)=>{
        ctx.response.body = res.body;
    });
    await next();
});
module.exports = router.routes();