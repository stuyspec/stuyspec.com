import Provider from 'react-redux/lib/components/Provider';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';

import core from './core';
import articles from './articles';
import sections from './sections';

const {HomePage, PageLayout} = core.components;
const {ArticlePage} = articles.components;
const {SectionPage} = sections.components;
// TODO: Jason Kao please look into this Layout Thing


// TODO: change to mapStateToProps
const allSectionRoutes = sections.selectors.getAllSectionRoutes(store.getState());

const RoutingApp = () => {
  const createSectionRoutes = () => {
    return Object.keys(allSectionRoutes).map((key, index) => {
      const sectionRoute = allSectionRoutes[key];
      return <Route
        exact path={sectionRoute.pathToSectionPage}
        key={`sectionRoute${index}`}
        render={(props) => (
          <SectionPage history={props.history}
                       location={props.location}
                       match={props.match}
                       section={sectionRoute}
                       subsections={sectionRoute.subsections}/>
        )}/>
    });
  };
  const createArticleRoutes = () => {
    return Object.keys(allSectionRoutes).map((key, index) => {
      const sectionRoute = allSectionRoutes[key];
      return <Route
        exact path={sectionRoute.pathToSectionPage + "/:article_slug"}
        key={`articleRoute${index}`}
        render={(props) => (
          <ArticlePage history={props.history}
                       location={props.location}
                       match={props.match}
                       section={sectionRoute}/>
        )}/>
    });
  };
  return (
    <Provider store={store}>
      <ConnectedRouter history={appHistory}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          {createSectionRoutes()}
          {createArticleRoutes()}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default RoutingApp;
