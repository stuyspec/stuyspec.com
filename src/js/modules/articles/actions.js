import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";

export const searchArticles = query => {
  return dispatch => {
    dispatch({ type: t.SEARCH_ARTICLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/articles?query=${encodeURI(query)}`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SEARCH_ARTICLES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.SEARCH_ARTICLES_REJECTED,
          payload: err,
        });
      });
  };
};
