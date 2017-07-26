import {createSelector} from 'reselect'

const getArticles = state => state.core.entities.articles;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;

/* The homepage does not require all Article properties.
 * TODO: condense articles to properties title, section, and slug
 */
export const getCondensedArticles = createSelector(
  [getArticles],
  (articles) => {
    return Object.assign({}, articles);
  }
)

/* Writes the filter function for objects.
 * predicate is the function which keys/properties must match
 */
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});

const getSectionByProps = (state, props) => props.section;
const getSubsectionsByProps = (state, props) => props.subsections;

export const getArticlesWithinSection = createSelector(
  [getSectionByProps, getSubsectionsByProps, getArticles],
  (section, subsections, articles) => {
    let allSectionSlugs = [section.slug];
    if (subsections !== null) {
      allSectionSlugs = [...allSectionSlugs, ...Object.keys(subsections)];
    }
    return Object.filter(articles, article => {
      return allSectionSlugs.includes(article.section_slug);
    });
  }
)

export const getArticleBySlug = createSelector(
  [getSectionByProps, getArticles, getRequestedArticleSlug],
  (section, articles, articleSlug) => {
    const potentiallyWantedArticle = articles[articleSlug];
    if (potentiallyWantedArticle.section_slug === section.slug) {
      return potentiallyWantedArticle;
    }
  }
)