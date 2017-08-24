import * as t from './actionTypes';
import { STUY_SPEC_API_HEADER, STUY_SPEC_API } from "../../constants";
import axios from 'axios';

export const postComment = (values) => {
  return (dispatch) => {
    dispatch({ type: t.POST_COMMENT_PENDING });
    //TODO: ONCE COMMENT API IS MERGED THEN DO THIS
    //axios.get(`${STUY_SPEC_API}/comments`,values, { 'headers': STUY_SPEC_API_HEADER })
    axios.get(`${STUY_SPEC_API}/articles`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => {
        dispatch({
          type: t.POST_COMMENT_FULFILLED,
          payload: values,
        });
      })
      .catch((err) => {
        dispatch({
          type: t.POST_COMMENT_REJECTED,
          payload: err,
        })
      })
  };
};