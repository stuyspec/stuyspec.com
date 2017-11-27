import {
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  FETCH_INIT_DATA_PENDING,
  FETCH_INIT_DATA_FULFILLED,
  FETCH_INIT_DATA_REJECTED,
} from "./actionTypes";

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = () => {
  return Math.max(
    window.document.documentElement.clientWidth,
    window.innerWidth || 0,
  );
};

const getViewportHeight = () => {
  return Math.max(
    window.document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  isSidebarOpen: false,
  rowHeight: 0,
  isAllDataFetched: false,
  error: null,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        isDataFetched: true,
      }
    }
    case FETCH_INIT_DATA_REJECTED: {
      return {
        ...state,
        isDataFetched: false,
      }
    }
    case REFRESH_WINDOW_DIMENSIONS: {
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();
      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else {
        // otherwise do not mutate
        return state;
      }
    }
    case FETCH_INIT_DATA_PENDING: {
      return {
        ...state,
        isAllDataFetched: false,
        error: null,
      }
    }
    case FETCH_INIT_DATA_FULFILLED: {
      return {
        ...state,
        isAllDataFetched: true,
      }
    }
    case FETCH_INIT_DATA_REJECTED: {
      return {
        ...state,
        error: action.payload,
        /* If somehow another slice's reducer reading in data fails,
         * isAllDataFetched would be true, and FETCH)INIT_DATA_FULFILLED would
         * have been dispatched, so we need to make sure isAllDataFetched is
         * false.
         */
        isAllDataFetched: false,
      };
    }
    case OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
