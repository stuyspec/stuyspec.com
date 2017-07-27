import * as t from './actionTypes'

export const setLanguage = (language) => ({
  type: t.SET_LANGUAGE,
  payload: { language },
});

export const refreshWindowDimensions = () => ({
  type: t.REFRESH_WINDOW_DIMENSIONS,
  payload: {},
});