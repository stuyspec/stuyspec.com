import axios from "axios";
import * as t from "./actionTypes";
import { STUY_SPEC_API, HEADER } from "../../constants"
import { getProcessedMediaWithCredits, matchMediaToArticles, getMediaWithUserSlug } from "./selectors";
import { checkKeyValidity} from "../../utils"

//TODO: get rid of fakeMedia once there is something in the API for media
const fakeMedia = [
  {
    id:0,
    userId:0,
    articleId:12,
    url:'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title:'Bird Die',
    caption:'A bird is going to die',
    type:'Photograph',
  },
  {
    id:1,
    userId:2,
    articleId:10,
    url:'https://i.ytimg.com/vi/v6wfobPI2fI/maxresdefault.jpg',
    title:'Car Crash',
    caption:'Two cars fight to the death in order to win lifetime supply of tires. ',
    type:'Photograph',
  },
  {
    id:2,
    userId:1,
    articleId:11,
    url:'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title:'Bird Die',
    caption:'A bird is going to die',
    type:'Photograph',
  },
  {
    id:3,
    userId:0,
    articleId:13,
    url:'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title:'Bird Die',
    caption:'A bird is going to die',
    type:'Photograph',
  },
  {
    id:4,
    userId:2,
    articleId:14,
    url:'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title:'Bird Die',
    caption:'A bird is going to die',
    type:'Photograph',
  }
];

export const fetchMedia = () => {
  return (dispatch, getState) => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    axios.get(`${STUY_SPEC_API}/articles`, { 'headers': HEADER })
      .then(response => {
        if (isMediaValid(fakeMedia)) {
          dispatch({
            type: t.FETCH_MEDIA_FULFILLED,
            payload: fakeMedia,
          });
        }
      })
      .then(response => {
        dispatch({
          type: t.ADD_MEDIA,
          payload: getMediaWithUserSlug(getState()),
        });
      })
      .then(response => {
        dispatch({
          type: t.ADD_MEDIA,
          payload: getProcessedMediaWithCredits(getState()),
        });
      })
      .then(response => {
        dispatch({
          type: t.MATCH_MEDIA,
          payload: matchMediaToArticles(getState()),
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

const isMediaValid = (mediaArray) => {
  const integerProperties = [ 'id', 'userId', 'articleId' ];
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