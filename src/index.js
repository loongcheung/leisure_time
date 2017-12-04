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
import registerServiceWorker from './registerServiceWorker';

import 'react-photoswipe/lib/photoswipe.css'

import './styles/loading.scss'

ReactDOM.render(route, document.getElementById('root'));
registerServiceWorker();
