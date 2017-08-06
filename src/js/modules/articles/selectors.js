import { createSelector } from "reselect";
import { getUsers, getUserBySlug } from "../users/selectors";
import { getSectionAndSubsectionSlugs } from "../sections/selectors";

export const getArticles = state => state.articles.articles;
const getAuthorships = state => state.articles.authorships;
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

export const getArticleContributors = createSelector(
  [ getArticleBySlug, getUsers, getAuthorships ],
  (article, users, authorships) => {
    const matchedAuthorships = authorships.filter(authorship => {
      return authorship.articleSlug === article.slug;
    });
    let contributors = [];
    for (key in matchedAuthorships) {
      contributors.push(users[ matchedAuthorships[ key ].userSlug ]);
    }
    return contributors;
  }
);

export const getUserArticles = createSelector(
  [ getUserBySlug, getArticles, getAuthorships ],
  (user, articles, authorships) => {
    const matchedAuthorships = authorships.filter(authorship => {
      return authorship.userSlug === user.slug;
    });
    const matchedArticleSlugs = matchedAuthorships.map(authorship => {
      return authorship.articleSlug;
    });
    return Object.filter(articles, article => {
      return matchedArticleSlugs.includes( article.slug );
    });
  }
)