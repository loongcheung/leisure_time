import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Index from "../component/index/index";
import Recommend from "../component/index/Recommend";
import App from "../app";

//React-router4以上版本嵌套路由写法
const indexParent = ({match})=> (
    <div>
        <Route path={`${match.url}/`} component={Index}/>
        <Route path={`${match.url}/recommend`} component={Recommend}/>
    </div>
)

const RouteConfig = (
    <BrowserRouter>
        <App> {/*React-router4以前版本嵌套路由写法*/}
                <Route path="/index" component={indexParent}/>
                <Redirect from='*' to='/index/recommend'/>
        </App>
    </BrowserRouter>
);

export default RouteConfig;