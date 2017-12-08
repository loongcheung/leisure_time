import React from "react";
import ReactDOM from "react-dom";
import route from "./router/Router";
import {Provider} from "react-redux";
import store from "./redux/store/Store";
import "./tools/rem";

import "./styles/app.scss";
import "./styles/routerAnimation.scss";
import "./styles/index/index.scss";
import "./styles/index/recommend.scss";
import "./styles/index/video.scss";
import "./styles/index/follow.scss";
import "./styles/index/hot.scss";
import "./styles/index/recent.scss";

import "react-photoswipe/lib/photoswipe.css";
import "./styles/component/comments.scss";
import "./styles/component/statusBar.scss";
import "./styles/component/commentsInput.scss";
import "./styles/component/loading.scss";

import "./styles/details/imageDetails.scss"

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>, document.getElementById('root')
);

registerServiceWorker();
