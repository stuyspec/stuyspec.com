import React from "react";
import { createSelector } from "reselect";

export const getNewspaperFromSlug = (state, props) => {
  console.log(props.match.params);
  return props.match.params;
  // go into Reactdevtools in chrome, and try to find a component with props match. match.params.volume and match.params.issue
};
