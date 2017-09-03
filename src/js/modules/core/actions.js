import * as t from "./actionTypes";
import { fetchArticles, fetchAuthorships } from "../articles/actions";
import { fetchComments } from "../comments/actions";
import { fetchMedia } from "../media/actions";
import { fetchSections } from "../sections/actions";
import { fetchUsers, fetchUserRoles, fetchRoles } from "../users/actions";

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

/*
  The reason why fetchArticles is placed so far away from fetchSections is
  because the FETCH_ARTICLES_FULFILLED case in the article reducer requires that
  sections be already fetched, so by making those fetches so far apart, it will
  give time for sections to be done fetching
 */
export const fetchAllData = () => {
  return dispatch => {
    dispatch(fetchSections());
    dispatch(fetchComments());
    dispatch(fetchMedia());
    dispatch(fetchRoles());
    dispatch(fetchUsers());
    dispatch(fetchUserRoles());
    dispatch(fetchRoles());
    dispatch(fetchAuthorships());
    dispatch(fetchArticles());
  };
};
