export const GET_COMMENT = 'GET_COMMENT';
export const GET_IMAGEDETAIL_DATA = 'GET_IMAGEDETAIL_DATA';

//获取评论
export const getComment = content => {
    return {
        type: GET_COMMENT,
        content
    }
};

//获取图片详情页数据
export const getImageDetailData = data => {
    return {
        type: GET_IMAGEDETAIL_DATA,
        data
    }
};