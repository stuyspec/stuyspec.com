import {
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  ADD_ROW_HEIGHT,
} from "./actionTypes";

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = () => {
  return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
};

const getViewportHeight = () => {
  return Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  isSidebarOpen: false,
  rowHeight: 0,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ADD_ROW_HEIGHT: {
      return {...state, rowHeight:action.payload};
    }
    case REFRESH_WINDOW_DIMENSIONS :
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();
      if (state.viewportWidth !== viewportWidth || state.viewportHeight !== viewportHeight) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else { // otherwise do not mutate
        return state;
      }
    }
    case OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: true,
      }
    }
    case CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: false,
      }
    }
    default:
      break;
  }
  return state;
};

export default reducer;
