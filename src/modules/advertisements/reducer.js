const initialState = [
  {
    company: "Kweller Prep",
    filename: "kweller.png",
    url: "/ad/kweller",
  },
  {
    company: "Georgetown University",
    filename: "Georgetown.png",
    url: "/ad/georgetown",
  },
  {
    company: "Parsons Paris",
    filename: "Parsons.png",
    url: "/ad/parsons",
  },
  {
    company: "Columbia University",
    filename: "Columbia.png",
    url: "/ad/columbia",
  },
  {
    company: "University of Rochester",
    filename: "Rochester.png",
    url: "/ad/rochester",
  },
  {
    company: "Don't Sweat the Essay",
    filename: "DontSweatTheEssay.png",
    url: "/ad/dontsweattheessay",
  },
];

const reducer = (state = { ...initialState }) => state;

export default reducer;
