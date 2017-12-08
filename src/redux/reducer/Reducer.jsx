import {GET_COMMENT,GET_IMAGEDETAIL_DATA} from "../action/Action";

export const comment = (state = {}, action) => {
    switch (action.type) {
        case GET_COMMENT:
            state['content'] = action.content;
            return Object.assign({},state);
        default:
            return state;
    }
};

//图片数据
export const imageData = (state = {}, action) => {
    switch (action.type) {
        case GET_IMAGEDETAIL_DATA:
            return Object.assign({},action.data);
        default:
            return state
    }
};