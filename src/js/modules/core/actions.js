import * as t from "./actionTypes";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const toggleSidebar = (isSidebarOpen) => {
  if (isSidebarOpen) {
    return { type: t.OPEN_SIDEBAR }
  } else {
    return { type: t.CLOSE_SIDEBAR }
  }
};