import { createSelector } from "reselect";

import {
  getUsers,
  getIllustratorFromSlug,
  getPhotographerFromSlug,
} from "../users/selectors";


export const getMedia = state => state.media.media;

const getMediaResponse = state => state.media.response;

export const getIllustratorIllustrations = createSelector(
  [ getIllustratorFromSlug, getMedia ],
  (illustrator, media) => Object
    .filter(media, mediaObject => mediaObject.userSlug === illustrator.slug)
);

export const getPhotographerPhotographs = createSelector(
  [ getPhotographerFromSlug, getMedia ],
  (photographer, media) => Object
    .filter(media, mediaObject => mediaObject.userSlug === photographer.slug)
);

export const getProcessedMediaResponse = createSelector(
  [ getMediaResponse, getUsers ],
  (mediaResponse, users) => {
    return mediaResponse.reduce((accumulatedMedia, currentMedia) => {
      const matchedUsers = Object.filter(users, user => {
        return user.id === currentMedia.userId;
      });
      const userSlug = Object.keys(matchedUsers)[ 0 ];
      accumulatedMedia[ currentMedia.id ] = {
        ...currentMedia,
        userSlug,
      };
      return accumulatedMedia;
    }, {});
  }
);