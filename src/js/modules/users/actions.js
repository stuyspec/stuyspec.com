import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_USERS_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/users`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateUsers(response.data);
        dispatch({
          type: t.FETCH_USERS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_USERS_REJECTED,
          payload: err,
        });
      });
  };
};

export const fetchRoles = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_ROLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/roles`, STUY_SPEC_API_HEADERS)
      .then(response => {
        console.log(response);
        dispatch({
          type: t.FETCH_ROLES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_ROLES_REJECTED,
          payload: err,
        });
      });
  };
};

export const fetchUserRoles = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_USER_ROLES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/user_roles`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_USER_ROLES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_USER_ROLES_REJECTED,
          payload: err,
        });
      });
  };
};

const validateUsers = userArray => {
  const integerProperties = ["id"];
  const stringProperties = [
    "firstName",
    "lastName",
    "username",
    "email",
    "createdAt",
    "updatedAt",
  ];
  if (!Array.isArray(userArray)) {
    throw "EXCEPTION: user response is not an array.";
  }
  userArray.forEach(user => {
    integerProperties.forEach(numberKey => {
      validateKey(user, numberKey, "number", "users");
    });
    stringProperties.forEach(stringKey => {
      validateKey(user, stringKey, "string", "users");
    });
  });
  return true;
};