const initialState = [
  {
    company: "Kweller Prep",
    filename: "kweller.png",
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
    company: "Manhattan Ace",
    filename: "manhattanace.png",
    url: "/ad/manhattanace"
  }  
];

const reducer = (state = { ...initialState }) => {
  return state;
};

export default reducer;
