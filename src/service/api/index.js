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


const api = {
    recommend: getRecommend,
    comments: getComments,
    getVideos
};

module.exports = api;