import React, { PureComponent } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
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
import { ContributorPage, ArtistPage } from "./users/components";

import { sessionify } from "./accounts/actions";

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const session = localStorage.getItem("session");
    if (session) {
      this.props.sessionify(JSON.parse(session));
    }
  }

  render() {
    const {
      data: { loading, error, allSections },
      session,
      descriptions,
    } = this.props;
    return (
      <ConnectedRouter history={appHistory}>
        <PageLayout>
          {!loading ? (
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
              <Route path={"/search"} key={"search"} component={SearchPage} />
              <Route path="*" key={"404"} component={NotFoundPage} />
            </Switch>
          ) : (
            <span> </span>
          )}
        </PageLayout>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  descriptions: state.descriptions,
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ sessionify }, dispatch);
};

export default compose(
  graphql(RoutingAppQuery),
  connect(mapStateToProps, mapDispatchToProps),
)(RoutingApp);
