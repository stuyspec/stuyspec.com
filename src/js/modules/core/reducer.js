import
{
    FETCH_ARTICLE
} from './actionTypes'

const initialState =
{
    isFetching: false,
    isFetched: false,
    error: null,
    articles: {
        /*
        "0": {
            id: 0,
            title: "Apples Rain in New York City",
            slug: "apples-rain-in-new-york-city",
            content: [
                "Paragraph 1",
                "Paragraph 2"
            ],
            volume: 108,
            issue: 1,
            section: 0,
        }
        */
    },
    sections: {
        "0": {
            id: 0,
            name: "News",
            slug: "news",
            parent_id: null
        },
    },
    request: null,
};

const reducer = (state={...initialState}, action)=>
{
    switch(action.type)
    {
        case 'core/FETCH_ARTICLE_PENDING': {
            return {...state, isFetching: true}
            break;
        }
        case 'core/FETCH_ARTICLE_REJECTED': {
            return {...state, isFetching: false, error: action.payload}
            break;
        }
        case 'core/FETCH_ARTICLE_FULFILLED': {
            return {...state,
                isFetching: false,
                isFetched: true,
                request: action.payload
            }
            break;
        }
    }
    return state;
};

export default reducer