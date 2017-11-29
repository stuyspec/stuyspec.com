import { createSelector } from "reselect";
import { getUsers } from "../users/selectors";

const getSession = state => state.accounts.session;
export const getCurrentUser = createSelector(
  [getSession, getUsers],
  (session, users) => {
    if (session) {
      return Object.values(users).find(user => user.email === session.uid);
    }
  }
);
