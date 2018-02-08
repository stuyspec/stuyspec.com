import { createSelector } from 'reselect';

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedContributorSlug = (state, props) =>
  props.match.params.contributor_slug;
const getRequestedIllustratorSlug = (state, props) =>
  props.match.params.illustrator_slug;
const getRequestedPhotographerSlug = (state, props) =>
  props.match.params.photographer_slug;

const getRoleFromProps = (state, props) => props.role;

export const getContributorFromSlug = createSelector(
  [getUsers, getUserRoles, getRequestedContributorSlug, getRoles],
  (users, userRoles, requestedContributorSlug, roles) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedContributorSlug;
    });
    if (
      user &&
      userRoles.find(userRole => {
        return (
          userRole.userId === user.id &&
          roles[userRole.roleId].title === 'Contributor'
        );
      })
    ) {
      return user;
    }
  },
);

export const getIllustratorFromSlug = createSelector(
  [getUsers, getUserRoles, getRequestedIllustratorSlug, getRoles],
  (users, userRoles, requestedIllustratorSlug, roles) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedIllustratorSlug;
    });
    if (
      user &&
      userRoles.find(userRole => {
        return (
          userRole.userId === user.id &&
          roles[userRole.roleId].title === 'Illustrator'
        );
      })
    ) {
      return user;
    }
  },
);

export const getPhotographerFromSlug = createSelector(
  [getUsers, getUserRoles, getRequestedPhotographerSlug, getRoles],
  (users, userRoles, requestedPhotographerSlug, roles) => {
    const user = Object.values(users).find(user => {
      return user.slug === requestedPhotographerSlug;
    });
    if (
      user &&
      userRoles.find(userRole => {
        return (
          userRole.userId === user.id &&
          roles[userRole.roleId].title === 'Photographer'
        );
      })
    ) {
      return user;
    }
  },
);

/**
 * The selector returns all users for the RolePage.
 */
export const getUsersInRole = createSelector(
  [getUsers, getRoleFromProps, getUserRoles],
  (users, role, userRoles) => {
    return userRoles.reduce((acc, userRole) => {
      if (userRole.roleId === role.id) {
        const user = users[userRole.userId];
        acc[user.id] = user;
      }
      return acc;
    }, {});
  },
);
