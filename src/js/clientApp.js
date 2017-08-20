import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { RoutingApp } from "./modules";
import { AppContainer } from "react-hot-loader";
import injectTapEventPlugin from "react-tap-event-plugin";
import store from "./store";
import Provider from "react-redux/lib/components/Provider";

// for onClick events with MUI/React
try {
  injectTapEventPlugin();
} catch (err) {
  // hot reloading, no issue
}

import { VERSION } from "./versionInfo";
console.log('appVersion ->', VERSION);

import { objectFilter } from "./utils";
Object.filter = objectFilter;

ReactDOM.render((
  <AppContainer>
    <Provider store={ store }>
      <RoutingApp/>
    </Provider>
  </AppContainer>), document.getElementById('app'));