import React from "react";
import { Link } from "react-router-dom";

const Byline = ({ classes, contributors }) => {
  let separator = ', ';
  return (
    <div className={ classes.Byline }>
      {
        contributors.map((contributor, index) => {
          if (index === contributors.length - 2) {
            separator = ' & ';
          } else if (index === contributors.length - 1) {
            separator = '';
          }
          return (
            <p key={ contributor.id }>
              { index === 0 ? 'By ' : '' }
              <Link to={ `/contributors/${contributor.slug}` }>
                { contributor.firstName } { contributor.lastName }
              </Link>{ separator }
            </p>
          );
        })
      }
    </div>
  );
};

export default Byline;
