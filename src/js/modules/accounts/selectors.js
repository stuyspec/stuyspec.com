import { createSelector } from "reselect";
import { getUsers } from "../users/selectors";

const getSession = state => state.accounts.session;
export const getCurrentUser = createSelector(
  [getSession, getUsers],
  (session, users) => users[session.userId],
);
