import {
  FETCH_USERS_PENDING,
  FETCH_USERS_REJECTED,
  FETCH_USERS_FULFILLED,
  FETCH_USER_ROLES_FULFILLED,
  FETCH_ROLES_FULFILLED,
  CREATE_USER_FULFILLED,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  users: {},
  roles: {},
  userRoles: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USERS_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_USERS_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        users: action.payload.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {}),
      };
    }
    case FETCH_USERS_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case FETCH_USER_ROLES_FULFILLED: {
      return { ...state, userRoles: action.payload };
    }
    case FETCH_ROLES_FULFILLED: {
      return {
        ...state,
        roles: action.payload.reduce((acc, role) => {
          acc[role.id] = role;
          return acc;
        }, {}),
      };
    }
    case CREATE_USER_FULFILLED: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload
        }
      }
    }
  }
  return state;
};

export default reducer;
