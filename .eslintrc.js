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
    "react/jsx-closing-bracket-location": [1, 'tag-aligned'],

    // REMOVE FOLLOWING AFTER SINGLE-QUOTES
    "quotes": [0],
    "jsx-quotes": [0],

    // REMOVE AFTER OUR CODE IS BETTER
    "react/prop-types": [0],
  },
};