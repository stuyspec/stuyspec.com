import axios from "axios";
import * as t from "./actionTypes";

import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_USER_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/users`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateUsers(response.data);
        dispatch({
          type: t.FETCH_USER_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_USER_REJECTED,
          payload: err,
        })
      })
  };
};

const validateUsers = (userArray) => {
  const integerProperties = [];//[ 'id' ];
  const stringProperties = [];//[ 'firstName', 'lastName', 'username', 'email', 'createdAt', 'updatedAt' ];
  if (!Array.isArray(userArray)) {
    throw 'EXCEPTION: user response is not an array.'
  }
  userArray.forEach(userObject => {
    integerProperties.forEach(numberKey => {
      validateKey(userObject, numberKey, 'number', 'users');
    });
    stringProperties.forEach((stringKey) => {
      validateKey(userObject, stringKey, 'string', 'users');
    });
  });
  return true;
};

