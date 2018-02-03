import { SPEC_REFERENCE_PATTERN, SPEC_IMG_CAROUSEL_PATTERN } from "./constants";

export const capitalizeWord = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const shortenSummary = article => {
  if (article.content === undefined || article.summary === undefined) {
    console.error(`Article: ${article}. Missing content or summary field in shortenSummary.`);
    return null;
  }
  let articleSummary = article.summary.split(" ");
  if (articleSummary.length > 25) {
    articleSummary = articleSummary.slice(0, 24).join(" ") + "...";
  } else if (article.summary === '') {
    articleSummary = article.content
      .replace(SPEC_REFERENCE_PATTERN, '')
      .replace(SPEC_IMG_CAROUSEL_PATTERN, '')
      .replace(/<p>|<\/p>|<br>|<br\/>|<b>/g, '')
      .replace(/<h4>|<\/h4>/g, ' ')
      .replace(/<i>|<\/i>/g, ' ')
      .replace(/<\/b>/g, ' ');
    return articleSummary
      .split(" ")
      .slice(0, 24)
      .join(" ") + "...";
  } else {
    articleSummary = articleSummary.join(" ");
  }
  return articleSummary;
}

/**
 * Writes the filter function for objects.
 * @param obj
 * @param {function} predicate is the function which keys/properties must match.
 */
export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

export const getUrlParameterByName = (name, url=window.location.href) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
