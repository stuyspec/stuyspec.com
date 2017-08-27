import * as t from './actionTypes';
import { STUY_SPEC_API_HEADER, STUY_SPEC_API_URL } from "../../constants";
import axios from 'axios';
import { reset } from 'redux-form';
import {validateKey} from "../../utils";

export const postComment = (values) => {
  return (dispatch) => {
    /*
    - pending payload: values
    -
     */
    dispatch({ type: t.POST_COMMENT_PENDING });
    //TODO: ONCE COMMENT API IS MERGED THEN DO THIS
    //axios.post(`${STUY_SPEC_API_URL}/comments`,values, { 'headers': STUY_SPEC_API_HEADER })
    axios.get(`${STUY_SPEC_API_URL}/articles`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => {
        dispatch({
          type: t.POST_COMMENT_FULFILLED,
        });
        dispatch(reset('commentForm'));
      })
      .catch((err) => {
        dispatch({
          type: t.POST_COMMENT_REJECTED,
          payload: err,
        })
      })
  };
};

export const postReply = (values, formName) => {
  return (dispatch) => {
    dispatch({ type: t.POST_REPLY_PENDING });
    //TODO: ONCE COMMENT API IS MERGED THEN DO THIS
    //axios.post(`${STUY_SPEC_API_URL}/reply`,values, { 'headers': STUY_SPEC_API_HEADER })
    axios.get(`${STUY_SPEC_API_URL}/articles`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => {
        dispatch({
          type: t.POST_REPLY_FULFILLED,
          payload: values,
        });
        dispatch(reset(formName));
      })
      .catch((err) => {
        dispatch({
          type: t.POST_REPLY_REJECTED,
          payload: err,
        })
      })
  };
};

export const openReplyBox = (commentId) => (
  {
    type: t.OPEN_REPLY_BOX,
    payload: commentId,
  }
);

export const openModalLogin = () => (
  {
    type: t.OPEN_MODAL_LOGIN,
  }
);

export const closeModalLogin = () => (
  {
    type: t.CLOSE_MODAL_LOGIN,
  }
);

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

const fakeReplies = [
  {
    id: 0,
    userId: 3,
    commentId: 0,
    content: "Same, it made me realize how amazing the world is.",
    publishedAt: 'July 20, 2017',
  },
  {
    id: 1,
    userId: 0,
    commentId: 1,
    content: "I believe that this article was perfectly fine.",
    publishedAt: 'July 20, 2017',
  },
  {
    id: 2,
    userId: 1,
    commentId: 1,
    content: "He should be focused on economic upliftment for the jobless and discouraged. The Wall was a vote-getting mechanism, albeit a cynical one - not real workable economic policy. And he knows it.",
    publishedAt: '2:35 P.M.',
  },
  {
    id: 3,
    userId: 2,
    commentId: 3,
    content: "Yea this article opened my eyes. From now on, I will stop hating people.",
    publishedAt: '5:29 P.M.',
  }
];

//TODO: For fetchComments and fetchReplies, change the axios.get once
// jerry's thing is merged
export const fetchComments = () => {
  return (dispatch) => {
    dispatch({ type: t.FETCH_COMMENTS_PENDING });
    //axios.get(`${STUY_SPEC_API_URL}/comments`, { 'headers': STUY_SPEC_API_HEADER })
    axios.get(`${STUY_SPEC_API_URL}/articles`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => {
        validateComments(fakeComments);
        dispatch({
          type: t.FETCH_COMMENTS_FULFILLED,
          payload: fakeComments,
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_COMMENTS_REJECTED,
          payload: err,
        })
      })
  };
};

export const fetchReplies = () => {
  return (dispatch) => {
    dispatch({ type: t.FETCH_REPLIES_PENDING });
    //axios.get(`${STUY_SPEC_API_URL}/replies`, { 'headers': STUY_SPEC_API_HEADER })
    axios.get(`${STUY_SPEC_API_URL}/articles`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => {
        validateReplies(fakeReplies);
        dispatch({
          type: t.FETCH_REPLIES_FULFILLED,
          payload: fakeReplies,
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_REPLIES_REJECTED,
          payload: err,
        })
      })
  };
};

const validateComments = (commentsArray) => {
  const integerProperties = [ 'id', 'userId', 'articleId' ];
  const stringProperties = [ 'content', 'publishedAt'];
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

const validateReplies = (repliesArray) => {
  const integerProperties = [ 'id', 'userId', 'commentId' ];
  const stringProperties = [ 'content', 'publishedAt'];
  if (!Array.isArray(repliesArray)) {
    throw 'EXCEPTION: comments response is not an array.'
  }
  repliesArray.forEach(replyObject => {
    integerProperties.forEach(numberKey => {
      validateKey(replyObject, numberKey, 'number', 'replies');
    });
    stringProperties.forEach(stringKey => {
      validateKey(replyObject, stringKey, 'string', 'replies');
    });
  });
  return true;
};
