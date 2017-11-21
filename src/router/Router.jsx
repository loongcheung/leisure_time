import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Index from "../component/index/index";
import Recommend from "../component/index/Recommend";
import App from "../app";
const history = BrowserRouter;

const indexParent = ({match})=> (
    <div>
        <Route path={`${match.url}/`} component={Index}/>
        <Route path={`${match.url}/recommend`} component={Recommend}/>
    </div>
)

const RouteConfig = (
    <BrowserRouter history={history}>
        <App>
                <Route path="/index" component={indexParent}/>
                <Redirect from='*' to='/index/recommend'/>
        </App>
    </BrowserRouter>
);

export default RouteConfig;