import * as t from './actionTypes';

export const expandTextBox = () => (
  {
    type: t.EXPAND_TEXTBOX
  }
);
export const shrinkTextBox = () => (
  {
    type: t.SHRINK_TEXTBOX
  }
);
export const toggleLogIn = () => (
  {
    type: t.TOGGLE_LOG_IN
  }
);
export const updateComment = (text) => (
  {
    type: t.UPDATE_COMMENT,
    payload: text,
  }
);