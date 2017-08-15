import React from "react";
import { Route, Switch } from "react-router-dom";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import { connect } from "react-redux";

import { HomePage, PageLayout } from "./core/components";
import { ArticlePage } from "./articles/components";
import { SectionPage } from "./sections/components";
import { RolePage, ContributorPage } from "./users/components";
import { AboutPage } from "./about/components";

import { getSections } from "./sections/selectors";
import { getRoles } from "./users/selectors";
import { getAbouts } from './about/selectors';

const RoutingApp = ({ sections, roles, abouts }) => {
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
    return Object.keys(roles).map(roleSlug => {
      const role = roles[ roleSlug ];
      return <Route
        exact path={`/${roleSlug}`}
        key={`roleRoute${role.id}`}
        render={props => (
          <RolePage role={role}/>
        )}/>
    })
  };
  const createAboutRoutes = () => {
    return Object.keys(abouts).map(aboutSlug => {
      const aboutPage = abouts[ aboutSlug ];
      return <Route
        exact path={`/about/${aboutPage.slug}`}
        key={`aboutRoutes${aboutPage.id}`}
        render={props => (
          <AboutPage about={aboutPage}/>
        )}/>
    })
  };
  return (
    <ConnectedRouter history={appHistory}>
      <PageLayout>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          {createSectionRoutes()}
          {createArticleRoutes()}
          {createRoleRoutes()}
          {createAboutRoutes()}
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
  abouts: getAbouts(state),
});

export default connect(
  mapStateToProps,
  null
)(RoutingApp);
