/**
 * Created by zhanglongyu on 2017/11/24.
 */
const router = require('koa-router')();
const api = require('../api/index.js');

/*推荐页*/
router.get('/recommend', async (ctx, next) => {
    await api.recommend(ctx.query).then((res) => {
        ctx.response.body = res;
    });
    await next();
});

/*评论*/
router.get('/comments', async (ctx,next) => {
    await api.comments(ctx.query).then((res)=>{
        ctx.response.body = res;
    });
    await next();
});

/*视频*/
router.get('/videos', async (ctx, next) => {
    await api.getVideos().then((res) => {
        ctx.response.body = res.body;
    });
    await next();
});

/*发现页*/
router.get('/discover', async (ctx, next) => {
    let resJson = {};
    let banners = [];
    await api.getDiscover().then((res) => {
        banners = res.banners;
    });
    await api.getEvents().then((res) => {
        resJson.banners = banners;
        resJson.eventList = res.eventList;
        ctx.response.body = resJson;
    });
    await next();
});

/*搜索栏信息*/
router.get('/searchrec', async (ctx, next) => {
    await api.getSearchRec().then((res) => {
        ctx.response.body = res;
    });
    await next();
});

/*搜索*/
router.get('/search', async (ctx, next) => {
    await api.search(ctx.query).then((res) => {
        ctx.response.body = res;
    });
    await next();
});


module.exports = router.routes();