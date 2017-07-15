import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';

import Article from './article/components/Article';

class RoutingApp extends Component
{
    render ()
    {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={ appHistory }>
                    <Route
                        path='/'
                        component={ Article }
                    />
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default RoutingApp