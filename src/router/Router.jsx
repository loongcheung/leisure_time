import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Status from "../component/common/Status";
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
            <Route path={`${match.url}`} component={Status}/>
            <Route path={`${match.url}/index`} component={indexParent}/>
            <Route path={`${match.url}/find`} component={findParent}/>
        </div>
);

/*
路由过渡动画实现
const appParent = ({match, location}) => (
 <CSSTransitionGroup transitionName={'left'} transitionEnter={true} transitionLeave={true}
 transitionEnterTimeout={400} transitionLeaveTimeout={400}>
 <div key={location.key}>
 <Route path={`${match.url}`} component={Status}/>
 <Route path={`${match.url}/index`} component={indexParent}/>
 <Route path={`${match.url}/find`} component={findParent}/>
 <Route path={`${match.url}/detail`} component={detail}/>
 </div>
 </CSSTransitionGroup>
 );*/

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