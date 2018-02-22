import {
  REFRESH_WINDOW_DIMENSIONS,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
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
  error: null,
  isLightboxVisible: false,
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFRESH_WINDOW_DIMENSIONS: {
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();
      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return {
          ...state,
          viewportWidth,
          viewportHeight,
        };
      } else {
        // otherwise do not mutate
        return state;
      }
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
    case OPEN_LIGHTBOX: {
      return {
        ...state,
        isLightboxVisible: true,
      };
    }
    case CLOSE_LIGHTBOX: {
      return {
        ...state,
        isLightboxVisible: false,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
