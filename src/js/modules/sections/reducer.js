const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  sections: {
    "news": {
      id: 0,
      name: "News",
      slug: "news",
      description: "The news of Stuyvesant.",
      parentSlug: null,
      permalink: "/news",
    },
  },
};

const reducer = (state = { ...initialState }, action) => {
  return state;
};

export default reducer;
