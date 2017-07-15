import combineReducers from 'redux/lib/combineReducers'
import routerReducer from 'react-router-redux/reducer'
import article from './modules/article'

export default combineReducers(
{
    [article.constants.NAME]: article.reducer,
    router: routerReducer
});
