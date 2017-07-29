/**
 * Writes the filter function for objects.
 * @param {function} predicate is the function which keys/properties must match.
 */
export const objectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[ key ]))
    .reduce((res, key) => (res[ key ] = obj[ key ], res), {});
