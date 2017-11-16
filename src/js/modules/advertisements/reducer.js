const initialState = [
  {
    "company": "Sticker You",
    "filename": "stickeryou.jpg",
    "url": "https://www.stickeryou.com/products/custom-stickers/335",
  },
  {
    "company": "Sticker Mule",
    "filename": "sticker-mule-leadership.png",
    "url": "https://www.stickermule.com/hi/uses/laptop-stickers",
  }
];

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default reducer;
