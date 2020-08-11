import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Products from './pages/Products';

ReactDOM.render(
        <Router>
            <Switch>
                <Route path="/products/:page">
                  <Products />
                </Route>
                <Route path="/">
                  <Products />
                </Route>
            </Switch>
        </Router>
    , document.getElementById('root'));


