import axios from "axios";
import * as t from "./actionTypes";
// import { fillArticles, fillAuthorships } from "../articles/actions";
// import { fillComments } from "../comments/actions";
// import { fillMedia } from "../media/actions";
// import { fillSections } from "../sections/actions";
// import { fillUsers, fillUserRoles, fillRoles } from "../users/actions";
// import { fillOutquotes } from "../outquotes/actions";
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

export const fetchAllData = () => {
  return dispatch => {
    dispatch({type: t.FETCH_INIT_DATA_PENDING})
    axios
      .get(`${STUY_SPEC_API_URL}/init`, STUY_SPEC_API_HEADERS)
      .then(response => {
        // validate the data
        dispatch({type: t.FETCH_INIT_DATA_FULFILLED, payload: response.data})
        // dispatch(fillArticles(response.data.articles));
        // dispatch(fillUsers(response.data.users));
        // dispatch(fillUserRoles(response.data.userRoles));
        // dispatch(fillRoles(response.data.roles));
        // dispatch(fillComments(response.data.comments));
        // dispatch(fillAuthorships(response.data.authorships));
        // dispatch(fillOutquotes(response.data.outquotes));
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_INIT_DATA_REJECTED,
          payload: err,
        });
      });
  };
};
