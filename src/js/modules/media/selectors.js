import { createSelector } from "reselect";

import {
  getIllustratorFromSlug,
  getPhotographerFromSlug,
} from "../users/selectors";

export const getMedia = state => state.media.media;

export const getIllustratorIllustrations = createSelector(
  [ getIllustratorFromSlug, getMedia ],
  (illustrator, media) => Object.filter(media, mediaObject => {
    return mediaObject.userId === illustrator.id;
  })
);

export const getPhotographerPhotographs = createSelector(
  [ getPhotographerFromSlug, getMedia ],
  (photographer, media) => Object.filter(media, mediaObject => {
    return mediaObject.userId === photographer.id;
  })
);