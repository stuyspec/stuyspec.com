import React from "react";
import { createSelector } from "reselect";

import { getUsers } from "../users/selectors";
import {
  getSectionTreeIds,
} from "../sections/selectors";

export const getArticles = state => state.articles.articles;
const getAuthorships = state => state.articles.authorships;

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
