import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import sections from "../../sections";

import Footer from './Footer';

const styles = {
  HomePage__linkList: {
  },
};

const HomePage = ({ classes, sectionLinks }) => {
  const createSectionLinks = () => {
    return Object.keys(sectionLinks).map(function (key, index) {
      return (
        <li key={`sectionLink${index}`}>
          <Link to={sectionLinks[ key ].pathToSectionPage}>{sectionLinks[ key ].name}</Link>
        </li>
      );
    });
  };
  return (
    <div>
      <h1>Home page</h1>
      <ul className={classes.HomePage__linkList}>
        {createSectionLinks()}
      </ul>
    </div>
  );
};

//Should remove footer after done styling it

const mapStateToProps = (state) => ({
  articles: {},
  sectionLinks: sections.selectors.getAllSectionLinksFromHome(state),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
