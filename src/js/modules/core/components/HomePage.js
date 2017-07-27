import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import injectSheet from 'react-jss';

import {fetch} from '../actions';
import {getAllSectionLinks} from "../../sections";

const styles = {};

const HomePage = ({ classes, sectionLinks }) => {
  const createSectionLinks = () => {
    return Object.keys(sectionLinks).map(function (key,index) {
      return (
        <li key={`sectionLink${index}`}>
          <Link to={sectionLinks[key].pathToSectionPage}>{sectionLinks[key].name}</Link>
        </li>
      )
    });
  };
  return (
    <div>
      <h1>Home page</h1>
      <ul>
        { createSectionLinks() }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  articles: {},
  sectionLinks: getAllSectionLinks(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetch: fetch}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));