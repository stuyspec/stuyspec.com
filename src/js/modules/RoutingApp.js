import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
//import { Route, Switch } from 'react-router';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import appHistory from 'tools/appHistory';
import Article from './core/components/Article';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';


class RoutingApp extends Component
{
    render ()
    {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={ appHistory }>
                        <Switch>
                            <Route exact path="/" component={Article} />
                            <Route path="/test" component={Article} />
                            <Route component={Article} />
                        </Switch>
                </ConnectedRouter>
            </Provider>
            );
    }
}

export default RoutingApp