import { createSelector } from "reselect";
import appHistory from "../../tools/appHistory";

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedContributorSlug = (state, props) => props.match.params.contributor_slug;
const getRequestedIllustratorSlug = (state, props) => props.match.params.illustrator_slug;
const getRequestedPhotographerSlug = (state, props) => props.match.params.photographer_slug;

const getContributorRoleId = state => state.users.CONTRIBUTOR_ROLE_ID;
const getIllustratorRoleId = state => state.users.ILLUSTRATOR_ROLE_ID;
const getPhotographerRoleId = state => state.users.PHOTOGRAPHER_ROLE_ID;

const getRoleFromProps = (state, props) => props.role;

export const getContributorFromSlug = createSelector(
  [ getUsers, getUserRoles, getRequestedContributorSlug, getContributorRoleId ],
  (users, userRoles, requestedContributorSlug, CONTRIBUTOR_ROLE_ID) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedContributorSlug;
    });
    if (
      userRoles.find(userRole => {
        return userRole.userId === user.id && userRole.roleId === CONTRIBUTOR_ROLE_ID;
      })
    ) {
      return user;
    }
    appHistory.push('/the-uncompleted-404-page');
  }
);

export const getIllustratorFromSlug = createSelector(
  [ getUsers, getUserRoles, getRequestedIllustratorSlug, getIllustratorRoleId ],
  (users, userRoles, requestedIllustratorSlug, ILLUSTRATOR_ROLE_ID) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedIllustratorSlug;
    });
    if (
      userRoles.find(userRole => {
        return userRole.userId === user.id && userRole.roleId === ILLUSTRATOR_ROLE_ID;
      })
    ) {
      return user;
    }
    appHistory.push('/the-uncompleted-404-page');
  }
);

export const getPhotographerFromSlug = createSelector(
  [ getUsers, getUserRoles, getRequestedPhotographerSlug, getPhotographerRoleId ],
  (users, userRoles,requestedPhotographerSlug, PHOTOGRAPHER_ROLE_ID) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedPhotographerSlug;
    });
    if (
      userRoles.find(userRole => {
        return userRole.userId === user.id && userRole.roleId === PHOTOGRAPHER_ROLE_ID;
      })
    ) {
      return user;
    }
    appHistory.push('/the-uncompleted-404-page');
  }
);

/**
 * The selector returns all users for the RolePage.
 */
export const getUsersInRole = createSelector(
  [ getUsers, getRoleFromProps, getUserRoles ],
  (users, role, userRoles) => {
    return userRoles.reduce((acc, userRole) => {
      if (userRole.roleId === role.id) {
        const user = users[ userRole.userId ];
        acc[ user.id ] = user;
      }
      return acc;
    }, {});
  }
);