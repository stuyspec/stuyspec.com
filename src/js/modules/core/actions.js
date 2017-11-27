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
        throwForEmptySlices(response.data);
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

const sliceNames = [
  'articles',
  'sections',
  // 'comments', We don't care if zero comments exist.
  'media',
  'users',
  'roles',
  'userRoles',
  'authorships',
  'outquotes',
];

const throwForEmptySlices = data => {
  for (sliceName of sliceNames) {
    if (!(sliceName in data)) {
      throw sliceName + " not in initial data.";
    }
    if (data[sliceName].length === 0) {
      throw `Zero ${sliceName} received in initial data.`;
    }
  }
};
