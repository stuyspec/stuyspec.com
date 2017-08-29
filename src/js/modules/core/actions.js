import * as t from "./actionTypes";
import { fetchArticles, fetchAuthorships } from "../articles/actions";
import { fetchMedia } from "../media/actions";
import { fetchSections } from "../sections/actions";
import { fetchUsers } from "../users/actions";

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

export const loadAll = () => {
  return dispatch => {
    dispatch(fetchArticles());
    dispatch(fetchAuthorships());
    dispatch(fetchMedia());
    dispatch(fetchSections());
    dispatch(fetchUsers());
  }
}