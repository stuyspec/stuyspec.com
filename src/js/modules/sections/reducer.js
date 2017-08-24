const initialState = {
  sections: {
    0: {
      id: 0,
      name: "News",
      slug: "news",
      description: "The news of Stuyvesant.",
      parentId: null,
      permalink: "/news"
    },
    1: {
      id: 1,
      name: "Opinions",
      slug: "opinions",
      description: "The opinions of Stuyvesant.",
      parentId: null,
      permalink: "/opinions"
    },
    2: {
      id: 2,
      name: "Features",
      slug: "features",
      description: "The features of Stuyvesant.",
      parentId: null,
      permalink: "/features"
    },
    3: {
      id: 3,
      name: "Humor",
      slug: "humor",
      description: "The humor of Stuyvesant.",
      parentId: null,
      permalink: "/humor"
    },
    4: {
      id: 4,
      name: "Arts & Entertainment",
      slug: "ae",
      description: "The arts and entertainment of Stuyvesant.",
      parentId: null,
      permalink: "/ae"
    },
    5: {
      id: 5,
      name: "Sports",
      slug: "sports",
      description: "The sports of Stuyvesant.",
      parentId: null,
      permalink: "/sports"
    },
    6: {
      id: 6,
      name: "Photo",
      slug: "photo",
      description: "The photo of Stuyvesant.",
      parentId: null,
      permalink: "/photo"
    },
    7: {
      id: 7,
      name: "Campaign Coverage",
      slug: "campaign-coverage",
      description: "The campaign coverage of Stuyvesant.",
      parentId: 0,
      permalink: "/news/campaign-coverage"
    },
    8: {
      id: 8,
      name: "Staff Editorials",
      slug: "staff-editorials",
      description: "The staff editorials of Stuyvesant.",
      parentId: 1,
      permalink: "/opinions/staff-editorials"
    },
    9: {
      id: 9,
      name: "Creative Writing",
      slug: "creative-writing",
      description: "The creative writing of Stuyvesant.",
      parentId: 2,
      permalink: "/features/creative-writing"
    },
    10: {
      id: 10,
      name: "Voices",
      slug: "voices",
      description: "The voices of Stuyvesant.",
      parentId: 2,
      permalink: "/features/voices"
    },
    11: {
      id: 11,
      name: "College Essays",
      slug: "college-essays",
      description: "The college essays of Stuyvesant.",
      parentId: 2,
      permalink: "/features/college-essays"
    },
    12: {
      id: 12,
      name: "Disrespectator",
      slug: "disrespectator",
      description: "The disrespectator of Stuyvesant.",
      parentId: 3,
      permalink: "/humor/disrespectator"
    },
    13: {
      id: 13,
      name: "Spooktator",
      slug: "spooktator",
      description: "The spooktator of Stuyvesant.",
      parentId: 3,
      permalink: "/humor/spooktator"
    },
    14: {
      id: 14,
      name: "Art",
      slug: "art",
      description: "The art of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/art"
    },
    15: {
      id: 15,
      name: "Books",
      slug: "books",
      description: "The books of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/books"
    },
  }
};

const reducer = (state = { ...initialState }, action) => {
  return state;
};

export default reducer;
