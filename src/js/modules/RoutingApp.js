import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
import {
  ContributorPage,
  PhotographerPage,
  IllustratorPage,
} from "./users/components";

import { fetchAllData } from "./core/actions";
import { sessionfy } from "./accounts/actions";

class RoutingApp extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.prepareData();
  // }

  // // Separate function because it is reused for the DataErrorPage
  // prepareData = () => {
  //   this.props.fetchAllData();
  //   const session = localStorage.getItem("session");
  //   if (session) {
  //     this.props.sessionfy(JSON.parse(session));
  //   }
  // };

  render() {
    const {
      sections,
      descriptions,
      session,
      isAllDataFetched,
      initDataError,
    } = this.props;
    return (
      <ConnectedRouter
        onUpdate={() => window.scrollTo(0, 0)}
        history={appHistory}
      >          
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
                session ? (
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
      </ConnectedRouter>
    );
  }
}

export default RoutingApp;
