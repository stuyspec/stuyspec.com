import React from "react";
import { RoutingApp } from "./modules/RoutingApp";
import store from "./store";
import { Provider } from "react-redux";
import { STUY_SPEC_API_URL } from "./constants";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { objectFilter } from "./utils";
import './index.scss';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: `${STUY_SPEC_API_URL}/graphql` }),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

Object.filter = objectFilter;

function App () {
  return(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <RoutingApp />
      </ApolloProvider>
    </Provider>
  )
}

export default App;
