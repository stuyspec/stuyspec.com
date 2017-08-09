import React from 'react';
import { createSelector } from "reselect";

import { getUsers, getContributorFromSlug } from "../users/selectors";
import {
  getSections,
  getSectionFromProps,
  getSectionSlugFromId,
  getSlugsInSectionTree,
} from "../sections/selectors";

export const getArticles = state => state.articles.articles;
const getAuthorships = state => state.articles.authorships;
const getArticlesResponse = state => state.articles.response;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;

/**
 * The selector returns an articles object with an additional property for each
 *   article: its byline in JSX.
 */
const getArticlesWithContributors = createSelector(
  [ getArticles, getUsers, getAuthorships ],
  (articles, users, authorships) => {
    let articlesWithContributors = articles;
    authorships.map(authorship => {
      if (articlesWithContributors[ authorship.articleSlug ].contributors === undefined) {
        articlesWithContributors[ authorship.articleSlug ].contributors = [
          users[ authorship.contributorSlug ],
        ];
      } else {
        articlesWithContributors[ authorship.articleSlug ].contributors
          .push(users[ authorship.contributorSlug ]);
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
 * The selector returns a filtered articles object that contains all articles
 *   written by a contributor.
 */
export const getArticlesByContributor = createSelector(
  [ getContributorFromSlug, getArticlesWithContributors, getAuthorships ],
  (contributor, articlesWithContributors, authorships) => {
    const articleSlugsForArticlesByContributor = authorships
      .filter(authorship => authorship.contributorSlug === contributor.slug)
      .map(authorship => authorship.articleSlug);
    return Object.filter(articlesWithContributors, article => {
      return articleSlugsForArticlesByContributor.includes(article.slug);
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