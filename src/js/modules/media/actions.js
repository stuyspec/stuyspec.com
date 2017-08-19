import axios from "axios";
import { checkKeyValidity } from "../../utils";
import * as t from "./actionTypes";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADER } from "../../constants"
import { getMediaResponse } from "./selectors";

const fakeMedia = [
  {
    id: 0,
    userId: 0,
    articleId: 10,
    url: 'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title: 'Bird Die',
    caption: 'A bird is going to die.',
    type: 'photograph',
    isFeatured: true
  },
  {
    id: 1,
    userId: 2,
    articleId: 11,
    url: 'https://i.ytimg.com/vi/v6wfobPI2fI/maxresdefault.jpg',
    title: 'Car Crash',
    caption: 'Two cars fight to the death in order to win lifetime supply of tires.',
    type: 'photograph',
    isFeatured: true
  },
  {
    id: 2,
    userId: 1,
    articleId: 12,
    url: 'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title: 'Bird Die',
    caption: 'A bird is going to die.',
    type: 'photograph',
    isFeatured: true
  },
  {
    id: 3,
    userId: 0,
    articleId: 13,
    url: 'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title: 'Bird Die',
    caption: 'A bird is going to die.',
    type: 'photograph',
    isFeatured: true
  },
  {
    id: 4,
    userId: 2,
    articleId: 14,
    url: 'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title: 'Bird Die',
    caption: 'A bird is going to die.',
    type: 'photograph',
    isFeatured: true
  }
];

export const fetchMedia = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/media`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => { // TODO replace fakeMedia with response.data (real media)
        if (validateMedia(fakeMedia)) {
          dispatch({
            type: t.FETCH_MEDIA_FULFILLED,
            payload: fakeMedia,
          });
        }
      })
      .then(response => {
        dispatch({
          type: t.ADD_MEDIA,
          payload: getMediaResponse(getState()),
        });
      })
      .catch((err) => {
        dispatch({
          type: t.FETCH_MEDIA_REJECTED,
          payload: err,
        })
      })
  };
};

const validateMedia = (mediaArray) => {
  const integerProperties = [ 'id', 'userId' ];
  const stringProperties = [ 'url', 'title', 'caption', 'type' ];
  if (!Array.isArray(mediaArray)) {
    throw 'EXCEPTION: media response is not an array.'
  }
  mediaArray.forEach(mediaObject => {
    integerProperties.forEach(numberKey => {
      checkKeyValidity(mediaObject, numberKey, 'number', 'media');
    });
    stringProperties.forEach((stringKey) => {
      checkKeyValidity(mediaObject, stringKey, 'string', 'media');
    });
  });
  return true;
};