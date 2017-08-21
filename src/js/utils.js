export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Writes the filter function for objects.
 * @param obj
 * @param {function} predicate is the function which keys/properties must match.
 */
export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[ key ]))
    .reduce((res, key) => (res[ key ] = obj[ key ], res), {});

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
/**
 * Formats date from ISO string to a more readable form
 * If published on same day, return HH:MM AM/PM
 * if published on different day, return Month Day, Year
 * @param {ISO} string
 * @returns {string}
 */
export const formatDate = (string) => {
  //Removes the Z at the end of the string which eliminates the need to offset the date
  const newString = string.slice(0, string.length - 1);
  // articleDateline and currentDate will be in the format:
  // Tue Aug 01 2017 20:08:54 GMT-0400 (EDT)
  const articleDateline = new Date(newString);
  const currentDate = new Date();
  //formattedDate is in the following format:
  //August 1, 2017, 8:08 PM
  const options = {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  };
  const formattedDate = articleDateline.toLocaleDateString("en-us", options);
  //splitIndex returns the index of the space between the date and time
  const splitIndex = formattedDate.lastIndexOf(' ', formattedDate.length - 4);
  //These slices return this part: Aug 01 2017
  if (currentDate.toString().slice(4, 15) ===
    articleDateline.toString().slice(4, 15)) {
    //Returns the "8:08 PM" portion
    return formattedDate.slice(splitIndex + 1);
  } else {
    //Returns the "August 1, 2017" portion
    return formattedDate.slice(0, splitIndex - 1);
  }
};


export const validateKey = (responseObject, key, type, module) => {
  if (key in responseObject) {
    if (typeof (responseObject[ key ]) === type) {
      return true;
    } else {
      throw `EXCEPTION: key ${key} in ${module}Object is 
        ${typeof (responseObject[ key ])}, but should be ${type}.`;
    }
  } else {
    throw `EXCEPTION: key ${key} is undefined in ${module}Object.`;
  }
};