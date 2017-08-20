import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { getTopLevelSections } from "../../sections/selectors";

const styles = {
  Masthead: {
    borderBottom: '1px solid black',
    margin: '0px auto 24px auto',
    paddingTop: '11px',
    textAlign: 'center',
    width: '1060px',
  },
  theSpectatorLogo: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '22px',
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
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    marginBottom: '16px',
    padding: 0,
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 12px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
  },
};

const Masthead = ({ classes, topLevelSections }) => {
  const createSectionLinks = () => {
    return Object.values(topLevelSections).map(section => {
      return (
        <li key={ section.id } className={ classes.sectionListItem }>
          <Link to={ section.permalink } className={ classes.sectionLink }>
            { section.name }
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={ classes.Masthead }>
      <Link to="/" className={ classes.theSpectatorLogo }>The Spectator</Link>
      <ul className={ classes.sectionLinksNav }>
        { createSectionLinks() }
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