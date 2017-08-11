import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, HEADER } from "../../constants";
import { getProcessedUsersResponse } from "./selectors";

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_USER_PENDING });
    axios.get(`${STUY_SPEC_API}/users`, { 'headers': HEADER })
      .then(response => {
        validateUsers(response.data);
        dispatch({
          type: t.FETCH_USER_FULFILLED,
          payload: response.data,
        });
        dispatch({
          type: t.ADD_USERS,
          payload: getProcessedUsersResponse(getState()),
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_USER_REJECTED,
          payload: err,
        })
      })
  };
};

const validateUserKey = (userObject, key, type) => {
  if (key in userObject) {
    if (typeof (userObject[ key ]) === type) {
      return true;
    } else {
      throw `EXCEPTION: key ${key} in userObject is 
        ${typeof (userObject[ key ])}, but should be ${type}.`;
    }
  } else {
    throw `EXCEPTION: key ${key} is undefined in userObject.`;
  }
};

const validateUsers = (userArray) => {
  const integerProperties = [ 'id' ];
  const stringProperties = [ 'firstName', 'lastName', 'username', 'email', 'createdAt', 'updatedAt' ];
  if (!Array.isArray(userArray)) {
    throw 'EXCEPTION: user response is not an array.'
  }
  userArray.forEach(userObject => {
    integerProperties.forEach(numberKey => {
      validateUserKey(userObject, numberKey, 'number');
    });
    stringProperties.forEach((stringKey) => {
      validateUserKey(userObject, stringKey, 'string');
    });
  });
  return true;
};

