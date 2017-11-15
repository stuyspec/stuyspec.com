import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";

export const fetchOutquotes = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_OUTQUOTES_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/outquotes`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateOutquotes(response.data);
        dispatch({
          type: t.FETCH_OUTQUOTES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_OUTQUOTES_REJECTED,
          payload: err,
        });
      });
  };
};

const validateOutquotes = outquoteArray => {
  const integerProperties = ["id", "articleId"];
  const stringProperties = ["text"];
  if (!Array.isArray(outquoteArray)) {
    throw "EXCEPTION: outquotes response is not an array.";
  }
  outquoteArray.forEach(outquoteObject => {
    integerProperties.forEach(numberKey => {
      validateKey(outquoteObject, numberKey, "number");
    });
    stringProperties.forEach(stringKey => {
      validateKey(outquoteObject, stringKey, "string");
    });
  });
  return true;
};
