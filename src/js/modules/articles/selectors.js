import React from "react";
import { createSelector } from "reselect";

import { getUsers, getContributorFromSlug } from "../users/selectors";
import {
  getSectionFromRequestedSlug,
  getSectionTreeIds,
} from "../sections/selectors";
import {
  getMedia,
  getIllustratorIllustrations,
  getPhotographerPhotographs,
} from "../media/selectors";

export const getArticles = state => state.articles.articles;
const getAuthorships = state => state.articles.authorships;
const getRequestedArticleSlug = (state, props) =>
  props.match.params.article_slug;

/**
 * The selector returns an articles object with an additional property for each
 *   article: an array of its contributors.
 */
export const getArticlesWithContributors = createSelector(
  [getArticles, getUsers, getAuthorships],
  (originalArticles, users, authorships) => {
    // efficient and readable method of deep cloning an object.
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
    let articles = JSON.parse(JSON.stringify(originalArticles));
    return authorships.reduce((acc, authorship) => {
      let targetArticle = articles[authorship.articleId];
      if (targetArticle.contributors === undefined) {
        targetArticle.contributors = [];
      }
      if (!targetArticle.contributors.includes(users[authorship.userId])) {
        targetArticle.contributors.push(users[authorship.userId]);
      }
      acc[targetArticle.id] = targetArticle;
      return acc;
    }, {});
  },
);

// TODO: make authorships an object because of duplication error, might need to do that for other things too

/**
 * The selector returns a filtered articles object that contains all articles
 *   and their bylines within the target section (from props) and its tree.
 */
export const getSectionTreeArticles = createSelector(
  [getArticlesWithContributors, getSectionTreeIds],
  (articles, sectionTreeIds) => {
    return Object.filter(articles, article => {
      return sectionTreeIds.includes(article.sectionId);
    });
  },
);

/**
 * The selector returns an article object from the requested slug.
 */
export const getArticleFromRequestedSlug = createSelector(
  [
    getArticlesWithContributors,
    getRequestedArticleSlug,
    getSectionFromRequestedSlug,
  ],
  (articles, requestedArticleSlug, section) => {
    return Object.values(articles).find(article => {
      return (
        article.slug === requestedArticleSlug &&
        article.sectionId === section.id
      );
    });
  },
);

/**
 * The selector returns an object that contains all articles
 *   written by a contributor.
 */
export const getContributorArticles = createSelector(
  [getContributorFromSlug, getArticlesWithContributors, getAuthorships],
  (contributor, articles, authorships) => {
    return authorships.reduce((acc, authorship) => {
      if (authorship.userId === contributor.id) {
        const article = articles[authorship.articleId];
        acc[article.id] = article;
      }
      return acc;
    }, {});
  },
);

/**
 * The selector returns an object that contains all articles an illustrator has
 *   illustrated for (featured media only).
 */
export const getIllustratorArticles = createSelector(
  [getIllustratorIllustrations, getArticlesWithContributors],
  (illustrations, articles) => {
    return Object.values(illustrations).reduce((acc, illustration) => {
      const article = articles[illustration.articleId];
      acc[article.id] = article;
      return acc;
    }, {});
  },
);

/**
 * The selector returns an object that contains all articles a photographer has
 *   photographed for (featured media only).
 */
export const getPhotographerArticles = createSelector(
  [getPhotographerPhotographs, getArticlesWithContributors],
  (photographs, articles) => {
    return Object.values(photographs).reduce((acc, photograph) => {
      const article = articles[photograph.articleId];
      acc[article.id] = article;
      return acc;
    }, {});
  },
);

/**
 * The selector returns a media object for the featured media of a requested
 *   article.
 */
export const getArticleFeaturedMedia = createSelector(
  [getArticleFromRequestedSlug, getMedia, getUsers],
  (article, media, users) => {
    const featuredMedia = Object.values(media).find(mediaObject => {
      return mediaObject.isFeatured && mediaObject.articleId === article.id;
    });
    if (featuredMedia) {
      return {
        ...featuredMedia,
        creator: users[featuredMedia.userId],
      };
    }
  },
);

export const getLatestArticles = createSelector(
  [getArticlesWithContributors],
  articles => {
    const latestArticleArray = Object.values(articles).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    return latestArticleArray.reduce((acc, currentArticle) => {
      acc[currentArticle.id] = currentArticle;
      return acc;
    }, {});
  },
);

export const getArticlesFromSection = createSelector(
  [getArticlesWithContributors, getSectionFromRequestedSlug],
  (articles, section) => {
    return Object.values(articles).filter(
      article => article.sectionId === section.id,
    );
  },
);
