import React from 'react';
import ReactDOM from 'react-dom';
import route from './router/Router'
import './tools/rem'

import './styles/app.scss'
import './styles/routerAnimation.scss'
import './styles/index/index.scss'
import './styles/index/recommend.scss'
import './styles/index/video.scss'
import './styles/index/follow.scss'
import './styles/index/hot.scss'
import './styles/index/recent.scss'

import 'react-photoswipe/lib/photoswipe.css'
import './styles/component/comments.scss'
import './styles/component/statusBar.scss'
import './styles/component/loading.scss'

import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(route, document.getElementById('root'));
registerServiceWorker();
