import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { ArticleList } from "../../articles/components";
import { getSectionTreeArticles } from "../../articles/selectors";
import { getSections, getDirectSubsections } from "../../sections/selectors";

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

const SectionPage = ({ classes,
                       sectionTreeArticles,
                       directSubsections,
                       section
                     }) => {
  const createLinksToDirectSubsections = () => {
    return Object.keys(directSubsections).map(subsectionSlug => {
      const subsection = directSubsections[ subsectionSlug ];
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
        directSubsections !== null &&
        <ul className={classes.subsectionBar}>
          {createLinksToDirectSubsections()}
        </ul>
      }
      <ArticleList articles={sectionTreeArticles}
                   section={section}/>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  sectionTreeArticles: getSectionTreeArticles(state, ownProps),
  directSubsections: getDirectSubsections(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(SectionPage));
