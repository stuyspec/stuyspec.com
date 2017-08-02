import {
  FETCH_ARTICLE_PENDING,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_FULFILLED,
  TEST,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  articles: {},
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLE_PENDING: {
      return { ...state, isFetching: true, };
    }
    case FETCH_ARTICLE_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        // action.payload already tested in actions to be array
        articles: action.payload.reduce((acc, cur) => {
          const articleSlug = cur.slug;
          cur.dateline = formatDate(cur.created_at);
          cur.sectionSlug = slugFinder(cur.section_id, action);
          delete cur.section_id;
          acc[ articleSlug ] = cur;
          return acc;
        }, { ...state.articles }),
      };
    }
    case FETCH_ARTICLE_REJECTED: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
  }
  return state;
};

const formatDate = (createdAt) => {
  const articleDateline = new Date(createdAt);
  const dateOffset = Number(articleDateline.toString().slice(28, 31)) * (-1);
  articleDateline.setHours(articleDateline.getHours() + dateOffset);
  //Converts the date object into a string to be used for slicing
  const adjustedArticleDateline = articleDateline.toString();
  const currentDate = (new Date()).toString().slice(4, 15);
  if (currentDate === adjustedArticleDateline.slice(4, 15)) {
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    // articleDateTime is a string in the format <Wednesday, Aug 30, 2017, 8:03 PM>
    const articleDateTime = articleDateline.toLocaleDateString("en-us", options);
    return articleDateTime.slice(articleDateTime.indexOf(' ', 20));
  } else {
    const months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
    return months[ articleDateline.getMonth() ] + ' ' +
      articleDateline.getDate() + ',' +
      adjustedArticleDateline.slice(10, 15);
  }
};

const slugFinder = (sectionId, action) => {
  const sections = action.sections;
  for (sectionIndex in sections) {
    const sectionObject = sections[ sectionIndex ];
    if (sectionObject.id === sectionId) {
      return sectionObject.slug;
    }
  }
  console.log("Section ID of requested article doesn't match")
};


export default reducer;