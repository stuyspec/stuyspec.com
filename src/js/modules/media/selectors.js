import { createSelector } from "reselect";

import {
  getIllustratorFromSlug,
  getPhotographerFromSlug,
} from "../users/selectors";


export const getMedia = state => state.media.media;
export const getMediaResponse = state => state.media.response;

export const getIllustratorIllustrations = createSelector(
  [ getIllustratorFromSlug, getMedia ],
  (illustrator, media) => Object
    .filter(media, mediaObject => mediaObject.userId === illustrator.id)
);

export const getPhotographerPhotographs = createSelector(
  [ getPhotographerFromSlug, getMedia ],
  (photographer, media) => Object
    .filter(media, mediaObject => mediaObject.userId === photographer.id)
);