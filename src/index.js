import React from 'react';
import ReactDOM from 'react-dom';
import route from './router/Router'
import './tools/rem'
import './styles/app.scss'
import './styles/index/index.scss'
import './styles/index/recommend.scss'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(route, document.getElementById('root'));
registerServiceWorker();
