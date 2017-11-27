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
  SearchPage,
} from "./articles/components";
import { HomePage, PageLayout, NotFoundPage } from "./core/components";
import { DescriptionPage } from "./descriptions/components";
import { SectionPage } from "./sections/components";
import {
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
    const session = localStorage.getItem("session");
    if (session) {
      this.props.sessionfy(JSON.parse(session));
    }
  }

  render() {
    const {
      sections,
      descriptions,
      session,
      isDataFetched,
    } = this.props;
    return (
      <ConnectedRouter
        onUpdate={() => window.scrollTo(0, 0)}
        history={appHistory}
      >
        {isDataFetched && (
          <PageLayout>
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
              <Route
                exact
                path={"/search"}
                key={"search"}
                component={SearchPage}
              />
              <Route
                path="/404-page-not-found"
                key={"notFound"}
                component={NotFoundPage}
              />
              <Route
                path="*"
                key={"404"}
                render={() => <Redirect to="/404-page-not-found" />}
              />
            </Switch>
          </PageLayout>
        )}
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  descriptions: state.descriptions,
  sections: state.sections.sections,
  session: state.accounts.session,
  isDataFetched: state.core.isDataFetched,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAllData }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutingApp);
