import { createSelector } from "reselect";
import { getDeepSectionSlugsList } from "../sections/selectors";
// TODO: figure out how to make this^ import correct
const getArticles = state => state.articles.articles;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;
const getSectionByProps = (state, props) => props.section;

/* Writes the filter function for objects.
 * predicate is the function which keys/properties must match
 */
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[ key ]))
    .reduce((res, key) => (res[ key ] = obj[ key ], res), {});


export const getArticleBySlug = createSelector(
  [ getSectionByProps, getArticles, getRequestedArticleSlug ],
  (section, articles, articleSlug) => {
    const potentiallyWantedArticle = articles[ articleSlug ];
    // the article may match the slug, but does it match the requested section?
    if (potentiallyWantedArticle.sectionSlug === section.slug) {
      return potentiallyWantedArticle;
    }
  }
);

//
export const getArticlesWithinSection = createSelector(
  [ getDeepSectionSlugsList, getArticles ],
  (deepSectionSlugsList, articles) => {
    return Object.filter(articles, article => {
      return deepSectionSlugsList.includes(article.sectionSlug);
    });
  }
);