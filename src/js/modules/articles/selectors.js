import React from 'react';
import { createSelector } from "reselect";

import {
  getUsers,
  getContributorFromSlug,
} from "../users/selectors";
import {
  getSectionFromProps,
  getSectionTreeIds,
} from "../sections/selectors";
import {
  getMedia,
  getIllustratorIllustrations,
  getPhotographerPhotographs,
} from "../media/selectors";
import {
  getComments,
  getReplies
} from '../comments/selectors';

export const getArticles = state => state.articles.articles;
const getArticleFromProps = (state, props) => props.article;
const getAuthorships = state => state.articles.authorships;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;

/**
 * The selector returns an articles object with an additional property for each
 *   article: an array of its contributors.
 */
const getArticlesWithContributors = createSelector(
  [ getArticles, getUsers, getAuthorships ],
  (articles, users, authorships) => {
    return authorships.reduce((acc, authorship) => {
      const targetArticle = acc[ authorship.articleId ];
      if (targetArticle.contributors === undefined) {
        targetArticle.contributors = [];
      }
      targetArticle.contributors.push(users[ authorship.contributorId ]);
      return acc;
    }, articles);
  }
);

/**
 * The selector returns a filtered articles object that contains all articles
 *   and their bylines within the target section (from props) and its tree.
 */
export const getSectionTreeArticles = createSelector(
  [ getArticlesWithContributors, getSectionTreeIds ],
  (articles, sectionTreeIds) => {
    return Object.filter(articles, article => {
      return sectionTreeIds.includes(article.sectionId);
    });
  }
);

/**
 * The selector returns an article object from the requested slug.
 */
export const getArticleFromRequestedSlug = createSelector(
  [ getArticlesWithContributors, getRequestedArticleSlug, getSectionFromProps ],
  (articles, requestedArticleSlug, section) => {
    return Object.values(articles).find(article => {
      return article.slug === requestedArticleSlug &&
        article.sectionId === section.id;
    });
  }
);

/**
 * The selector returns an object that contains all articles
 *   written by a contributor.
 */
export const getContributorArticles = createSelector(
  [ getContributorFromSlug, getArticlesWithContributors, getAuthorships ],
  (contributor, articles, authorships) => {
    return authorships.reduce((acc, authorship) => {
      if (authorship.contributorId === contributor.id) {
        const article = articles[ authorship.articleId ];
        acc[ article.id ] = article;
      }
      return acc;
    }, {});
  }
);

/**
 * The selector returns an object that contains all articles an illustrator has
 *   illustrated for (featured media only).
 */
export const getIllustratorArticles = createSelector(
  [ getIllustratorIllustrations, getArticlesWithContributors ],
  (illustrations, articles) => {
    return Object.values(illustrations).reduce((acc, illustration) => {
      const article = articles[ illustration.articleId ];
      acc[ article.id ] = article;
      return acc;
    }, {});
  }
);

/**
 * The selector returns an object that contains all articles a photographer has
 *   photographed for (featured media only).
 */
export const getPhotographerArticles = createSelector(
  [ getPhotographerPhotographs, getArticlesWithContributors ],
  (photographs, articles) => {
    return Object.values(photographs).reduce((acc, photograph) => {
      const article = articles[ photograph.articleId ];
      acc[ article.id ] = article;
      return acc;
    }, {});
  }
);

/**
 * The selector returns a media object for the featured media of a requested
 *   article.
 */
export const getArticleFeaturedMedia = createSelector(
  [ getArticleFromRequestedSlug, getMedia, getUsers ],
  (article, media, users) => {
    const featuredMedia = Object.values(media).find(mediaObject => {
      return mediaObject.isFeatured && mediaObject.articleId === article.id;
    });
    if (featuredMedia) {
      return {
        ...featuredMedia,
        creator: users[ featuredMedia.userId ],
      };
    }
  }
);

/**
 * The selector returns a fake authorships array while Stuy Spec API gets the
 *   Authorships set up.
 */
export const getFakeAuthorshipsForArticleResponse = createSelector(
  [ getArticles ],
  articles => {
    return Object.values(articles).reduce((acc, article) => {
      acc.push({ articleId: article.id, contributorId: 0 });
      acc.push({ articleId: article.id, contributorId: 1 });
      return acc;
    }, [])
  }
);

export const getRequestedArticleComments = createSelector(
  [ getArticleFromProps, getComments ],
  (article, comments) => {
    return Object.filter(comments, comment => comment.articleId === article.id);
  }
);

export const getAuthorshipsFromArticle = createSelector(
  [ getAuthorships, getArticleFromProps ],
  (authorships, article) => {
    const matchingAuthorships = authorships.filter(authorship => {
      return authorship.articleId === article.id;
    });
    return matchingAuthorships.map(authorship => authorship.contributorId);
  }
);

export const getArticleMediaCreators = createSelector(
  [ getArticleFromProps, getMedia, getUsers ],
  (article, media, users) => {
    return Object.values(media).reduce((acc, mediaObject) => {
      if (article.id === mediaObject.articleId) {
        acc[ mediaObject.userId ] = users[ mediaObject.userId ];
      }
      return acc;
    }, {});
  }
);