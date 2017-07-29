import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import sections from '../../sections';

import articles from '../../articles';

const styles = {
  SectionPage__Header: {
    color: '#000',
  }
};

/* TODO: make subsection tree work for any depth
 */

const SectionPage = ({ classes, articles, subsections, section, match }) => {
  const createSubsectionLinks = () => {
    return Object.keys(subsections).map(function (key, index) {
      const subsection = subsections[ key ];
      return (
        <li key={`subsectionLink${index}`}>
          <Link to={match.url + '/' + subsection.slug}>{subsection.name}</Link>
        </li>
      );
    });
  };
  const createArticleLinks = () => {
    console.log(sections);
    return Object.keys(articles).map(function (key, index) {
      const article = articles[ key ];
      let pathToArticlePage = article.slug;
      // if article is not a direct child of this section but is that of the section's subsection
      if (subsections[ article.sectionSlug ] !== undefined) {
        pathToArticlePage = article.sectionSlug + '/' + article.slug;
      }
      return (
        <li key={`articleLink${index}`}>
          <Link to={match.url + '/' + pathToArticlePage}>{article.title}</Link>
        </li>
      );
    });
  };
  return (
    <div>
      <h1 className={classes.SectionPage__Header}>{section.name}</h1>
      <p>description: {section.description}</p>
      <hr/>
      <p>subsections</p>
      <ul>
        {createSubsectionLinks()}
      </ul>
      <hr/>
      <p>articles</p>
      <ul>
        {createArticleLinks()}
      </ul>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  articles: articles.selectors.getArticlesWithinSection(state, ownProps),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SectionPage));