import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import App from "../app";

import Index from "../component/index/Index";
import Recommend from "../component/index/Recommend";
import Video from "../component/index/Video";
import Follow from "../component/index/Follow";
import Hot from "../component/index/Hot";
import Recent from "../component/index/Recent";

import FindIndex from "../component/find/Index";

//React-router4以上版本嵌套路由写法
const appParent = ({match})=>(
    <div>
        <Route path={`${match.url}`} component={App}/>
        <Route path={`${match.url}index`} component={indexParent}/>
        <Route path={`${match.url}find`} component={findParent}/>
    </div>
);

const indexParent = ({match})=> (
    <div>
        <Route path={`${match.url}/`} component={Index}/>
        <Route path={`${match.url}/recommend`} component={Recommend}/>
        <Route path={`${match.url}/video`} component={Video}/>
        <Route path={`${match.url}/follow`} component={Follow}/>
        <Route path={`${match.url}/hot`} component={Hot}/>
        <Route path={`${match.url}/recent`} component={Recent}/>
    </div>
);

const findParent = ({match})=> (
    <div>
        <Route path={`${match.url}/`} component={FindIndex}/>
    </div>
);

const RouteConfig = (
    <BrowserRouter to={'./index/recommend'}>
        <div>
            <Route path='' component={appParent}/>
        </div>
    </BrowserRouter>
);

export default RouteConfig;