import { SPEC_REFERENCE_PATTERN } from "./constants";

export const capitalizeWord = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// The filter function, but for objects. The predicate is the filtering
// function.
export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const getUrlParameterByName = (name, url = window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
