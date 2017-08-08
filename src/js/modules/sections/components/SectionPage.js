import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { ArticleList } from "../../articles/components";
import { getSectionTreeArticles } from "../../articles/selectors";
import { getSections, getDirectChildrenOfSection } from "../../sections/selectors";

const styles = {
  SectionPage: {
    marginTop: '100px',
    top: 0,
    marginBottom: '60px',
  },
  sectionName: {
    fontFamily: 'Canela',
    fontSize: '36px',
    fontWeight: 500,
    color: '#000',
    margin: '0 0 20px 0',
  },
  subsectionBar: {
    border: '1px solid #ddd',
    borderStyle: 'solid none',
    listStyleType: 'none',
    marginBottom: '14px',
    padding: '7px 0 8px 0',
  },
  subsectionListItem: {
    display: 'inline',
    textDecoration: 'none',
    marginRight: '26px',
  },
  subsectionLink: {
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '14px',
    fontWeight: 300,
    textTransform: 'uppercase',
  }
};

/**
 * @param match is necessary for getting section by slug (through props).
 */
const SectionPage = ({
                       classes,
                       articlesWithinSectionTree,
                       directSubsectionChildren,
                       section,
                       featuredMedia,
                       match
                     }) => {
  const createLinksToDirectSubsectionChildren = () => {
    return Object.keys(directSubsectionChildren).map((subsectionSlug) => {
      const subsection = directSubsectionChildren[ subsectionSlug ];
      return (
        <li className={classes.subsectionListItem}
            key={`subsectionListItem${subsection.id}`}>
          <Link className={classes.subsectionLink} to={subsection.permalink}>
            {subsection.name}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.SectionPage}>
      <h1 className={classes.sectionName}>{section.name}</h1>
      {
        directSubsectionChildren !== null &&
        <ul className={classes.subsectionBar}>
          {createLinksToDirectSubsectionChildren()}
        </ul>
      }
      <ArticleList articles={articlesWithinSectionTree}
                   featuredMedia={featuredMedia}
                   section={section}/>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
  articlesWithinSectionTree: getSectionTreeArticles(state, ownProps),
  directSubsectionChildren: getDirectChildrenOfSection(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(SectionPage));
