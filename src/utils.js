export const capitalizeWord = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const delay = ms => {
  return x => new Promise(resolve => setTimeout(() => resolve(x), ms));
};

// The filter function, but for objects. The predicate is the filtering
// function.
export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
