// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
var getViewportWidth = function()
{
    return Math.max(window.document.documentElement.clientWidth, window.innerWidth || 0);
};

var getViewportHeight = function()
{
    return Math.max(window.document.documentElement.clientHeight, window.innerHeight || 0);
};

// SEE CONSOLE REDUX-LOGGER FOR ACTUAL AXIOS REQUEST STRUCTURE
const initialState = {
    isFetching: false,
    isFetched: false,     
    error: null,
    article: {
        request: null
    }
};

export default function reducer (state=initialState, action) {
    switch (action.type) {
        case 'article/FETCH_ARTICLE_PENDING': {
            return {...state, isFetching: true}
            break;
        }
        case 'article/FETCH_ARTICLE_REJECTED': {
            return {...state, isFetching: false, error: action.payload}
            break;
        }
        case 'article/FETCH_ARTICLE_FULFILLED': {
            return {...state,
                isFetching: false,
                isFetched: true,
                article: action.payload
            }
            break;
        }
    }
    return state
}