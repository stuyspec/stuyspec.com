import * as t from "./actionTypes";
import { STUY_SPEC_API_HEADERS, STUY_SPEC_API_URL } from "../../constants";
import axios from "axios";
import { reset } from "redux-form";
import { validateKey } from "../../utils";

export const openLoginModal = () => ({
  type: t.OPEN_LOGIN_MODAL,
});

export const closeLoginModal = () => ({
  type: t.CLOSE_LOGIN_MODAL,
});

export const createComment = values => {
  return dispatch => {
    dispatch({
      type: t.CREATE_COMMENT_PENDING,
      payload: values,
    });
    axios
      .post(`${STUY_SPEC_API_URL}/comments`, values, STUY_SPEC_API_HEADERS)
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

export const fetchComments = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_COMMENTS_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/comments`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateComments(response.data);
        dispatch({
          type: t.FETCH_COMMENTS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_COMMENTS_REJECTED,
          payload: err,
        });
      });
  };
};

const validateComments = commentsArray => {
  const integerProperties = ["id", "articleId", "userId"];
  const stringProperties = ["content"];
  if (!Array.isArray(commentsArray)) {
    throw "EXCEPTION: comments response is not an array.";
  }
  commentsArray.forEach(comment => {
    integerProperties.forEach(numberKey => {
      validateKey(comment, numberKey, "number", "comments");
    });
    stringProperties.forEach(stringKey => {
      validateKey(comment, stringKey, "string", "comments");
    });
  });
  return true;
};
