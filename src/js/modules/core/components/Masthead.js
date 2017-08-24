import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { getTopLevelSections } from "../../sections/selectors";

const styles = {
  Masthead: {
    fontSize: 0, // resets font size to remove unwanted whitespace
    margin: '6px auto 18px auto',
    textAlign: 'center',
    width: '1066px',
  },
  theSpectatorLogo: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '10px',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    }
  },
  sectionLinksNav: {
    borderTop: '1px solid black',
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    padding: '6px',
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 16px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 300,
    textDecoration: 'none',
  },
};

const Masthead = ({ classes, topLevelSections }) => {
  return (
    <div className={ classes.Masthead }>
      <Link to="/" className={ classes.theSpectatorLogo }>The Spectator</Link>
      <ul className={ classes.sectionLinksNav }>
        {
          Object.values(topLevelSections).map(section => {
            return (
              <li key={ section.id } className={ classes.sectionListItem }>
                <Link to={ section.permalink } className={ classes.sectionLink }>
                  { section.name }
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
};

const mapStateToProps = state => ({
  topLevelSections: getTopLevelSections(state),
})

export default connect(
  mapStateToProps,
  null
) (injectSheet(styles)(Masthead));