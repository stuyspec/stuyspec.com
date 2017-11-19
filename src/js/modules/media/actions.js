import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";

let fakeMedia = [];
const mediaUrls = [
  "https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg",
  "https://i.ytimg.com/vi/v6wfobPI2fI/maxresdefault.jpg",
  "https://images.unsplash.com/photo-1441794016917-7b6933969960?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1489619547086-641e1c87c3ff?dpr=2&auto=format&fit=crop&w=1080&h=750&q=80&cs=tinysrgb&crop=",
];
for (let i = 0; i < 37; i++) {
  fakeMedia.push({
    id: i,
    userId: 1,
    articleId: i,
    url: mediaUrls[i % mediaUrls.length],
    title: "A Bird Will Die.",
    caption:
      "As the snake reaches up to kill the bird, the bird has deja vu of that visit to the Gucci store.",
    type: "photograph",
    isFeatured: true,
  });
}

export const fetchMedia = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    axios
      .get(`${STUY_SPEC_API_URL}/media`, STUY_SPEC_API_HEADERS)
      .then(response => {
        validateMedia(response.data);
        dispatch({
          type: t.FETCH_MEDIA_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_MEDIA_REJECTED,
          payload: err,
        });
      });
  };
};

const validateMedia = mediaArray => {
  const integerProperties = ["id", "userId"];
  const stringProperties = ["url", "title", "caption", "mediaType"];
  if (!Array.isArray(mediaArray)) {
    throw "EXCEPTION: media response is not an array.";
  }
  mediaArray.forEach(mediaObject => {
    integerProperties.forEach(numberKey => {
      validateKey(mediaObject, numberKey, "number");
    });
    stringProperties.forEach(stringKey => {
      validateKey(mediaObject, stringKey, "string");
    });
  });
  return true;
};
