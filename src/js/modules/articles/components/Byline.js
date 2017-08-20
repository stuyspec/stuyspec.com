import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

const styles = {
  Byline: {
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '6px',
    textTransform: 'uppercase',
    '& p': {
      display: 'inline',
      margin: 0,
      '& a': {
        color: '#000',
        '&:hover': {
          color: '#000'
        },
      },
    },
  },
}

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

export default injectSheet(styles)(Byline);
