import createBrowserHistory from 'history/createBrowserHistory'

let appHistory = createBrowserHistory();

appHistory.goTo = function(url)
{
    appHistory.replace(url);
};

export default appHistory