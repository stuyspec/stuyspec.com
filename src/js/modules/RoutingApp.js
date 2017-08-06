import React from 'react';
import { Route, Switch } from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { connect } from 'react-redux';
import store from '../store';

import core from './core';
import articles from './articles';
import sections from './sections';
import users from './users';

const { HomePage, PageLayout } = core.components;
const { ArticlePage } = articles.components;
const { SectionPage } = sections.components;
const { RolePage, UserPage } = users.components;

const RoutingApp = ({ allSectionRoutes, allRoles }) => {
  const createSectionRoutes = () => {
    return Object.keys(allSectionRoutes).map((key, index) => {
      const sectionRoute = allSectionRoutes[ key ];
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
    });
  };
  const createRoleRoutes = () => {
    return Object.keys(allRoles).map((roleSlug) => {
      return <Route
        exact path={`/${roleSlug}`}
        render={(props) => (
          <RolePage history={props.history}
                    location={props.location}
                    match={props.match}
                    role={allRoles[ roleSlug ]}/>
        )}/>
    })
  }
  const createUserRoutes = () => {
    return Object.keys(allRoles).map((roleSlug) => {
      return <Route
        exact path={`/${roleSlug}/:user_slug`}
        render={(props) => (
          <UserPage history={props.history}
                    location={props.location}
                    match={props.match}
                    role={allRoles[ roleSlug ]}/>
        )}/>
    })
  }
  return (
      <ConnectedRouter history={appHistory}>
        <PageLayout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {createSectionRoutes()}
            {createArticleRoutes()}
            {createRoleRoutes()}
            {createUserRoutes()}
          </Switch>
        </PageLayout>
      </ConnectedRouter>
  );
};

const mapStateToProps = (state) => ({
  allSectionRoutes: sections.selectors.getAllSectionRoutes(state),
  allRoles: users.selectors.getAllRoles(state),
});

export default connect(
  mapStateToProps,
  null
) (RoutingApp);
