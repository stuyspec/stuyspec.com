import axios from "axios";
import { validateKey } from "../../utils";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";

export const fetchSections = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_SECTIONS_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/sections`, STUY_SPEC_API_HEADERS)
      .then(response => {
        console.log(response);
        validateSections(response.data);
        dispatch({
          type: t.FETCH_SECTIONS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_SECTIONS_REJECTED,
          payload: err,
        });
      });
  };
};

const validateSections = sectionsArray => {
  const integerProperties = ["id"];
  const stringProperties = ["name", "description", "slug"];
  if (!Array.isArray(sectionsArray)) {
    throw "EXCEPTION: sections response is not an array.";
  }
  sectionsArray.forEach(section => {
    integerProperties.forEach(numberKey => {
      validateKey(section, numberKey, "number");
    });
    stringProperties.forEach(stringKey => {
      validateKey(section, stringKey, "string");
    });
  });
  return true;
};