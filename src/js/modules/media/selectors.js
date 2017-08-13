import { createSelector } from 'reselect';
import { getArticles } from "../articles/selectors";
import { objectFilter } from "../../utils";
import { getUsers} from "../users/selectors";

Object.filter = objectFilter;

const getMedia = state => state.media.media;

export const matchMediaToArticles = createSelector(
  [ getMedia, getArticles ],
  ( medias, articles ) => {
    const newArticleObject = {};
    Object.keys(articles).map((article) => {
      const articleObject = articles[article];
      const matchingMedia = Object.filter(medias, media => {
        return media.articleId === articleObject.id;
      });
      const mediaObject = matchingMedia[Object.keys(matchingMedia)[0]];
      newArticleObject[article] = {
        ...articleObject,
        featuredMedia: mediaObject,
        media: mediaObject.id,
      }
    });
    return newArticleObject;
  }
);

export const getProcessedMediaWithCredits = (state) => {
  const users = getUsers(state);
  const medias = getMedia(state);
  const newMediaObject = {};
  Object.keys(medias).map((media) => {
    const mediaObject = medias[media];
    const userObject = users[mediaObject.userSlug];
    console.log(userObject);
    delete mediaObject['userId'];
       newMediaObject[media] = {
         ...mediaObject,
         credits: `${userObject.firstName} ${userObject.lastName}`,
        }
    });
  return newMediaObject;
};

export const getMediaWithUserSlug = (state) => {
  const users = getUsers(state);
  const mediaResponse = state.media.response;
  const mediaWithUserSlug = {};
  Object.keys(mediaResponse).map((media) => {
    const mediaObject = mediaResponse[media];
    Object.keys(users).map((user) => {
      const userObject = users[user];
      if (userObject.id === mediaObject.userId) {
        mediaWithUserSlug[media] = {
          ...mediaObject,
          userSlug: userObject.slug,
        }
      }
    })
  });
  console.log(mediaWithUserSlug);
  return mediaWithUserSlug;
};