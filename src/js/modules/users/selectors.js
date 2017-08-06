import { createSelector } from "reselect";

export const getUsers = state => state.users.users;
const getUserRoles = state => state.users.userRoles;
export const getAllRoles = state => state.users.roles;
const getRequestedUserSlug = (state, props) => props.match.params.user_slug;
const getRoleByProps = (state, props) => props.role;

const requestedUserMatchesRequestedRole = createSelector(
  [ getRequestedUserSlug, getRoleByProps, getUserRoles ],
  (requestedUserSlug, requestedRole, userRoles) => {
    const rolesOfUser = userRoles.filter(userRole => {
      return userRole.userSlug === requestedUserSlug &&
        userRole.roleSlug === requestedRole.slug;
    });
    return rolesOfUser.length > 0;
  }
);

export const getUserBySlug = createSelector(
  [ getUsers, getRequestedUserSlug, requestedUserMatchesRequestedRole ],
  (users, userSlug, requestedUserMatchesRequestedRole) => {
    const requestedUser = users[ userSlug ];
    if ( requestedUserMatchesRequestedRole ) {
      return requestedUser;
    }
  }
);

export const getUsersInRole = createSelector(
  [ getUsers, getUserRoles, getRoleByProps ],
  (users, userRoles , role) => {
    const matchedUserRoles = userRoles.filter(userRole => {
      return userRole.roleSlug === role.slug;
    });
    const matchedUserSlugs = matchedUserRoles.map(userRole => {
      return userRole.userSlug;
    });
    return Object.filter(users, user => {
      return matchedUserSlugs.includes( user.slug );
    });
  }
);