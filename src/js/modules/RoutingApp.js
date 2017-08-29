import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import appHistory from "tools/appHistory";

import { SignInPage, ProfilePage, EditProfilePage } from "./accounts/components";
import { ArticlePage } from "./articles/components";
import { HomePage, PageLayout } from "./core/components";
import { DescriptionPage } from "./descriptions/components";
import { SectionPage } from "./sections/components";
import {
  RolePage,
  ContributorPage,
  PhotographerPage,
  IllustratorPage,
} from "./users/components";

import { getDescriptions } from "./descriptions/selectors";
import { getRoles } from "./users/selectors";
import { getSections } from "./sections/selectors";

const RoutingApp = ({ sections, roles, descriptions }) => {
  const createSectionRoutes = () => {
    return Object.values(sections).map(section => {
      return (
        <Route
          exact
          path={section.permalink}
          key={`sectionRoute${section.id}`}
          render={props => (
            <SectionPage match={props.match} section={section} />
          )}
        />
      );
    });
  };
  const createArticleRoutes = () => {
    return Object.values(sections).map(section => {
      return (
        <Route
          exact
          path={`${section.permalink}/:article_slug`}
          key={`articleRoute${section.id}`}
          render={props => (
            <ArticlePage match={props.match} section={section} />
          )}
        />
      );
    });
  };
  const createRoleRoutes = () => {
    return Object.values(roles).map(role => {
      return (
        <Route
          exact
          path={`/${role.slug}`}
          key={`roleRoute${role.id}`}
          render={props => <RolePage role={role} />}
        />
      );
    });
  };
  const createDescriptionRoutes = () => {
    return Object.values(descriptions).map(description => {
      return (
        <Route
          exact
          path={`/about/${description.slug}`}
          key={`descriptionRoutes${description.id}`}
          render={props => <DescriptionPage description={description} />}
        />
      );
    });
  };
  return (
    <ConnectedRouter history={ appHistory }
                     onUpdate={ () => window.scrollTo(0, 0) }>
      <PageLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* These routes are created in separate functions, as opposed to
           * separate components, because nesting <Route>'s in <div>'s will
           * throw off <Switch> routing.
           */}
          {createSectionRoutes()}
          {createArticleRoutes()}
          {createRoleRoutes()}
          {createDescriptionRoutes()}
          <Route
            exact
            path={"/contributors/:contributor_slug"}
            key={"contributorRoute"}
            render={props => (
              <ContributorPage
                match={props.match}
                role={roles["contributors"]}
              />
            )}
          />
          <Route
            exact
            path={"/illustrators/:illustrator_slug"}
            key={"illustratorRoute"}
            render={props => <IllustratorPage match={props.match} />}
          />
          <Route
            exact
            path={"/photographers/:photographer_slug"}
            key={"photographerRoute"}
            render={props => (
              <PhotographerPage
                match={props.match}
                role={roles["photographers"]}
              />
            )}
          />
        </Switch>
      </PageLayout>
    </ConnectedRouter>
  );
};

const mapStateToProps = state => ({
  descriptions: getDescriptions(state),
  roles: getRoles(state),
  sections: getSections(state),
});

export default connect(mapStateToProps)(RoutingApp);
