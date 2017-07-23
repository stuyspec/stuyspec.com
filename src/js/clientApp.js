import 'babel-polyfill'
import React from 'react'
import ReactDOM                      from 'react-dom'
import { RoutingApp }                from './modules'
import { AppContainer }              from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin';

// for onClick events with MUI/React
try { injectTapEventPlugin();}
catch(err){ /* hot reloading, no issue  */}

import { VERSION } from './versionInfo'

console.log('appVersion ->', VERSION);

ReactDOM.render((<AppContainer><RoutingApp/></AppContainer>), document.getElementById('app'));