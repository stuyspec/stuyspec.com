import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap/lib";

const styles = {
  PageFooter: {
    background: '#fff',
    height: '370px',
    marginTop: '14px',
  },
  pageFooterMain: {
    borderTop: '3px solid #ddd',
    margin: '0 auto',
    width: '1060px',
  },
  sectionFlex: {
    height: '350px',
    display: 'flex',
    flexFlow: 'column wrap',
    paddingTop: '6px',
  },
  sectionBlock: {
    marginTop: '19px',
  },
  topLevelSectionLink: {
    color: '#000',
    fontSize: '14px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  subsectionLink: {
    color: '#000',
    display: 'block',
    fontSize: '13px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: '300',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  theSpectator: {
    color: '#000',
    fontFamily: 'Old English Text MT',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: 400,
    paddingTop: '10px',
  },
};

const PageFooter = ({ classes, topLevelSectionsWithDirectChildren }) => {
  const createLinksToSections = () => {
    return Object.keys(topLevelSectionsWithDirectChildren).map(sectionSlug => {
      const topLevelSection = topLevelSectionsWithDirectChildren[ sectionSlug ];
      return (
        <div className={classes.sectionBlock} key={topLevelSection.id}>
          <Link className={classes.topLevelSectionLink}
                key={`topLevelLink${topLevelSection.id}`}
                to={topLevelSection.permalink}>
            {topLevelSection.name}
          </Link>
          {
            Object.keys(topLevelSection.subsections).map(subsectionSlug => {
              const subsection = topLevelSection.subsections[ subsectionSlug ];
              return (
                <Link className={classes.subsectionLink}
                      key={`subsectionLink${subsection.id}`}
                      to={subsection.permalink}>
                  {subsection.name}
                </Link>
              );
            })
          }
        </div>
      );
    });
  };
  return (
    <Grid className={classes.PageFooter}>
      <Row className={classes.pageFooterMain}>
        <Col md={8} mdOffset={2} className={classes.theSpectator}>
          The Spectator
        </Col>
        <Col md={8} mdOffset={2} className={classes.sectionFlex}>
          {createLinksToSections()}
        </Col>
      </Row>
    </Grid>
  );
};

export default (injectSheet(styles)(PageFooter));