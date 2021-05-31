const initialState = [
  {
    company: "Kweller Prep",
    filename: "kweller.jpg",
    url: '/ad/kweller'
  },
  {
    company: "Aim Plus Education",
    filename: "aimpluseducation.png",
    url: '/ad/aimplus'
  },
  {
    company: "The Tutorverse",
    filename: "tutorverse.jpg",
    url: '/ad/tutorverse'
  },
  {
    company: "Sagacity",
    filename: "sagacity.png",
    url: '/ad/sagacity'
  }  
];

const reducer = (state = { ...initialState }) => {
  return state;
};

export default reducer;
