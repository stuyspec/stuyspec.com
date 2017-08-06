import { createSelector } from "reselect";
import { findSectionFromId } from '../sections/selectors';
import { getSectionAndSubsectionSlugs } from "../sections/selectors";
// TODO: figure out how to make this^ import correct
export const getArticles = state => state.articles.articles;
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

export const processArticleResponseData = (state) => {
  const data = state.articles.responseData;
  console.log(data);
  const processedData = data.reduce((accumulator, current) => {
    const articleSlug = current.slug;
    const idOfSection = current.sectionId;
    delete current.sectionId;
    accumulator[ articleSlug ] = {
      ...current,
      sectionSlug: findSectionFromId(idOfSection, state),
    };
    return accumulator;
  }, { ...state.articles.articles });
  return processedData;
};

