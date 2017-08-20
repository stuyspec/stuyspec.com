import * as t from "./actionTypes";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const openSidebar = () => ({
  type: t.OPEN_SIDEBAR
});

export const closeSidebar = () => ({
  type: t.CLOSE_SIDEBAR
});

export const addRowHeight = (rowHeight) => ({
  type: t.ADD_ROW_HEIGHT,
  payload: rowHeight,
});