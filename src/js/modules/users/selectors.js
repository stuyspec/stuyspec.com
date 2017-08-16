import { createSelector } from "reselect";

import { getArticles } from "../core/selectors";
import { getMedia } from "../media/selectors";

export const getUsers = state => state.users.users;
export const getRoles = state => state.users.roles;
export const getUserRoles = state => state.users.userRoles;

const getRequestedContributorSlug = (state, props) => props.match.params.contributor_slug;
const getRequestedIllustratorSlug = (state, props) => props.match.params.illustrator_slug;
const getRequestedPhotographerSlug = (state, props) => props.match.params.photographer_slug;

const getRoleFromProps = (state, props) => props.role;
const getUsersResponse = state => state.users.response;

export const getContributorFromSlug = createSelector(
  [ getUsers, getRequestedContributorSlug ],
  (users, requestedContributorSlug) => {
    return users[ requestedContributorSlug ];
  }
);

export const getPhotographerFromSlug = createSelector(
  [ getUsers, getRequestedPhotographerSlug],
  (users, requestedPhotographerSlug) => {
    return users[ requestedPhotographerSlug ];
  }
);

export const getPhotographerWithArticles = createSelector(
  [ getPhotographerFromSlug, getMedia, getArticles ],
  (photographer, media, articles) => {
    const photographs = Object.filter(media, mediaObject => {
      return mediaObject.userSlug === photographer.slug &&
        mediaObject.type === 'photograph';
    });
    const articleSlugs = Object.keys(photographs).map(photographId => {
      const photograph = photographs[ photographId ];
      return photograph.articleSlug;
    });
    return Object.filter(articles, article => {
      return articleSlugs.includes(article.slug);
    });
  }
);

export const getIllustratorFromSlug = createSelector(
  [ getUsers, getRequestedIllustratorSlug ],
  (users, requestedIllustratorSlug) => {
    return users[ requestedIllustratorSlug ];
  }
);

export const getIllustratorWithArticles = createSelector(
  [ getIllustratorFromSlug, getMedia, getArticles ],
  (illustrator, media, articles) => {
    const illustrations = Object.filter(media, mediaObject => {
      return mediaObject.userSlug === illustrator.slug &&
        mediaObject.type === 'illustration';
    });
    const articleSlugs = Object.keys(illustrations).map(illustrationId => {
      const illustration = illustrations[ illustrationId ];
      return illustration.articleSlug;
    });
    return Object.filter(articles, article => {
      return articleSlugs.includes(article.slug);
    });
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