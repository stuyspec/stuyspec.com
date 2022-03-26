import { CREATE_USER_FULFILLED } from './actionTypes';
import { UPDATE_USER_FULFILLED } from '../accounts/actionTypes';

const initialState = {
  error: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
};

export default reducer;
