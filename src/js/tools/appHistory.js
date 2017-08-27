import createBrowserHistory from 'history/createBrowserHistory'

let appHistory = createBrowserHistory();

appHistory.goTo = function (url) {
  appHistory.replace(url);
};

appHistory.listen((location, action) => {
  window.scrollTo(0, 0);
});

export default appHistory