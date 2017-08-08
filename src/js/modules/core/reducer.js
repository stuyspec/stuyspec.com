import { REFRESH_WINDOW_DIMENSIONS } from "./actionTypes";

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
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFRESH_WINDOW_DIMENSIONS :
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();
      if (state.viewportWidth !== viewportWidth || state.viewportHeight !== viewportHeight) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else { // otherwise do not mutate
        return state;
      }
    default:
      break;
  }
  return state;
};

export default reducer;
