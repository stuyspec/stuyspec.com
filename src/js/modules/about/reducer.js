const initialState = {
  'about': {
    'id': 0,
    'title': 'About Us',
    'slug': 'about',
    'permalink': '/about',
    'content': 'About page',
    'parent': null,
  },
  'our-charter': {
    'id': 1,
    'title': 'Our Charter',
    'slug': 'our-charter',
    'permalink': '/about/our-charter',
    'content': 'Our Charter page',
    'parent': 'about',
  },
  'advertise': {
    'id': 2,
    'title': 'Advertise',
    'slug': 'advertise',
    'permalink': '/about/advertise',
    'content': 'Advertise page',
    'parent': 'about',
  },
  'sponsers': {
    'id': 3,
    'title': 'Sponsers',
    'slug': 'sponsers',
    'permalink': '/about/sponsers',
    'content': 'Sponsers page',
    'parent': 'about',
  },
  'apparel': {
    'id': 4,
    'title': 'Apparel',
    'slug': 'apparel',
    'permalink': '/about/apparel',
    'content': 'Apparel page',
    'parent': 'about',
  },
  'staff': {
    'id': 5,
    'title': 'Staff',
    'slug': 'staff',
    'permalink': '/about/staff',
    'content': 'Staff page',
    'parent': 'about',
  },
  'more': {
    'id': 6,
    'title': 'More',
    'slug': 'more',
    'permalink': '/about/more',
    'content': 'More page',
    'parent': null,
  },
  'contact': {
    'id': 7,
    'title': 'Contact',
    'slug': 'contact',
    'permalink': '/about/contact',
    'content': 'contact page',
    'parent': 'more',
  },
  'subscribe': {
    'id': 8,
    'title': 'Subscribe',
    'slug': 'subscribe',
    'permalink': '/about/subscribe',
    'content': 'Subscribe page',
    'parent': 'more',
  },
  'join-us': {
    'id': 9,
    'title': 'Join Us',
    'slug': 'join-us',
    'permalink': '/about/join-us',
    'content': 'Join Us page',
    'parent': 'more',
  },
  'visual-archives': {
    'id': 10,
    'title': 'Visual Archives',
    'slug': 'visual-archives',
    'permalink': '/about/visual-archives',
    'content': 'Visual Archives page',
    'parent': 'more',
  },
};

const reducer = (state=initialState, action) => {
  return state;
};

export default reducer;