import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import injectSheet from 'react-jss';

import {fetch} from '../actions';
import {getCondensedArticles} from '../selectors';

const styles = {}

const HomePage = ({classes, sections}) => {
  const createSectionLinks = () => {
    return Object.keys(sections).map(function (key,index) {
      const section = sections[key];
      let pathToSectionPage = section.slug;
      if (section.parent_slug !== null) {
        pathToSectionPage = "/" + section.parent_slug + "/" + section.slug;
      }
      return (
        <li key={`sectionLink${index}`}>
          <Link to={pathToSectionPage}>{section.name}</Link>
        </li>
      )
    });
  };
  return (
    <div>
      <h1>Home page</h1>
      <ul>
        {createSectionLinks()}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  articles: getCondensedArticles(state),
  sections: state.core.entities.sections,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetch: fetch}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));