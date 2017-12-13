import React from "react";
import ReactDOM from "react-dom";
import route from "./router/Router";
import {Provider} from "react-redux";
import store from "./redux/store/Store";
import "./tools/rem";
//页面样式
import "./styles/app.scss";
import "./styles/index/index.scss";
import "./styles/index/recommend.scss";
import "./styles/index/video.scss";
import "./styles/index/follow.scss";
import "./styles/index/hot.scss";
import "./styles/index/recent.scss";
import "./styles/find/index.scss"
//组件样式
import "react-photoswipe/lib/photoswipe.css";
import "swiper/dist/css/swiper.min.css"
import "./styles/component/comments.scss";
import "./styles/component/statusBar.scss";
import "./styles/component/commentsInput.scss";
import "./styles/component/search.scss"
import "./styles/component/loading.scss";
//详情页样式
import "./styles/details/imageDetails.scss"

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
