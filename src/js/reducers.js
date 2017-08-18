import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import { reducer as formReducer } from "redux-form";
import core from "./modules/core";
import articles from "./modules/articles";
import sections from "./modules/sections";
import users from "./modules/users";
import media from "./modules/media";

export default combineReducers(
  {
    [core.constants.NAME]: core.reducer,
    [articles.constants.NAME]: articles.reducer,
    [sections.constants.NAME]: sections.reducer,
    [users.constants.NAME]: users.reducer,
    [media.constants.NAME]: media.reducer,
    router: routerReducer,
    form: formReducer,
  });
