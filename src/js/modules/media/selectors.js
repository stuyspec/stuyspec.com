import { createSelector } from "reselect";
import { objectFilter } from "../../utils";
import {
  getUsers,
} from "../users/selectors";

Object.filter = objectFilter;

export const getMedia = state => state.media.media;

const getMediaResponse = state => state.media.response;

export const getPhotographerPhotographs = createSelector(

)

export const getProcessedMediaResponse = createSelector(
  [ getMediaResponse, getUsers ],
  (mediaResponse, users) => {
    return mediaResponse.reduce((accumulatedMedia, currentMedia) => {
      const matchedUsers = Object.filter(users, user => {
        return user.id === currentMedia.userId;
      });
      const userSlug = Object.keys(matchedUsers)[ 0 ];
      delete currentMedia[ 'userId' ];
      accumulatedMedia[ currentMedia.id ] = {
        ...currentMedia,
        userSlug,
      }
      return accumulatedMedia;
    }, {});
  }
);