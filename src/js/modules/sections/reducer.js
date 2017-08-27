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
      name: "Media",
      slug: "media",
      description: "The media of Stuyvesant.",
      parentId: null,
      permalink: "/media"
    },
    8: {
      id: 8,
      name: "Campaign Coverage",
      slug: "campaign-coverage",
      description: "The campaign coverage of Stuyvesant.",
      parentId: 0,
      permalink: "/news/campaign-coverage"
    },
    9: {
      id: 9,
      name: "Staff Editorials",
      slug: "staff-editorials",
      description: "The staff editorials of Stuyvesant.",
      parentId: 1,
      permalink: "/opinions/staff-editorials"
    },
    10: {
      id: 10,
      name: "Creative Writing",
      slug: "creative-writing",
      description: "The creative writing of Stuyvesant.",
      parentId: 2,
      permalink: "/features/creative-writing"
    },
    11: {
      id: 11,
      name: "Voices",
      slug: "voices",
      description: "The voices of Stuyvesant.",
      parentId: 2,
      permalink: "/features/voices"
    },
    12: {
      id: 12,
      name: "College Essays",
      slug: "college-essays",
      description: "The college essays of Stuyvesant.",
      parentId: 2,
      permalink: "/features/college-essays"
    },
    13: {
      id: 13,
      name: "Disrespectator",
      slug: "disrespectator",
      description: "The disrespectator of Stuyvesant.",
      parentId: 3,
      permalink: "/humor/disrespectator"
    },
    14: {
      id: 14,
      name: "Spooktator",
      slug: "spooktator",
      description: "The spooktator of Stuyvesant.",
      parentId: 3,
      permalink: "/humor/spooktator"
    },
    15: {
      id: 15,
      name: "Art",
      slug: "art",
      description: "The art of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/art"
    },
    16: {
      id: 16,
      name: "Books",
      slug: "books",
      description: "The books of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/books"
    },
    17: {
      id: 17,
      name: "Feature",
      slug: "feature",
      description: "The feature of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/feature"
    },
    18: {
      id: 18,
      name: "Film",
      slug: "film",
      description: "The film of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/film"
    },
    19: {
      id: 19,
      name: "Food",
      slug: "food",
      description: "The food of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/food"
    },
    20: {
      id: 20,
      name: "Live Performances",
      slug: "live-performances",
      description: "The live performances of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/live-performances"
    },
    21: {
      id: 21,
      name: "Television",
      slug: "television",
      description: "The television of Stuyvesant.",
      parentId: 4,
      permalink: "/ae/television"
    },
    22: {
      id: 22,
      name: "Art",
      slug: "art",
      description: "The art of Stuyvesant.",
      parentId: 7,
      permalink: "/art"
    },
    23: {
      id: 23,
      name: "Graphics",
      slug: "graphics",
      description: "The graphics of Stuyvesant.",
      parentId: 7,
      permalink: "/graphics"
    },
    24: {
      id: 24,
      name: "Music",
      slug: "music",
      description: "The music of Stuyvesant.",
      parentId: 7,
      permalink: "/music"
    },
    25: {
      id: 25,
      name: "Photo",
      slug: "photo",
      description: "The photo of Stuyvesant.",
      parentId: 7,
      permalink: "/photo"
    },
    26: {
      id: 26,
      name: "Video",
      slug: "video",
      description: "The video of Stuyvesant.",
      parentId: 7,
      permalink: "/video"
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
