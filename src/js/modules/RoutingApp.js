import React from "react";
import { Route, Switch } from "react-router-dom";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import { connect } from "react-redux";

import { HomePage, PageLayout } from "./core/components";
import { ArticlePage } from "./articles/components";
import { SectionPage } from "./sections/components";
import { RolePage, ContributorPage } from "./users/components";

import { getSections } from "./sections/selectors";
import { getRoles } from "./users/selectors";

const RoutingApp = ({ sections, roles }) => {
  const createSectionRoutes = () => {
    return Object.keys(sections).map(sectionSlug => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={section.permalink}
        key={`sectionRoute${section.id}`}
        render={props => (
          <SectionPage match={props.match}
                       section={section}/>
        )}/>
    });
  };
  const createArticleRoutes = () => {
    return Object.keys(sections).map(sectionSlug => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={`${section.permalink}/:article_slug`}
        key={`articleRoute${section.id}`}
        render={props => (
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
        render={props => (
          <RolePage role={roles[ roleSlug ]}/>
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
          <Route exact path={'/contributors/:contributor_slug'}
                 key={`contributorRoute`}
                 render={props => (
                   <ContributorPage match={props.match}
                                    role={roles[ 'contributors' ]}/>
                   )}/>
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
)(RoutingApp);
