const initialState = [
  {
    company: 'Kweller Prep',
    filename: 'kweller.png',
    url: '/ad/kweller',
  },
  {
    company: 'The Tutorverse',
    filename: 'tutorverse.jpg',
    url: '/ad/tutorverse',
  },
  {
    company: 'Manhattan Ace',
    filename: 'manhattanace.png',
    url: '/ad/manhattanace',
  },
  {
    company: 'Georgetown University',
    filename: 'Georgetown.png',
    url: '/ad/georgetown',
  },
  {
    company: 'Parsons Paris',
    filename: 'Parsons.png',
    url: '/ad/parsons',
  },
  {
    company: 'Columbia University',
    filename: 'Columbia.png',
    url: '/ad/columbia',
  },
  {
    company: 'University of Rochester',
    filename: 'Rochester.png',
    url: '/ad/rochester',
  },
];

const reducer = (state = { ...initialState }) => state;

export default reducer;
