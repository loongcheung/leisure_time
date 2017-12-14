export const GET_COMMENT = 'GET_COMMENT';
export const GET_IMAGEDETAIL_DATA = 'GET_IMAGEDETAIL_DATA';
export const GET_PERSONAL_IMAGE_DATA = 'GET_PERSONAL_IMAGE_DATA';
export const REFRESH = 'REFRESH';

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

//获取个人信息页图片数据
export const getPersonalImageData = data => {
    return {
        type: GET_PERSONAL_IMAGE_DATA,
        data
    }
};

//点击刷新
export const refresh = data => {
    return {
        type: REFRESH,
        data
    }
};
