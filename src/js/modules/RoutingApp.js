import React, { PureComponent } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import queryString from "query-string";
import appHistory from "../tools/appHistory";

import {
  EditProfilePage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from "./accounts/components";
import {
  ArticlePage,
  LatestPage,
  RecommendedPage,
  SearchPage,
} from "./articles/components";
import {
  DataErrorPage,
  HomePage,
  NotFoundPage,
  PageLayout,
} from "./core/components";
import { DescriptionPage } from "./descriptions/components";
import { SectionPage } from "./sections/components";
import { ArtistPage, ContributorPage } from "./users/components";

import { createSession } from "./accounts/actions";

import { RecruitmentPage } from "./recruitment/components";

import { ClassifiedsRedirect } from "./core/components";

const RoutingAppQuery = gql`
  query RoutingAppQuery {
    allSections {
      id
      name
      permalink
    }
  }
`;

class RoutingApp extends PureComponent {
  componentDidMount() {
    const { createSession } = this.props;

    const session = localStorage.getItem("session");
    if (session) {
      // Create session from local storage
      createSession(JSON.parse(session));
    } else {
      // Create session from URL queries
      const urlHeaders = queryString.parse(window.location.search);

      // If everything we need in a session exists, create the session
      const sessionHeaders = ["client_id", "token", "uid"];
      if (sessionHeaders.every(header => header in urlHeaders)) {
        createSession({
          "access-token": urlHeaders.token,
          client: urlHeaders.client_id,
          uid: urlHeaders.uid,
        });
      }
    }
  }

  render() {
    const { data: { loading, error, allSections }, session } = this.props;

    const loadingIcon = document.getElementById("loading");
    if (loadingIcon && !loading) {
      // If data stopped loading and we haven't unmounted the loading icon
      loadingIcon.parentNode.removeChild(loadingIcon);
    }

    if (error) {
      return <DataErrorPage />;
    }

    return (
      <ConnectedRouter history={appHistory}>
        <PageLayout>
          {!loading && (
            <Switch>
              <Route exact path="/" component={HomePage} />
              {allSections.map(section => {
                return (
                  <Route
                    exact
                    path={section.permalink}
                    key={`section${section.id}`}
                    render={() => <SectionPage section={section} />}
                  />
                );
              })}
              {allSections.map(section => {
                return (
                  <Route
                    exact
                    path={`${section.permalink}/:article_slug`}
                    key={`article${section.id}`}
                    component={ArticlePage}
                  />
                );
              })}
              <Route
                exact
                path={"/about/:description_slug"}
                component={DescriptionPage}
              />
              <Route
                exact
                path={"/contributors/:contributor_slug"}
                key={"contributors"}
                component={ContributorPage}
              />
              <Route
                exact
                path={"/illustrators/:artist_slug"}
                key={"illustrators"}
                component={ArtistPage}
              />
              <Route
                exact
                path={"/photographers/:artist_slug"}
                key={"photographers"}
                component={ArtistPage}
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
              <Route
                exact
                path={"/myaccount"}
                key={"signIn"}
                render={() =>
                  session ? (
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
                  session ? (
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
                  session ? <ProfilePage /> : <Redirect to="/myaccount" />}
              />
              <Route
                exact
                path="/myaccount/profile/edit"
                key={"editProfile"}
                render={() =>
                  session ? <EditProfilePage /> : <Redirect to="/myaccount" />}
              />
              <Route
                exact
                path={"/recruitments"}
                key={"recruitments"}
                component={RecruitmentPage}
              />
              <Route
                exact
                path={"/classifieds"}
                key={"classifieds"}
                component={ClassifiedsRedirect}
              />
              <Route path={"/search"} key={"search"} component={SearchPage} />
              <Route path="*" key={"404"} component={NotFoundPage} />
            </Switch>
          )}
        </PageLayout>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createSession }, dispatch);
};

export default compose(
  graphql(RoutingAppQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(RoutingApp);
