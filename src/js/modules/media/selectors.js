import { createSelector } from "reselect";

import {
  getIllustratorFromSlug,
  getPhotographerFromSlug,
} from "../users/selectors";

export const getMedia = state => state.media.media;

export const getIllustratorIllustrations = createSelector(
  [ getIllustratorFromSlug, getMedia ],
  (illustrator, media) => {
    return Object.filter(media, mediaObject => {
      return mediaObject.userId === illustrator.id &&
        mediaObject.type === "illustration";
    });
  }
);

export const getPhotographerPhotographs = createSelector(
  [ getPhotographerFromSlug, getMedia ],
  (photographer, media) => {
    return Object.filter(media, mediaObject => {
      return mediaObject.userId === photographer.id &&
        mediaObject.type === "photograph";
    });
  }
);