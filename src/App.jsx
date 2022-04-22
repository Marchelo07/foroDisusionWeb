import React from "react";
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from "./foro/Home";

export const App = ( ) => {
    return(
        <HashRouter>
            <Switch>
                <Route path="/" home='Home' component={Home} />
            </Switch>
        </HashRouter>
    )
}