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
    articleSummary = article.content.replace('<p>', '').replace('</p>', '').split(" ").slice(0, 24).join(" ") + "...";
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

export const isObjectEmpty = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// TODO: make formatDate smarter (less string slicing and more formatting).
/**
 * Formats date from ISO string to a more readable form
 * If published on same day, return HH:MM AM/PM
 * if published on different day, return Month Day, Year
 * @param {ISO} string
 * @returns {string}
 */
export const formatDate = string => {
  //Removes the Z at the end of the string which eliminates the need to offset the date
  const newString = string.slice(0, string.length - 1);
  // articleDateline and currentDate will be in the format:
  // Tue Aug 01 2017 20:08:54 GMT-0400 (EDT)
  const articleDateline = new Date(newString);
  const currentDate = new Date();
  //formattedDate is in the following format:
  //August 1, 2017, 8:08 PM
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = articleDateline.toLocaleDateString("en-us", options);
  //splitIndex returns the index of the space between the date and time
  const splitIndex = formattedDate.lastIndexOf(" ", formattedDate.length - 4);
  //These slices return this part: Aug 01 2017
  if (
    currentDate.toString().slice(4, 15) ===
    articleDateline.toString().slice(4, 15)
  ) {
    //Returns the "8:08 PM" portion
    return formattedDate.slice(splitIndex + 1);
  } else {
    //Returns the "August 1, 2017" portion
    return formattedDate.slice(0, splitIndex - 1);
  }
};

export const validateKey = (responseObject, key, type) => {
  if (key in responseObject) {
    if (typeof responseObject[key] === type) {
      return true;
    } else {
      throw `EXCEPTION: key ${key} in response data is 
        ${typeof responseObject[key]}, but should be ${type}.`;
    }
  } else {
    throw `EXCEPTION: key ${key} is undefined in ${module}Object.`;
  }
};

/*
# Mr. Brooks's version

def Conv_Num_to_Roman(n):
    ones=['I','II','III','IV','V','VI','VII','VIII','IX']
    tens=['X','XX','XXX','XL','L','LX','LXX','LXXX','XC']
    huns=['C','CC','CCC','CD','D','DC','DCC','DCCC','CM']
    thos=['M','MM']

    s=''
    if n>=1000:
        s+=thos[n/1000 - 1]
        n%=1000
    if n>=100:
        s+=huns[n/100 - 1]
        n%=100
    if n>=10:
        s+=tens[n/10 - 1]
        n%=10
    if n>0:
        s+=ones[n - 1]
    return s
 */
//Credit to Mr.Brooks
export const convertToRoman = number => {
  const ones = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const tens = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const huns = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const thos = ["M", "MM"];
  let arabicNum = number;
  let romanString = "";
  if (arabicNum >= 1000) {
    romanString += thos[Math.floor(arabicNum / 1000) - 1];
    arabicNum %= 1000;
  }
  if (arabicNum >= 100) {
    romanString += huns[Math.floor(arabicNum / 100) - 1];
    arabicNum %= 100;
  }
  if (arabicNum >= 10) {
    romanString += tens[Math.floor(arabicNum / 10) - 1];
    arabicNum %= 10;
  }
  if (arabicNum > 0) {
    romanString += ones[Math.floor(arabicNum) - 1];
  }
  return romanString;
};
