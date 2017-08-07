import { createSelector } from "reselect";
import { getSectionSlugFromId } from "../sections/selectors";
import { getUsers, getUserBySlug } from "../users/selectors";
import { getSections, getSectionFromProps, getSlugsInSectionTree } from "../sections/selectors";

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
export const getArticlesWithinSectionTree = createSelector(
  [ getArticles, getSlugsInSectionTree ],
  (articles, slugsInSectionTree) => {
    return Object.filter(articles, article => {
      return slugsInSectionTree.includes(article.sectionSlug);
    });
  }
);

/**
 * The selector returns an array of all contributors for a target article
 *   (from props).
 */
export const getContributorsOfArticle = createSelector(
  [ getArticleFromRequestedSlug, getUsers, getAuthorships ],
  (targetArticle, users, authorships) => {
    const matchedAuthorships = authorships.filter(authorship => {
      return authorship.articleSlug === targetArticle.slug;
    });
    return matchedAuthorships.map(authorship => {
      return users[ authorship.userSlug ];
    });
  }
);

/**
 * The selector returns a filtered articles object that contains all articles
 *   written by a contributor.
 */
export const getArticlesByContributor = createSelector(
  [ getUserBySlug, getArticles, getAuthorships ],
  (user, articles, authorships) => {
    const articleSlugsForTargetArticles = authorships
      .filter(authorship => authorship.userSlug === user.slug)
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
export const getProcessedArticleResponse = createSelector(
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
        userSlug: "jason-kao",
      });
      accumulatedAuthorships.push({
        articleSlug: currentArticle.slug,
        userSlug: "jason-lin",
      });
      return accumulatedAuthorships;
    }, []);
  }
);
