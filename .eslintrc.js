module.exports = {
  extends: "freecodecamp",
  rules: {
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "ignore",
      "imports": "ignore",
      "exports": "ignore",
      "functions": "ignore"
    }],
    "react/jsx-sort-props": [2, {
      "callbacksLast": false,
      "shorthandFirst": false,
      "shorthandLast": false,
      "ignoreCase": false,
      "noSortAlphabetically": true,
      "reservedFirst": false,
    }],
    "react/jsx-boolean-value": [0],

    // REMOVE FOLLOWING AFTER SINGLE-QUOTES
    "quotes": [0],
    "jsx-quotes": [0],
  },
};