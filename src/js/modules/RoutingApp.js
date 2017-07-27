import Provider from 'react-redux/lib/components/Provider';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';

import core from './core';
const { ArticlePage , HomePage, SectionPage } = core;

class RoutingApp extends Component
{
  createSectionRoutes( sections ) {
    return Object.keys(sections).map(function(key) {
      let section = sections[key];
      return <Route
        exact path={ "/"+section.slug }
        key={ section.id }
        render={(props) => (
          <SectionPage history={ props.history }
            location={ props.location }
            match={ props.match }
            section={ section }/>
        )}/>    
    })
  }

  createArticleRoutes( sections ) {
    return Object.keys(sections).map(function(key) {
      let section = sections[key];
      return <Route
        exact path={ "/"+section.slug+"/:article_slug" }
        key={ section.id }
        render={(props) => (
          <ArticlePage history={ props.history }
            location={ props.location }
            match={ props.match }
            section={ section }/>
        )}/> 
    })
  }

  render ()
  {
    
    const sections = store.getState().core.entities.sections;
    return (
      <Provider store={ store }>
          <ConnectedRouter history={ appHistory }>
              <Switch>
                  <Route exact path="/" component={ HomePage } />
                  { this.createSectionRoutes(sections) }
                  { this.createArticleRoutes(sections) }
              </Switch>
          </ConnectedRouter>
      </Provider>
    );
  }
}

export default RoutingApp