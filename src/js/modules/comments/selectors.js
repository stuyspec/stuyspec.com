import { createSelector } from "reselect";

export const getComments = state => state.comments.comments;
const getArticleFromCommentThreadProps = (state, props) => props.article;

export const getRequestedArticleComments = createSelector(
  [getComments, getArticleFromCommentThreadProps],
  (comments, article) =>
    Object.filter(comments, comment => comment.articleId === article.id),
);
