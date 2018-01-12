import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import { reducer as formReducer } from "redux-form";
import accounts from "./modules/accounts";
import advertisements from "./modules/advertisements";
import articles from "./modules/articles";
import comments from "./modules/comments";
import descriptions from "./modules/descriptions";
import core from "./modules/core";
import users from "./modules/users";

export default combineReducers({
  [accounts.constants.NAME]: accounts.reducer,
  [advertisements.constants.NAME]: advertisements.reducer,
  [articles.constants.NAME]: articles.reducer,
  [comments.constants.NAME]: comments.reducer,
  [core.constants.NAME]: core.reducer,
  [descriptions.constants.NAME]: descriptions.reducer,
  [users.constants.NAME]: users.reducer,
  router: routerReducer,
  form: formReducer,
});
