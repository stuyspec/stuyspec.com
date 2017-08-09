import React from 'react';
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

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
const getArticlesWithBylines = createSelector(
  [ getArticles, getUsers, getAuthorships ],
  (articles, users, authorships) => {
    let articlesWithBylines = articles;
    authorships.map(authorship => {
      if (articlesWithBylines[ authorship.articleSlug ].contributors === undefined) {
        articlesWithBylines[ authorship.articleSlug ].contributors = [
          users[ authorship.contributorSlug ],
        ];
      } else {
        articlesWithBylines[ authorship.articleSlug ].contributors
          .push(users[ authorship.contributorSlug ]);
      }
    });
    Object.keys(articlesWithBylines).map(articleSlug => {
      const targetArticle = articlesWithBylines[ articleSlug ];
      if (targetArticle.contributors < 1) {
        throw `EXCEPTION: article ${targetArticle.slug} owns no authorships.`
      }
      articlesWithBylines[ articleSlug ].byline =
        contributorsToByline(targetArticle.contributors);
    });
    return articlesWithBylines;
  }
);

const contributorsToByline = (contributors) => {
  let separator = ', ';
  return contributors.map((contributor, index) => {
    if (index === contributors.length - 2) {
      separator = ' & ';
    } else if (index === contributors.length - 1) {
      separator = '';
    }
    return (
      <div key={`contributor${contributor.id}`}>
        {index === 0 ? 'By ' : ''}
        <Link to={`/contributors/${contributor.slug}`}>
          {contributor.firstName} {contributor.lastName}
        </Link>{separator}
      </div>
    );
  });
};

/**
 * The selector returns a filtered articles object that contains all articles
 *   and their bylines within the target section (from props) and its tree.
 */
export const getSectionTreeArticles = createSelector(
  [ getArticlesWithBylines, getSlugsInSectionTree ],
  (articlesWithBylines, slugsInSectionTree) => {
    return Object.filter(articlesWithBylines, article => {
      return slugsInSectionTree.includes(article.sectionSlug);
    });
  }
);

export const getArticleFromRequestedSlug = createSelector(
  [ getArticlesWithBylines, getRequestedArticleSlug, getSectionFromProps ],
  (articlesWithBylines, articleSlug, section) => {
    const requestedArticle = articlesWithBylines[ articleSlug ];
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
  [ getContributorFromSlug, getArticlesWithBylines, getAuthorships ],
  (contributor, articlesWithBylines, authorships) => {
    const articleSlugsForArticlesByContributor = authorships
      .filter(authorship => authorship.contributorSlug === contributor.slug)
      .map(authorship => authorship.articleSlug);
    return Object.filter(articlesWithBylines, article => {
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
      return accumulatedAuthorships;
    }, []);
  }
);