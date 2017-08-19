import * as t from "./actionTypes";

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});

export const addRowHeight = (height) => ({
  type: t.ADD_ROW_HEIGHT,
  payload: height,
});