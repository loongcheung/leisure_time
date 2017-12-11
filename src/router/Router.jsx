import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import App from "../app";
import Index from "../component/index/Index";
import Recommend from "../component/index/Recommend";
import Video from "../component/index/Video";
import Follow from "../component/index/Follow";
import Hot from "../component/index/Hot";
import Recent from "../component/index/Recent";
import FindIndex from "../component/find/Index";
import ImageDetails from "../component/details/ImageDetails";

/*组件根路由*/
const Root = ({match}) => (
    <div>
        <Route path={`${match.url}page`} component={appParent}/>
        <Route path={`${match.url}detail`} component={detail}/>
    </div>
);

/*详情路由*/
const detail = ({match}) => (
    <div>
        <Route path={`${match.url}/image`} component={ImageDetails}/>
    </div>
);

/*页面路由*/
const appParent = ({match}) => (
    <div>
        <Route key={match.key} path={`${match.url}`} component={App}/>
        <Route key={match.key} path={`${match.url}/index`} component={indexParent}/>
        <Route key={match.key} path={`${match.url}/find`} component={findParent}/>
    </div>
);

/*页面首页路由*/
const indexParent = ({match}) => (
    <div>
        <Route path={`${match.url}/`} component={Index}/>
        <Route path={`${match.url}/recommend`} component={Recommend}/>
        <Route path={`${match.url}/video`} component={Video}/>
        <Route path={`${match.url}/follow`} component={Follow}/>
        <Route path={`${match.url}/hot`} component={Hot}/>
        <Route path={`${match.url}/recent`} component={Recent}/>
    </div>
);

/*页面发现页路由*/
const findParent = ({match}) => (
    <div>
        <Route path={`${match.url}/`} component={FindIndex}/>
    </div>
);


const RouteConfig = (
    <BrowserRouter>
        <div>
            <Route path='' component={Root}/>
            <Redirect from={''} to={'/page/index/recommend'}/>
        </div>
    </BrowserRouter>
);

export default RouteConfig;