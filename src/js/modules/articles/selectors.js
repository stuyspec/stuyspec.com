import { createSelector } from "reselect";
import { getSectionAndSubsectionSlugs } from "../sections/selectors";

const getArticles = state => state.articles.articles;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;
const getSectionByProps = (state, props) => props.section;

export const getArticleBySlug = createSelector(
  [ getSectionByProps, getArticles, getRequestedArticleSlug ],
  (section, articles, articleSlug) => {
    const requestedArticle = articles[ articleSlug ];
    // the article may match the slug, but does it match the requested section?
    if (requestedArticle.sectionSlug === section.slug) {
      return requestedArticle;
    }
  }
);

export const getArticlesWithinSection = createSelector(
  [ getSectionAndSubsectionSlugs, getArticles ],
  (sectionAndSubsectionSlugs, articles) => {
    return Object.filter(articles, article => {
      return sectionAndSubsectionSlugs.includes(article.sectionSlug);
    });
  }
);