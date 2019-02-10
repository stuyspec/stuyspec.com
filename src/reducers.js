import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import accounts from "./modules/accounts";
import advertisements from "./modules/advertisements";
import comments from "./modules/comments";
import descriptions from "./modules/descriptions";
import core from "./modules/core";
import users from "./modules/users";

export default combineReducers({
  accounts: accounts.reducer,
  advertisements: advertisements.reducer,
  comments: comments.reducer,
  core: core.reducer,
  descriptions: descriptions.reducer,
  users: users.reducer,
  router: routerReducer,
  form: formReducer,
});
