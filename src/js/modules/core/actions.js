import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

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
