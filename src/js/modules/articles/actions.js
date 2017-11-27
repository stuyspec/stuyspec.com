import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";
import { reset } from "redux-form";

export const searchArticles = query => {
  query = query.search;
  return dispatch => {
    dispatch({ type: t.SEARCH_ARTICLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/articles?query=${encodeURI(query)}`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SEARCH_ARTICLES_FULFILLED,
          payload: response.data,
        });
        dispatch(reset("search"));
      })
      .catch(err => {
        dispatch({
          type: t.SEARCH_ARTICLES_REJECTED,
          payload: err,
        });
      });
  };
};
