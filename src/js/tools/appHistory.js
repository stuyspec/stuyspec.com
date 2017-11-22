import createBrowserHistory from "history/createBrowserHistory";

let appHistory = createBrowserHistory();

appHistory.goTo = function(url) {
  appHistory.push(url);
};

appHistory.listen((location, action) => {
  document.scrollingElement.scrollTop=0;
});

export default appHistory;
