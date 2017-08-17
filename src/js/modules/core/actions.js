import * as t from "./actionTypes";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const setSidebarOpen = (open) => ({
  type: t.SET_SIDEBAR_OPEN,
  payload: open,
})