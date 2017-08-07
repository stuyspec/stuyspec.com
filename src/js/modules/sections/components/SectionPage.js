import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Col, Grid, Row } from 'react-bootstrap/lib/';
import SectionArticleList from './SectionArticleList';

import { getArticlesWithinSectionTree } from '../../articles/selectors';
import { getSections, getDirectChildrenOfSection } from '../../sections/selectors';

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
    margin: '0px 0px',
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
    padding: '8px, 16px, 0px, 0px',
    margin: '0px 16px 0px 0px',
    textDecoration: 'none',
  },
  subSectionLink: {
    color: '#000000',
  },
  sectionNameDivider1: {
    width: '1066px',
    height: '1px',
    backgroundColor: '#dddddd',
    marginTop: '20px',
    marginBottom: '8px',
  },
  sectionNameDivider2: {
    width: '1066px',
    height: '1px',
    backgroundColor: '#dddddd',
    marginTop: '8px',
    marginBottom: '28px',
  SectionPage: {
    marginTop: '50px',
  }
};

const SectionPage = ({ classes, articlesWithinSectionTree, directSubsectionChildren, section, sections, featuredMedia }) => {
  const createLinksToDirectSubsectionChildren = () => {
    return Object.keys(directSubsectionChildren).map((subsectionSlug) => {
      const subsection = directSubsectionChildren[ subsectionSlug ];
      return (
        <div>
          <hr className={classes.sectionNameDivider1}/>
            <li key={`subsectionListItem${subsection.id}`}>
              <Link to={subsection.permalink}>{subsection.name}</Link>
            </li>
          <hr className={classes.sectionNameDivider2}/>
        </div>
      );
    });
  };
  const createLinksToArticlesWithinSectionTree = () => {
    return Object.keys(articlesWithinSectionTree).map((articleSlug) => {
      const article = articlesWithinSectionTree[ articleSlug ];
      return (
<<<<<<<
        <li key={`articleListItem${article.id}`}>
          <Link to={`${sections[ article.sectionSlug ].permalink}/${article.slug}`}>
            {article.title}
          </Link>
        </li>
=======
        <div>
          {createLines (articles, subsections)}
          <ul className={classes.subsectionLink}>
          </ul>
        </div>
>>>>>>>
      );
  };
  return (
    <div className={classes.entireSectionPage}>
      <h1 className={classes.sectionName}>{section.name}</h1>
      {createSubsectionLinks()}
      <SectionArticleList articles={articles} featuredMedia={featuredMedia} subsections={subsections} match={match}/>
    </div>
)
};


const mapStateToProps = (state, ownProps) => ({
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
  articlesWithinSectionTree: getArticlesWithinSectionTree(state, ownProps),
  directSubsectionChildren: getDirectChildrenOfSection(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(SectionPage));
