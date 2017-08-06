import { createSelector } from "reselect";

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedUserSlug = (state, props) => props.match.params.user_slug;
const getRoleFromProps = (state, props) => props.role;

/**
 * The selector returns true if the user requested from the slug is in the role
 *   requested and returns false if otherwise.
 */
const requestedUserIsInRequestedRole = createSelector(
  [ getRequestedUserSlug, getRoleFromProps, getUserRoles ],
  (requestedUserSlug, requestedRole, userRoles) => {
    return userRoles.filter(userRole => {
      return userRole.userSlug === requestedUserSlug &&
        userRole.roleSlug === requestedRole.slug;
    }).length > 0;
  }
);

export const getUserBySlug = createSelector(
  [ getUsers, getRequestedUserSlug, requestedUserIsInRequestedRole ],
  (users, requestedUserSlug, requestedUserIsInRequestedRole) => {
    const requestedUser = users[ requestedUserSlug ];
    if ( requestedUserIsInRequestedRole ) {
      return requestedUser;
    }
  }
);

/**
 * The selector returns all users within a role.
 */
export const getUsersWithinRole = createSelector(
  [ getUsers, getRoleFromProps, getUserRoles ],
  (users, role, userRoles) => {
    const userSlugsInRole = userRoles
      .filter(userRole => userRole.roleSlug === role.slug)
      .map(userRole => userRole.userSlug);
    return Object.filter(users, user => {
      return userSlugsInRole.includes( user.slug );
    });
  }
);