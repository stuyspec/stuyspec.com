import createBrowserHistory from "history/createBrowserHistory";

let appHistory = createBrowserHistory();

appHistory.goTo = function(url) {
  appHistory.push(url);
};

export default appHistory;
