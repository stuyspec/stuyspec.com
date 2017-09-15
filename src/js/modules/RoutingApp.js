import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import appHistory from "tools/appHistory";

import {
  SignInPage,
  ProfilePage,
  EditProfilePage,
} from "./accounts/components";
import {
  ArticlePage,
  RecommendedPage,
  LatestPage,
} from "./articles/components";
import { HomePage, PageLayout } from "./core/components";
import { DescriptionPage } from "./descriptions/components";
import { SectionPage } from "./sections/components";
import {
  RolePage,
  ContributorPage,
  PhotographerPage,
  IllustratorPage,
} from "./users/components";

import { fetchAllData } from "./core/actions";
import { getDescriptions } from "./descriptions/selectors";
import { getRoles } from "./users/selectors";
import { getSections } from "./sections/selectors";

class RoutingApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {
    const { sections, roles, descriptions, isAllDataFetched } = this.props;
    return (
      <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={appHistory}>
        <PageLayout>
          {isAllDataFetched ? (
            <Switch>
              <Route exact path="/" component={HomePage} />
              {Object.values(sections).map(section => {
                return (
                  <Route
                    exact
                    path={section.permalink}
                    key={`section${section.id}`}
                    render={props => (
                      <SectionPage match={props.match} section={section} />
                    )}
                  />
                );
              })}
              {Object.values(sections).map(section => {
                return (
                  <Route
                    exact
                    path={`${section.permalink}/:article_slug`}
                    key={`article${section.id}`}
                    render={props => (
                      <ArticlePage match={props.match} section={section} />
                    )}
                  />
                );
              })}
              {Object.values(roles).map(role => {
                return (
                  <Route
                    exact
                    path={`/${role.slug}`}
                    key={`role${role.id}`}
                    render={props => <RolePage role={role} />}
                  />
                );
              })}
              {Object.values(descriptions).map(description => {
                return (
                  <Route
                    exact
                    path={`/about/${description.slug}`}
                    key={`description${description.id}`}
                    render={props => (
                      <DescriptionPage description={description} />
                    )}
                  />
                );
              })}
              <Route
                exact
                path={"/contributors/:contributor_slug"}
                key={"contributors"}
                render={props => <ContributorPage match={props.match} />}
              />
              <Route
                exact
                path={"/illustrators/:illustrator_slug"}
                key={"illustrators"}
                render={props => <IllustratorPage match={props.match} />}
              />
              <Route
                exact
                path={"/photographers/:photographer_slug"}
                key={"photographers"}
                render={props => <PhotographerPage match={props.match} />}
              />
              <Route
                exact
                path={"/myaccount"}
                key={"myaccount"}
                component={SignInPage}
              />
              <Route
                exact
                path={"/myaccount/profile"}
                key={"profile"}
                component={ProfilePage}
              />
              <Route
                exact
                path={"/myaccount/profile/edit"}
                key={"editProfile"}
                component={EditProfilePage}
              />
              <Route
                exact
                path={"/recommended"}
                key={"recommended"}
                component={RecommendedPage}
              />
              <Route
                exact
                path={"/latest"}
                key={"latest"}
                component={LatestPage}
              />
            </Switch>
          ) : (
            <p>loading...</p>
          )}
        </PageLayout>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  descriptions: getDescriptions(state),
  roles: getRoles(state),
  sections: getSections(state),
  isAllDataFetched:
    state.articles.isFetched &&
    state.comments.isFetched &&
    state.media.isFetched &&
    state.sections.isFetched &&
    state.users.isFetched,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAllData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutingApp);
