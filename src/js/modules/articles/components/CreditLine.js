import React from "react";
import { Link } from "react-router-dom";

const createCreditLine = () => {
  const creator = Object.values(users)
    .find(user => user.id === featuredMedia.userId);
  return (
    <Link className={ classes.creditLine }
          to={ `/${MEDIA_CREATOR_SLUG[ featuredMedia.type ]}/${creator.slug}` }>
      { capitalizeWord(featuredMedia.type) }
      &nbsp;by&nbsp;
      { `${creator.firstName} ${creator.lastName}` }
    </Link>
  )
}

export default createCreditLine;
