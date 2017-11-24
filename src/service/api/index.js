/**
 * Created by zhanglongyu on 2017/11/24.
 */

const request = require('superagent');

async function picSpider(query) {
    let page = '';
    let type = '';
    if (query) {
        page = query.page;
        type = query.type;
    }
    return request('GET','https://api.tuchong.com/feed-app',{
        page,
        type
    })
}

const api = {
    recommend: picSpider
};

module.exports = api;