import Provider from 'react-redux/lib/components/Provider';
import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store from '../store';

import core from './core';
import articles from './articles';
import sections from './sections';
import Layout from './core/components/PageLayout'

const { HomePage } = core.components;
const { ArticlePage } = articles.components;
const { SectionPage } = sections.components;
//const { Layout } = core.components;
// Jason Kao please look into this Layout Thing

const allSectionRoutes = sections.selectors.getAllSectionRoutes( store.getState() ); // change to mapStateToProps

const RoutingApp = () => {
  const createSectionRoutes = () => {
    return Object.keys(allSectionRoutes).map((key, index) => {
      const sectionRoute = allSectionRoutes[ key ];
      return (<Route
        exact path={sectionRoute.pathToSectionPage}
        key={`sectionRoute${index}`}
        render={(props) => (
          <SectionPage history={props.history}
                       location={props.location}
                       match={props.match}
                       section={sectionRoute}
                       subsections={sectionRoute.subsections}/>
        )}/>
      );
    });
  };
  const createArticleRoutes = () => {
    return Object.keys(allSectionRoutes).map((key, index) => {
      const sectionRoute = allSectionRoutes[ key ];
      return <Route
        exact path={sectionRoute.pathToSectionPage + "/:article_slug"}
        key={`articleRoute${index}`}
        render={(props) => (
          <ArticlePage history={props.history}
                       location={props.location}
                       match={props.match}
                       section={sectionRoute}/>
        )}/>
    })
  };
  return (
    <Provider store={store}>
       <ConnectedRouter history={appHistory}>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            { createSectionRoutes() }
            { createArticleRoutes() }
          </Switch>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
};

export default RoutingApp;