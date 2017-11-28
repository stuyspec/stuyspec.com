import * as t from "./actionTypes";
import { STUY_SPEC_API_HEADERS, STUY_SPEC_API_URL } from "../../constants";
import axios from "axios";
import { reset } from "redux-form";

export const createComment = (values, devise_headers) => {
  console.log({"X-Key-Inflection": "camel", ...devise_headers});
  return;
  return dispatch => {
    dispatch({
      type: t.CREATE_COMMENT_PENDING,
      payload: values,
    });
    axios
      .post(
        `${STUY_SPEC_API_URL}/comments`,
        values,
        {"X-Key-Inflection": "camel", ...devise_headers}
      )
      .then(response => {
        dispatch({
          type: t.CREATE_COMMENT_FULFILLED,
          payload: response,
        });
        // Destroys the inputs in the form createComment
        dispatch(reset("createComment"));
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_COMMENT_REJECTED,
          payload: err,
        });
      });
  };
};
