import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux/reducer";
import { reducer as formReducer } from "redux-form";
import core from "./modules/core";
import accounts from "./modules/accounts";
import articles from "./modules/articles";
import users from "./modules/users";
import descriptions from "./modules/descriptions";
import advertisements from "./modules/advertisements";

export default combineReducers({
  [core.constants.NAME]: core.reducer,
  [accounts.constants.NAME]: accounts.reducer,
  [articles.constants.NAME]: articles.reducer,
  [users.constants.NAME]: users.reducer,
  [descriptions.constants.NAME]: descriptions.reducer,
  [advertisements.constants.NAME]: advertisements.reducer,
  router: routerReducer,
  form: formReducer,
});
