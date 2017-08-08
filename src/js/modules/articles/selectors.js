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

export const getArticleFromRequestedSlug = createSelector(
  [ getArticles, getRequestedArticleSlug, getSectionFromProps ],
  (articles, articleSlug, section) => {
    const requestedArticle = articles[ articleSlug ];
    if (requestedArticle.sectionSlug === section.slug) {
      return requestedArticle;
    }
  }
);

/**
 * The selector returns a filtered articles object that contains all articles
 *   within the target section (from props) and its tree.
 */
export const getSectionTreeArticles = createSelector(
  [ getArticles, getSlugsInSectionTree ],
  (articles, slugsInSectionTree) => {
    return Object.filter(articles, article => {
      return slugsInSectionTree.includes(article.sectionSlug);
    });
  }
);

/**
 * The selector factory returns a selector that returns an array of all
 *   contributors for any @param target article.
 */
export const articleContributorsSelectorFactory = (targetArticle) => {
  return createSelector(
    [ getUsers, getAuthorships ],
    (users, authorships) => {
      const matchedAuthorships = authorships.filter(authorship => {
        return authorship.articleSlug === targetArticle.slug;
      });
      return matchedAuthorships.map(authorship => {
        return users[ authorship.contributorSlug ];
      });
    }
  );
};

/**
 * The selector factory returns a selector that returns the byline for
 *   any @param targetArticle.
 */
export const articleBylineSelectorFactory = (targetArticle) => {
  return createSelector(
    [ articleContributorsSelectorFactory(targetArticle) ],
    contributors => {
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
    }
  );
};
/**
 * The selector returns a filtered articles object that contains all articles
 *   written by a contributor.
 */
export const getArticlesByContributor = createSelector(
  [ getContributorFromSlug, getArticles, getAuthorships ],
  (contributor, articles, authorships) => {
    const articleSlugsForTargetArticles = authorships
      .filter(authorship => authorship.contributorSlug === contributor.slug)
      .map(authorship => authorship.articleSlug);
    return Object.filter(articles, article => {
      return articleSlugsForTargetArticles.includes(article.slug);
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
