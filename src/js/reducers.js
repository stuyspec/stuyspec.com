import combineReducers from 'redux/lib/combineReducers'
import { routerReducer } from 'react-router-redux/reducer'
import core from './modules/core'
import articles from './modules/articles'
import sections from './modules/sections'

export default combineReducers(
  {
    [core.constants.NAME]: core.reducer,
    [articles.constants.NAME]: articles.reducer,
    [sections.constants.NAME]: sections.reducer,
    router: routerReducer
  });
