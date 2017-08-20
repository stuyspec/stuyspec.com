import axios from "axios";
import { validateKey } from "../../utils";
import * as t from "./actionTypes";
import { STUY_SPEC_API, STUY_SPEC_API_HEADER } from "../../constants";

const fakeMedia = [
  {
    id: 0,
    userId: 0,
    articleId: 10,
    url: 'https://i.ytimg.com/vi/qh7LLydY8eo/maxresdefault.jpg',
    title: 'A Bird Will Die.',
    caption: 'As the snake reaches up to kill the bird, the bird has deja vu of that visit to the Gucci store.',
    type: 'photograph',
    isFeatured: true,
  },
  {
    id: 1,
    userId: 2,
    articleId: 11,
    url: 'https://i.ytimg.com/vi/v6wfobPI2fI/maxresdefault.jpg',
    title: 'Car Crash',
    caption: 'Two cars fight to the death in order to win lifetime supply of tires.',
    type: 'photograph',
    isFeatured: true,
  },
  {
    id: 2,
    userId: 1,
    articleId: 12,
    url: 'https://images.unsplash.com/photo-1441794016917-7b6933969960?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=',
    title: 'Beach Day',
    caption: 'The towers next to this beach are sinking three inches further into the ground every year.',
    type: 'photograph',
    isFeatured: true,
  },
  {
    id: 3,
    userId: 0,
    articleId: 13,
    url: 'https://images.unsplash.com/photo-1489619547086-641e1c87c3ff?dpr=2&auto=format&fit=crop&w=1080&h=750&q=80&cs=tinysrgb&crop=',
    title: 'Pocket Watch',
    caption: 'The pocket watch of Benjamin Franklin was found near the University of Pennsylvania',
    type: 'photograph',
    isFeatured: true,
  },
  {
    id: 4,
    userId: 2,
    articleId: 14,
    url: 'http://www.stockillustrations.com/Image.aspx?src=medres&name=ALBA1060.jpg&sz=1144&fitw=y',
    title: 'Happy Birthday',
    caption: 'As Charlotte celebrates her thirteenth birthday, she is surprised by two nice rabbits.',
    type: 'illustration',
    isFeatured: true,
  }
];

export const fetchMedia = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_MEDIA_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/media`, { 'headers': STUY_SPEC_API_HEADER })
      .then(response => { // TODO replace fakeMedia with response.data (real media)
        validateMedia(fakeMedia);
        dispatch({
          type: t.FETCH_MEDIA_FULFILLED,
          payload: fakeMedia,
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
      validateKey(mediaObject, numberKey, 'number', 'media');
    });
    stringProperties.forEach((stringKey) => {
      validateKey(mediaObject, stringKey, 'string', 'media');
    });
  });
  return true;
};