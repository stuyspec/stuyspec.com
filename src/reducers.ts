import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import accounts from "./modules/accounts";
import advertisements from "./modules/advertisements";
import descriptions from "./modules/descriptions";
import core from "./modules/core";
import users from "./modules/users";

export default (history: any) => combineReducers<any>({
  accounts: accounts.reducer,
  advertisements: advertisements.reducer,
  core: core.reducer,
  descriptions: descriptions.reducer,
  users: users.reducer,
  router: connectRouter(history),
  form: formReducer,
});
