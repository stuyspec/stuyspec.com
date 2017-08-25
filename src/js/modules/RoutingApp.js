import React from "react";
import { Route, Switch } from "react-router-dom";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import { connect } from "react-redux";

import { HomePage, PageLayout } from "./core/components";
import { ArticlePage } from "./articles/components";
import { SectionPage } from "./sections/components";
import {
  RolePage,
  ContributorPage,
  PhotographerPage,
  IllustratorPage
} from "./users/components";

import { getSections } from "./sections/selectors";
import { getRoles } from "./users/selectors";

const RoutingApp = ({ sections, roles }) => {
  const createSectionRoutes = () => {
    return Object.keys(sections).map(sectionSlug => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={ section.permalink }
        key={ `sectionRoute${section.id}` }
        render={ props => (
          <SectionPage match={ props.match }
                       section={ section }/>
        ) }/>
    });
  };
  const createArticleRoutes = () => {
    return Object.keys(sections).map(sectionSlug => {
      const section = sections[ sectionSlug ];
      return <Route
        exact path={ `${section.permalink}/:article_slug` }
        key={ `articleRoute${section.id}` }
        render={ props => (
          <ArticlePage match={ props.match }
                       section={ section }/>
        ) }/>
    });
  };
  const createRoleRoutes = () => {
    return Object.keys(roles).map(roleSlug => {
      const role = roles[ roleSlug ];
      return <Route
        exact path={ `/${roleSlug}` }
        key={ `roleRoute${role.id}` }
        render={ props => (
          <RolePage role={ role }/>
        ) }/>
    })
  };
  return (
    <ConnectedRouter history={ appHistory }>
      <PageLayout>
        <Switch>
          <Route exact path="/" component={ HomePage }/>
          {/* These routes are created in separate functions, as opposed to
           * separate components, because nesting <Route>'s in <div>'s will
           * throw off the <Switch> routing.
           */}
          { createSectionRoutes() }
          { createArticleRoutes() }
          { createRoleRoutes() }
          <Route exact path={ '/contributors/:contributor_slug' }
                 key={ `contributorRoute` }
                 render={ props => (
                   <ContributorPage match={ props.match }/>
                 ) }/>
          <Route exact path={ '/illustrators/:illustrator_slug' }
                 key={ `illustratorRoute` }
                 render={ props => (
                   <IllustratorPage match={ props.match }/>
                 ) }/>
          <Route exact path={ '/photographers/:photographer_slug' }
                 key={ `photographerRoute` }
                 render={ props => (
                   <PhotographerPage match={ props.match }/>
                 ) }/>
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
