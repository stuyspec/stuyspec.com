export const capitalizeWord = (str: string) => {
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const delay = (ms: number) => {
  return (x: number) => new Promise(resolve => setTimeout(() => resolve(x), ms));
};

// The filter function, but for objects. The predicate is the filtering
// function.
export const objectFilter = (obj: {}, predicate: (value: any) => boolean) => {
  const ret = {};
  Object.entries(obj)
    .filter(entry => predicate(entry[1]))
    .forEach(entry => Object.defineProperty(ret, entry[0], entry[1] as any));
  return ret;
}
