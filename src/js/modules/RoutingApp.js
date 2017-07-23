import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';

import core from './core';
const { ArticlePage, HomePage, SectionPage } = core;

class RoutingApp extends Component
{
    render ()
    {console.log(30);
        return (
            <Provider store={ store }>            
                <ConnectedRouter history={ appHistory }>
                    <Switch>
                        <Route exact path="/" component={ HomePage } />
                        <Route exact path="/:section_slug" component={ SectionPage } />
                        <Route exact path="/:section_slug/:article_slug" component={ ArticlePage } />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default RoutingApp