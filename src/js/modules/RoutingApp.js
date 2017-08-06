import React from 'react';
import { Route, Switch } from 'react-router-dom';
import appHistory from 'tools/appHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { connect } from 'react-redux';

import core from './core';
import articles from './articles';
import sections from './sections';
import users from './users';

const { HomePage, PageLayout } = core.components;
const { ArticlePage } = articles.components;
const { SectionPage } = sections.components;
const { RolePage, UserPage } = users.components;

const { getRoles } = users.selectors;
const { getSections } = sections.selectors;

const RoutingApp = ({ sections, roles, match }) => {
  const createSectionRoutes = () => {
    return Object.keys(sections).map((sectionSlug, index) => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={section.permalink}
        key={`sectionRoute${index}`}
        render={(props) => (
          <SectionPage section={section}/>
        )}/>
    });
  };
  const createArticleRoutes = () => {
    return Object.keys(sections).map((sectionSlug, index) => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={`${section.permalink}/:article_slug`}
        key={`articleRoute${index}`}
        render={(props) => (
          <ArticlePage match={props.match}
                       section={section}/>
        )}/>
    });
  };
  const createRoleRoutes = () => {
    return Object.keys(roles).map((roleSlug, index) => {
      return <Route
        exact path={`/${roleSlug}`}
        key={`roleRoute${index}`}
        render={(props) => (
          <RolePage role={roles[ roleSlug ]}/>
        )}/>
    })
  }
  const createUserRoutes = () => {
    return Object.keys(roles).map((roleSlug, index) => {
      return <Route
        exact path={`/${roleSlug}/:user_slug`}
        key={`userRoute${index}`}
        render={(props) => (
          <UserPage match={props.match}
                    role={roles[ roleSlug ]}/>
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
  sections: getSections(state),
  roles: getRoles(state),
});

export default connect(
  mapStateToProps,
  null
) (RoutingApp);
