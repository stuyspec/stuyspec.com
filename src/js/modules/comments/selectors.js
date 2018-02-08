import { createSelector } from 'reselect';

export const getComments = state => state.comments.comments;
const getArticleFromProps = (state, props) => props.article;

export const getRequestedArticleComments = createSelector(
  [getComments, getArticleFromProps],
  (comments, article) =>
    Object.filter(comments, comment => comment.articleId === article.id),
);
