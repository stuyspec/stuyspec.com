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
      permalink: "/news"
    },
    "opinions": {
      id: 1,
      name: "Opinions",
      slug: "opinions",
      description: "The opinions of Stuyvesant.",
      parentSlug: null,
      permalink: "/opinions"
    },
    "features": {
      id: 2,
      name: "Features",
      slug: "features",
      description: "The features of Stuyvesant.",
      parentSlug: null,
      permalink: "/features"
    },
    "humor": {
      id: 3,
      name: "Humor",
      slug: "humor",
      description: "The humor of Stuyvesant.",
      parentSlug: null,
      permalink: "/humor"
    },
    "ae": {
      id: 4,
      name: "Arts & Entertainment",
      slug: "ae",
      description: "The arts and entertainment of Stuyvesant.",
      parentSlug: null,
      permalink: "/ae"
    },
    "sports": {
      id: 5,
      name: "Sports",
      slug: "sports",
      description: "The sports of Stuyvesant.",
      parentSlug: null,
      permalink: "/sports"
    },
    "photo": {
      id: 6,
      name: "Photo",
      slug: "photo",
      description: "The photo of Stuyvesant.",
      parentSlug: null,
      permalink: "/photo"
    },
    "campaign-coverage": {
      id: 7,
      name: "Campaign Coverage",
      slug: "campaign-coverage",
      description: "The campaign coverage of Stuyvesant.",
      parentSlug: "news",
      permalink: "/news/campaign-coverage"
    },
    "staff-editorials": {
      id: 8,
      name: "Staff Editorials",
      slug: "staff-editorials",
      description: "The staff editorials of Stuyvesant.",
      parentSlug: "opinions",
      permalink: "/opinions/staff-editorials"
    },
    "creative-writing": {
      id: 9,
      name: "Creative Writing",
      slug: "creative-writing",
      description: "The creative writing of Stuyvesant.",
      parentSlug: "features",
      permalink: "/features/creative-writing"
    },
    "voices": {
      id: 10,
      name: "Voices",
      slug: "voices",
      description: "The voices of Stuyvesant.",
      parentSlug: "features",
      permalink: "/features/voices"
    },
    "college-essays": {
      id: 11,
      name: "College Essays",
      slug: "college-essays",
      description: "The college essays of Stuyvesant.",
      parentSlug: "features",
      permalink: "/features/college-essays"
    },
    "disrespectator": {
      id: 12,
      name: "Disrespectator",
      slug: "disrespectator",
      description: "The disrespectator of Stuyvesant.",
      parentSlug: "humor",
      permalink: "/humor/disrespectator"
    },
    "spooktator": {
      id: 13,
      name: "Spooktator",
      slug: "spooktator",
      description: "The spooktator of Stuyvesant.",
      parentSlug: "humor",
      permalink: "/humor/spooktator"
    },
    "art": {
      id: 14,
      name: "Art",
      slug: "art",
      description: "The art of Stuyvesant.",
      parentSlug: "ae",
      permalink: "/ae/art"
    },
    "books": {
      id: 15,
      name: "Books",
      slug: "books",
      description: "The books of Stuyvesant.",
      parentSlug: "ae",
      permalink: "/ae/books"
    },
  }
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default reducer;
