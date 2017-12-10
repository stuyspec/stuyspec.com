import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { RoutingApp } from "./modules";
import { AppContainer } from "react-hot-loader";
import injectTapEventPlugin from "react-tap-event-plugin";
import store from "./store";
import Provider from "react-redux/lib/components/Provider";

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// for onClick events with MUI/React
try {
  injectTapEventPlugin();
} catch (err) {
  // hot reloading, no issue
}


import { VERSION } from "./versionInfo";
console.log("appVersion ->", VERSION);


import ReactGA from "react-ga";
ReactGA.initialize("UA-110467163-1")
ReactGA.pageview(window.location.pathname + window.location.search);

const apolloClient = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink(),
  cache: new InMemoryCache()
});

import { objectFilter } from "./utils";
Object.filter = objectFilter;


ReactDOM.render(
  <AppContainer>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <RoutingApp />
      </Provider>
    </ApolloProvider>
  </AppContainer>,
  document.getElementById("app"),
);
