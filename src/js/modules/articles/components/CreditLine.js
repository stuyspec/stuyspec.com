import React from "react";
import { Link } from "react-router-dom";
import { capitalizeWord } from "../../../utils";
import { MEDIA_CREATOR_SLUG } from "../../../constants";

const CreditLine = ({ classes, featuredMedia: { type, creator } }) => {
  return (
    <Link className={ classes.creditLine }
          to={ `/${MEDIA_CREATOR_SLUG[ type ]}/${creator.slug}` }>
      { capitalizeWord(type) }
      &nbsp;by&nbsp;
      { `${creator.firstName} ${creator.lastName}` }
    </Link>
  );
};

export default CreditLine;
