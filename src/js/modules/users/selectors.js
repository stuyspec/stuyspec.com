import { createSelector } from "reselect";

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedContributorSlug = (state, props) => props.match.params.contributor_slug;
const getRoleFromProps = (state, props) => props.role;
const getUsersResponse = state => state.users.response;

export const getContributorFromSlug = createSelector(
  [ getUsers, getRequestedContributorSlug ],
  (users, requestedContributorSlug) => {
    return users[ requestedContributorSlug ];
  }
);

/**
 * The selector returns all users in a role.
 */
export const getUsersInRole = createSelector(
  [ getUsers, getRoleFromProps, getUserRoles ],
  (users, role, userRoles) => {
    const userSlugsInRole = userRoles
      .filter(userRole => userRole.roleSlug === role.slug)
      .map(userRole => userRole.userSlug);
    return Object.filter(users, user => {
      return userSlugsInRole.includes(user.slug);
    });
  }
);

/**
 * TODO:
 * The selector returns a users object that contains all users from Stuy
 *   Spec API's response.
 */
export const getProcessedUsersResponse = createSelector(
  [ getUsersResponse ],
  response => {
    return response.reduce((accumulatedUsers, currentUser) => {
      accumulatedUsers[ currentUser.slug ] = currentUser;
      return accumulatedUsers;
    }, {});
  }
);