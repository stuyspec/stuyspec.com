import {
  CREATE_USER_FULFILLED,
} from "./actionTypes";
import {
  FETCH_INIT_DATA_FULFILLED
} from "../core/actionTypes";
import { UPDATE_USER_FULFILLED } from "../accounts/actionTypes";

const initialState = {
  error: null,
  users: {},
  roles: {},
  userRoles: [],
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        users: action.payload.users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {}),
        userRoles: action.payload.userRoles,
        roles: action.payload.roles.reduce((acc, role) => {
          acc[role.id] = role;
          return acc
        }, {}),
      }
    }
    case CREATE_USER_FULFILLED: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.data.id]: action.payload.data,
        },
      };
    }
    case UPDATE_USER_FULFILLED: {
      const updatedUser = action.payload.data;
      return {
        ...state,
        users: {
          ...state.users,
          [updatedUser.id]: updatedUser,
        },
      };
    }
  }
  return state;
};

export default reducer;
