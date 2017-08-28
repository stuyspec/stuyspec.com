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

const fakeComments = [
  {
    id: 0,
    userId: 2,
    articleId: 11,
    content: "This article changed my life!",
    publishedAt: 'July 20, 2017',
  },
  {
    id: 1,
    userId: 1,
    articleId: 11,
    content: "I wished that this article was written better!",
    publishedAt: 'July 20, 2017',
  },
  {
    id: 2,
    userId: 2,
    articleId: 11,
    content: "But if he wants to build the wall, he also promised another country would pay for it. So stop asking Congress for money from Americans. And if he shuts down the government, I mean, isn't he the head of that government? “I’m going to close my business until my competitors treat me better!” How is that even a threat?",
    publishedAt: '9:30 A.M.',
  },
  {
    id: 3,
    userId: 1,
    articleId: 12,
    content: "This article is so inspiring. What a wonderful piece of journalism!",
    publishedAt: 'December 29, 2018',
  }
];

export const createComment = values => {
  return dispatch => {
    dispatch({
      type: t.CREATE_COMMENT_PENDING,
      payload: values,
    });
    axios.post(`${STUY_SPEC_API_URL}/comments`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.CREATE_COMMENT_FULFILLED,
          payload: fakeComments,
        });
        dispatch(reset('createComment'));
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_COMMENT_REJECTED,
          payload: err,
        })
      });
  };
};

export const fetchComments = () => {
  return (dispatch) => {
    dispatch({ type: t.FETCH_COMMENTS_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/comments`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateComments(fakeComments);
        dispatch({
          type: t.FETCH_COMMENTS_FULFILLED,
          payload: fakeComments,
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

const validateComments = (commentsArray) => {
  const integerProperties = [ 'id', 'userId', 'articleId' ];
  const stringProperties = [ 'content', 'publishedAt' ];
  if (!Array.isArray(commentsArray)) {
    throw 'EXCEPTION: comments response is not an array.'
  }
  commentsArray.forEach(commentObject => {
    integerProperties.forEach(numberKey => {
      validateKey(commentObject, numberKey, 'number', 'comments');
    });
    stringProperties.forEach(stringKey => {
      validateKey(commentObject, stringKey, 'string', 'comments');
    });
  });
  return true;
};