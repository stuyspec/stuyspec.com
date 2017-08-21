import axios from "axios";
import * as t from "./actionTypes";

import { STUY_SPEC_API, HEADER } from "../../constants";
import { validateKey } from "../../utils";

const fakeUsers = [
  {
    id: 0,
    firstName: "Jason",
    lastName: "Kao",
    username: "jkao1",
    email: "jkao1@stuy.edu",
    description: "Jason is a web editor for The Spectator. He designs and codes the client-facing application of The Spectator Website. Along with coding, Jason is very passionate about badminton and is on the varsity team.",
    slug: "jason-kao",
    url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/19030585_1210056409103585_1755383162605573147_n.jpg?oh=807f98c5050de9527b08bf52bcff63a2&oe=5A36E66E"
  },
  {
    id: 1,
    firstName: "Jason",
    lastName: "Lin",
    username: "jasonlin",
    email: "jasonlin@gmail.com",
    description: "Jason is a web developer for The Spectator.",
    slug: "jason-lin",
    url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/17190808_757980897706195_7544830170558586831_n.jpg?oh=628bfb2a1ce2d86e10e13658fb40ed6d&oe=5A28122E"
  },
  {
    id: 2,
    firstName: "Cathy",
    lastName: "Cai",
    username: "ccai1",
    email: "ccai1@stuy.edu",
    description: "Cathy is a web EIT for The Spectator.",
    slug: "cathy-cai",
    url: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c1.0.747.747/19642653_483407478666053_215916995966084393_n.jpg?oh=3f25abc6c1b24ebc147f13f1b0f73c7b&oe=5A26AC4D"
  },
  {
    id: 3,
    firstName: "Nicholas",
    lastName: "Yang",
    username: "nyang1",
    email: "nyang1@stuy.edu",
    description: "Nicholas is a super alumni for The Spectator.",
    slug: "nicholas-yang",
  },
]

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_USER_PENDING });
    axios.get(`${STUY_SPEC_API}/users`, { 'headers': HEADER })
      .then(response => { // TODO: replace with response.data when API ready
        validateUsers(fakeUsers);
        dispatch({
          type: t.FETCH_USER_FULFILLED,
          payload: fakeUsers,
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_USER_REJECTED,
          payload: err,
        })
      })
  };
};

const validateUsers = (userArray) => {
  const integerProperties = [];//[ 'id' ];
  const stringProperties = [];//[ 'firstName', 'lastName', 'username', 'email', 'createdAt', 'updatedAt' ];
  if (!Array.isArray(userArray)) {
    throw 'EXCEPTION: user response is not an array.'
  }
  userArray.forEach(userObject => {
    integerProperties.forEach(numberKey => {
      validateKey(userObject, numberKey, 'number', 'users');
    });
    stringProperties.forEach((stringKey) => {
      validateKey(userObject, stringKey, 'string', 'users');
    });
  });
  return true;
};

