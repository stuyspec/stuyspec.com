module.exports = {
  rootDir: "src/tests",
  testRegex: "/src/tests/.*test\\.tsx$",
  setupFiles: ["<rootDir>/App.spec.js"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/__mocks__/CSSStub.config.js",
    "react-dotenv": "<rootDir>/__mocks__/react-dotenv.tsx",
  },
};
