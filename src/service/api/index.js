/**
 * Created by zhanglongyu on 2017/11/24.
 */

const request = require('superagent');

async function getRecommend(query) {  //获取推荐图片
    let page = '';
    let type = '';
    let post_id = '';
    if (query) {
        page = query.page;
        type = query.type;
        post_id = query.post_id
    }
    return new Promise((resolve, reject) => {
        request.get('https://api.tuchong.com/feed-app').query({
            page,
            type,
            post_id
        }).end((err, res) => {
            let result = res.body;
            for (let i = 0; i < result['feedList'].length; i++) {
                if (result['feedList'][i]['type'] === 'text') { //去掉非图片项
                    result['feedList'].splice(i, 1);
                    i--;
                }
            }
            resolve(result);
            reject(err);
        })
    });
}

async function getComments(query) {  //获取评论
    let {post_id,sort_by,_rticket,page} = query;
    return new Promise((resolve, reject) => {
       request.get(`https://api.tuchong.com/2/posts/${post_id}/comments`).query({
           sort_by,
           _rticket,
           page
       }).end((err,res)=>{
           resolve(res.body);
           reject(err);
       })
    });
}

async function getVideos() {  //获取视频
    return request('GET', 'http://baobab.kaiyanapp.com/api/v4/tabs/selected')
}

async function getDiscover() {  //获取发现
    return new Promise((resolve, reject) => {
        request.get(`https://api.tuchong.com/discover-app`).end((err,res)=>{
            resolve(res.body);
            reject(err);
        })
    });
}

async function getEvents() {  //获取发现栏事件
    return new Promise((resolve, reject) => {
        request.get(`https://api.tuchong.com/events`).end((err,res)=>{
            resolve(res.body);
            reject(err);
        })
    });
}

async function getSearchRec() {  //获取搜索栏信息
    return new Promise((resolve, reject) => {
        request.get(`https://api.tuchong.com/tuchong/searchrec`).query({
            _rticket : new Date().getTime()
        }).end((err,res)=>{
            resolve(res.body);
            reject(err);
        })
    });
}

async function search(query) {  //搜索
    let {page,type,content,count,_rticket} = query;
    console.log(query)
    return new Promise((resolve, reject) => {
        request.get(`https://api.tuchong.com/tuchong/search`).query({
            page,
            type,
            query: content ? content : '""',
            count,
            _rticket,
        }).end((err,res)=>{
            resolve(res.body);
            reject(err);
        })
    });
}

const api = {
    recommend: getRecommend,
    comments: getComments,
    getVideos,
    getDiscover,
    getEvents,
    getSearchRec,
    search
};

module.exports = api;