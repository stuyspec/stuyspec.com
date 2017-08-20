import React from 'react';
import { createSelector } from "reselect";

import {
  getUsers,
  getContributorFromSlug,
} from "../users/selectors";
import {
  getSections,
  getSectionFromProps,
  getSectionSlugFromId,
  getSlugsInSectionTree,
} from "../sections/selectors";
import {
  getMedia,
  getIllustratorIllustrations,
  getPhotographerPhotographs,
} from "../media/selectors";

export const getArticles = state => state.articles.articles;
const getAuthorships = state => state.articles.authorships;
const getArticlesResponse = state => state.articles.response;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;

/**
 * The selector returns an articles object with an additional property for each
 *   article: an array of its contributors.
 */
export const getArticlesWithContributors = createSelector(
  [ getArticles, getUsers, getAuthorships ],
  (articles, users, authorships) => {
    let articlesWithContributors = articles;
    authorships.map(authorship => {
      const targetArticle = articlesWithContributors[ authorship.articleSlug ];
      if (targetArticle.contributors === undefined) {
        targetArticle.contributors = [];
      }
      if (!(targetArticle.contributors.includes(users[ authorship.contributorSlug ]))) {
        targetArticle.contributors.push(users[ authorship.contributorSlug ]);
      }
    });
    Object.keys(articlesWithContributors).map(articleSlug => {
      const targetArticle = articlesWithContributors[ articleSlug ];
      if (targetArticle.contributors < 1) {
        throw `EXCEPTION: article ${targetArticle.slug} owns no authorships.`
      }
    });
    return articlesWithContributors;
  }
);

/**
 * The selector returns a filtered articles object that contains all articles
 *   and their bylines within the target section (from props) and its tree.
 */
export const getSectionTreeArticles = createSelector(
  [ getArticlesWithContributors, getSlugsInSectionTree ],
  (articlesWithContributors, slugsInSectionTree) => {
    return Object.filter(articlesWithContributors, article => {
      return slugsInSectionTree.includes(article.sectionSlug);
    });
  }
);

/**
 * The selector returns an article object from the requested slug.
 */
export const getArticleFromRequestedSlug = createSelector(
  [ getArticlesWithContributors, getRequestedArticleSlug, getSectionFromProps ],
  (articlesWithContributors, articleSlug, section) => {
    const requestedArticle = articlesWithContributors[ articleSlug ];
    if (requestedArticle.sectionSlug === section.slug) {
      return requestedArticle;
    }
  }
);

/**
 * The selector returns an object that contains all articles
 *   written by a contributor.
 */
export const getContributorArticles = createSelector(
  [ getContributorFromSlug, getArticlesWithContributors, getAuthorships ],
  (contributor, articlesWithContributors, authorships) => {
    const articleSlugs = authorships
      .filter(authorship => authorship.contributorSlug === contributor.slug)
      .map(authorship => authorship.articleSlug);
    return Object.filter(articlesWithContributors, article => {
      return articleSlugs.includes(article.slug);
    });
  }
);

/**
 * The selector returns a media object for the featured media of a requested
 *   article.
 */
export const getArticleFeaturedMedia = createSelector(
  [ getArticleFromRequestedSlug, getMedia ],
  (article, media) => media[ article.mediaId ]
);

/**
 * The selector returns an object that contains all articles an illustrator has
 *   illustrated for (featured media only).
 */
export const getIllustratorArticles = createSelector(
  [ getIllustratorIllustrations, getArticlesWithContributors ],
  (illustrations, articles) => {
    const illustrationIds = Object.keys(illustrations);
    return Object.filter(articles, articleObject => {
      return illustrationIds.includes(articleObject.mediaId.toString());
    });
  }
);

/**
 * The selector returns an object that contains all articles a photographer has
 *   photographed for (featured media only).
 */
export const getPhotographerArticles = createSelector(
  [ getPhotographerPhotographs, getArticlesWithContributors ],
  (photographs, articles) => {
    const photographIds = Object.keys(photographs);
    return Object.filter(articles, articleObject => {
      return photographIds.includes(articleObject.mediaId.toString());
    });
  }
);

/**
 * The selector returns an articles object that contains all articles from Stuy
 *   Spec API's response.
 */
export const getProcessedArticlesResponse = createSelector(
  [ getArticlesResponse, getSections ],
  (response, sections) => {
    return response.reduce((accumulatedArticles, currentArticle) => {
      const { sectionId } = currentArticle;
      delete currentArticle.sectionId;
      accumulatedArticles[ currentArticle.slug ] = {
        ...currentArticle,
        sectionSlug: getSectionSlugFromId(sections, sectionId),
        dateline: 'July 31, 2017', // TODO: get Jason L.'s date formatter code
        mediaId: 1, // TODO: @nicholas get media id's into API
      };
      return accumulatedArticles;
    }, {});
  }
);

/**
 * The selector returns a fake authorships array while Stuy Spec API gets the
 *   Authorships set up.
 */
export const getFakeAuthorshipsForArticleResponse = createSelector(
  getArticlesResponse,
  response => {
    return response.reduce((accumulatedAuthorships, currentArticle) => {
      accumulatedAuthorships.push({
        articleSlug: currentArticle.slug,
        contributorSlug: "jason-kao",
      });
      accumulatedAuthorships.push({
        articleSlug: currentArticle.slug,
        contributorSlug: "jason-lin",
      });
      accumulatedAuthorships.push({
        articleSlug: currentArticle.slug,
        contributorSlug: "cathy-cai",
      });
      return accumulatedAuthorships;
    }, []);
  }
);