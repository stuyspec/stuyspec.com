import {
  FETCH_USER_PENDING,
  FETCH_USER_REJECTED,
  FETCH_USER_FULFILLED,
} from './actionTypes';

const initialState = {
  isFetching: false,
  isFetched: false,
  error: null,
  request: null,
  users: {
    "jason-kao": {
      id: 0,
      firstName: "Jason",
      lastName: "Kao",
      username: "jkao1",
      email: "jkao1@stuy.edu",
      description: "Jason is a web editor for The Spectator. He designs and codes the client-facing application of The Spectator Website. Along with coding, Jason is very passionate about badminton and is on the varsity team.",
      slug: "jason-kao",
      url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/19030585_1210056409103585_1755383162605573147_n.jpg?oh=807f98c5050de9527b08bf52bcff63a2&oe=5A36E66E"
    },
    "jason-lin": {
      id: 1,
      firstName: "Jason",
      lastName: "Lin",
      username: "jasonlin",
      email: "jasonlin@gmail.com",
      description: "Jason is a web developer for The Spectator.",
      slug: "jason-lin",
      url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/17190808_757980897706195_7544830170558586831_n.jpg?oh=628bfb2a1ce2d86e10e13658fb40ed6d&oe=5A28122E"
    },
    "cathy-cai": {
      id: 2,
      firstName: "Cathy",
      lastName: "Cai",
      username: "ccai1",
      email: "ccai1@stuy.edu",
      description: "Cathy is a web EIT for The Spectator.",
      slug: "cathy-cai",
      url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c1.0.747.747/19642653_483407478666053_215916995966084393_n.jpg?oh=3f25abc6c1b24ebc147f13f1b0f73c7b&oe=5A26AC4D"
    }
  },
  roles: {
    "contributors": {
      id: 0,
      title: "Contributor",
      credentialLevel: 0,
      slug: "contributors",
    },
    "illustrators": {
      id: 1,
      title: "Illustrator",
      credentialLevel: 0,
      slug: "illustrators",
    },
    "photographers": {
      id: 2,
      title: "Photographer",
      credentialLevel: 0,
      slug: "photographers"
    },
  },
  userRoles: [
    {
      userSlug: "jason-kao",
      roleSlug: "contributors",
    },
    {
      userSlug: "jason-lin",
      roleSlug: "contributors",
    },
    {
      userSlug: "cathy-cai",
      roleSlug: "contributors",
    }
  ]
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING: {
      return { ...state, isFetching: true };
    }
    case FETCH_USER_REJECTED: {
      return { ...state, isFetching: false, error: action.payload };
    }
    case FETCH_USER_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        request: action.payload,
      };
    }
  }
  return state;
};

export default reducer;