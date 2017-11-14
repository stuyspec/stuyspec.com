import * as t from "./actionTypes";
import { fetchArticles, fetchAuthorships } from "../articles/actions";
import { fetchComments } from "../comments/actions";
import { fetchMedia } from "../media/actions";
import { fetchSections } from "../sections/actions";
import { fetchUsers, fetchUserRoles, fetchRoles } from "../users/actions";
import { fetchOutquotes } from "../outquotes/actions";

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

export const fetchAllData = () => {
  return dispatch => {
    fetchDataPromise = new Promise((resolve, reject) => {
      resolve(dispatch(fetchSections()));
    })
      .then(response => {
        dispatch(fetchComments());
      })
      .then(response => {
        dispatch(fetchMedia());
      })
      .then(response => {
        dispatch(fetchRoles());
      })
      .then(response => {
        dispatch(fetchUsers());
      })
      .then(response => {
        dispatch(fetchUserRoles());
      })
      .then(response => {
        dispatch(fetchRoles());
      })
      .then(response => {
        dispatch(fetchAuthorships());
      })
      .then(response => {
        dispatch(fetchArticles());
      })
      .then(response => {
        dispatch(fetchOutquotes());
      });
  };
};
