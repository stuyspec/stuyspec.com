import { createSelector } from "reselect";
import { objectFilter } from "../../utils";
import { getArticles } from "../core/selectors";
import { getUsers } from "../core/selectors";

Object.filter = objectFilter;

export const getMedia = state => state.media.media;

const getMediaResponse = state => state.media.response;

export const getProcessedMediaResponse = createSelector(
  [ getMediaResponse, getUsers, getArticles ],
  (mediaResponse, users, articles) => {
    return mediaResponse.reduce((accumulatedMedia, currentMedia) => {
      const matchedUsers = Object.filter(users, user => {
        return user.id === currentMedia.userId;
      });
      const userSlug = Object.keys(matchedUsers)[ 0 ];
      delete currentMedia[ 'userId' ];
      const matchedArticles = Object.filter(articles, article => {
        return article.id === currentMedia.articleId;
      });
      const articleSlug = Object.keys(matchedArticles)[ 0 ];
      delete currentMedia[ 'articleId' ];
      accumulatedMedia[ currentMedia.id ] = {
        ...currentMedia,
        userSlug: userSlug,
        articleSlug: articleSlug,
      }
      return accumulatedMedia;
    }, {});
  }
);