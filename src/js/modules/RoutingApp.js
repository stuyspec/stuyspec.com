import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import appHistory from "tools/appHistory";

import {
  SignInPage,
  SignUpPage,
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

class RoutingApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {
    const {
      sections,
      roles,
      descriptions,
      session,
      isAllDataFetched,
    } = this.props;
    return (
      <ConnectedRouter
        onUpdate={() => window.scrollTo(0, 0)}
        history={appHistory}
      >
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
                key={"signIn"}
                render={() =>
                  session.userId ? (
                    <Redirect to="/myaccount/profile" />
                  ) : (
                    <SignInPage />
                  )}
              />
              <Route
                exact
                path="/myaccount/sign-up"
                key={"signUp"}
                render={() =>
                  session.userId ? (
                    <Redirect to="/myaccount/profile" />
                  ) : (
                    <SignUpPage />
                  )}
              />
              <Route
                exact
                path="/myaccount/profile"
                key={"profile"}
                render={() =>
                  session.userId ? (
                    <ProfilePage />
                  ) : (
                    <Redirect to="/myaccount" />
                  )}
              />
              <Route
                exact
                path="/myaccount/profile/edit"
                key={"editProfile"}
                render={() =>
                  session.userId ? (
                    <EditProfilePage />
                  ) : (
                    <Redirect to="/myaccount" />
                  )}
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
  descriptions: state.descriptions,
  roles: state.users.roles,
  sections: state.sections.sections,
  session: state.accounts.session,
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
