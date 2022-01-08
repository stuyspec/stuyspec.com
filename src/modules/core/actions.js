import * as t from './actionTypes';

export const openSidebar = () => ({
  type: t.OPEN_SIDEBAR,
});
export const closeSidebar = () => ({
  type: t.CLOSE_SIDEBAR,
});

export const openLightbox = () => ({
  type: t.OPEN_LIGHTBOX,
});
export const closeLightbox = () => ({
  type: t.CLOSE_LIGHTBOX,
});
