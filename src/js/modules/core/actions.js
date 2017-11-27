import axios from "axios";
import * as t from "./actionTypes";
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
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_INIT_DATA_REJECTED,
          payload: err,
        });
      });
  };
};
