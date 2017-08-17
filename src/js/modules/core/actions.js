import * as t from "./actionTypes";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const toggleSidebar = (open) => ({
  type: t.TOGGLE_SIDEBAR,
  payload: open,
})