import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Col, Grid, Row } from 'react-bootstrap/lib/';
import SectionArticleList from './SectionArticleList';
import sections from '../../sections';

import articles from '../../articles';

const styles = {
  entireSectionPage: {
    color: '#000',
  },
  sectionName: {
    fontFamily: 'Canela',
    fontSize: '36px',
    textAlign: 'left',
    color: '#000000',
    padding: '0px 0px',
    margin: '0px 0px 11px 0px',
  },
  subsectionLink: {
    listStyleType: 'none',
    margin: '0px',
    paddingLeft: '0px',
    fontFamily: 'Circular Std',
    fontSize: '14px',
    textAlign: 'left',
    color: '#000000',
    textTransform: 'uppercase',
  },
  subsectionBar: {
    display: 'inline',
    padding: '11px, 16px, 0px, 0px',
    margin: '0px 16px 0px 0px',
    textDecoration: 'none',
  },
  subSectionLink: {
    color: '#000000',
  },
  sectionNameDivider: {
    borderBottom: '2px solid #000000',
    borderTop: '0px',
    paddingTop: '7px',
    marginBottom: '29.6px',
    marginTop: '0px',
  }
};

/* TODO: make subsection tree work for any depth
 */

const SectionPage = ({ classes, subsections, articles, section, match, featuredMedia}) => {
  const createSubsectionLinks = () => {
    return Object.keys(subsections).map((key) => {
      const subsection = subsections[ key ];
      return (
        <li key={subsection.id} className={classes.subsectionBar}>
          <Link to={match.url + '/' + subsection.slug} className={classes.subsectionLink}>{subsection.name}</Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.entireSectionPage}>
      <h1 className={classes.sectionName}>{section.name}</h1>
      <ul className={classes.subsectionLink}>
        {createSubsectionLinks()}
      </ul>
      <hr className={classes.sectionNameDivider}/>
      <SectionArticleList articles={articles} featuredMedia={featuredMedia} subsections={subsections} match={match}/>
    </div>
    );
};


const mapStateToProps = (state, ownProps) => ({
  articles: articles.selectors.getArticlesWithinSection(state, ownProps),
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SectionPage));
