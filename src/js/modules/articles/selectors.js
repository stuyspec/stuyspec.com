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
 * The selector returns the Article array with an additional property for each
 *   article: an array of its contributors.
 */
export const getArticlesWithContributors = createSelector(
  [getArticles, getUsers, getAuthorships],
  (originalArticles, users, authorships) => {
    // clones the articles array
    const articles = JSON.parse(JSON.stringify(originalArticles));
    articles.forEach(article => {
      article.contributors = authorships
        .filter(authorship => authorship.articleId === article.id)
        .map(authorship => users[authorship.userId]);
    });
    return articles;
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
    return articles.filter(article =>
      sectionTreeIds.includes(article.sectionId),
    );
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
    return articles.find(
      article =>
        article.slug === requestedArticleSlug &&
        article.sectionId === section.id,
    );
  },
);

/**
 * The selector returns an object that contains all articles
 *   written by a contributor.
 */
export const getContributorArticles = createSelector(
  [getContributorFromSlug, getArticlesWithContributors, getAuthorships],
  (contributor, articles, authorships) => {
    if (!contributor) {
      return [];
    }
    const articleIds = authorships
      .filter(authorship => authorship.userId === contributor.id)
      .map(authorship => authorship.articleId);
    return articles.filter(article => articleIds.includes(article.id));
  },
);

/**
 * The selector returns an object that contains all articles an illustrator has
 *   illustrated for (featured media only).
 */
export const getIllustratorArticles = createSelector(
  [getIllustratorIllustrations, getArticlesWithContributors],
  (illustrations, articles) => {
    const articleIds = Object.values(illustrations).map(
      illustration => illustration.articleId,
    );
    return articles.filter(article => articleIds.includes(article.id));
  },
);

/**
 * The selector returns an object that contains all articles a photographer has
 *   photographed for (featured media only).
 */
export const getPhotographerArticles = createSelector(
  [getPhotographerPhotographs, getArticlesWithContributors],
  (photographs, articles) => {
    const articleIds = Object.values(photographs).map(
      photograph => photograph.articleId,
    );
    return articles.filter(article => articleIds.includes(article.id));
  },
);

/**
 * The selector returns a media object for the featured media of a requested
 *   article.
 */
export const getArticleMedia = createSelector(
  [getArticleFromRequestedSlug, getMedia],
  (article, media) => {
    if (!article) {
      return null;
    }
    return Object.values(media).filter(image => image.articleId === article.id);
  },
);

export const getLatestArticles = createSelector(
  [getArticlesWithContributors],
  articles => {
    return articles.sort((a, b) => {
      return new Date(b) - new Date(a);
    });
  },
);
