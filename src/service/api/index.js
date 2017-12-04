/**
 * Created by zhanglongyu on 2017/11/24.
 */

const request = require('superagent');

async function getRecommend(query) {
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
                    result['feedList'].splice(i,1);
                    i--;
                }
            }
            resolve(result);
            reject(err);
        })
    });
}

async function getVideos() {
    return request('GET','http://baobab.kaiyanapp.com/api/v4/tabs/selected')
}

const api = {
    recommend: getRecommend,
    getVideos
};

module.exports = api;