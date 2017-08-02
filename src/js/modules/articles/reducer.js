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
          cur.dateline = dateConverter(cur.created_at);
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

const dateConverter = (createdAt) => {
  const articleDate = new Date(createdAt);
  const dateChange = Number(articleDate.toString().slice(28,31)) * (-1);
  articleDate.setHours(articleDate.getHours() + dateChange);
  const adjustedArticleDate = articleDate.toString();
  console.log(adjustedArticleDate);
  const currentDate = (new Date()).toString().slice(4, 15);
  if (currentDate === adjustedArticleDate.slice(4, 15)) {
    const articleTime = convertToAMPM(adjustedArticleDate.slice(16, 21));
    return articleTime;
  } else {
    const months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
    return months[ articleDate.getMonth() ] + ' ' +
      articleDate.getDate() + ',' +
      adjustedArticleDate.slice(10, 15);
  }
};

const convertToAMPM = (time) => {
  const hour = Number(time.slice(0, 2));
  if (hour <= 12) {
    return hour + time.slice(2, 5) + ' A.M.';
  } else {
    const newTime = (hour - 12) + time.slice(2, 5) + ' P.M.';
    return newTime;
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