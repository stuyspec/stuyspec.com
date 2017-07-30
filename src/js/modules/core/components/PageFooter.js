import React from 'react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';

import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const styles = {
  PageFooter: {
    background: '#FFFFFF',
    height: '370px',
  },
  pageFooterMain: {
    borderTop: '3px solid #dddddd',
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
    color: '#000000',
    fontSize: '14px',
    fontFamily: "Circular Std",
    fontStyle: 'normal',
    fontWeight: '700',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subsectionLink: {
    color: '#000000',
    fontSize: '13px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: '400',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  theSpectator: {
    color: '#000000',
    fontFamily: 'Old English Text MT',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: '400',
    paddingTop: '10px',
  },
};

const PageFooter = ({classes, sectionsWithSubsections}) => {
  const makeSectionLinks = () => {
    return (sectionsWithSubsections.map((topLevelSection) => {
        return (
          <div className={classes.sectionBlock} key={topLevelSection.id}>
            <Link className={classes.topLevelSectionLink}
                  key={`topLevelLink${topLevelSection.id}`}
                  to={`/${topLevelSection.slug}`}>
              {topLevelSection.name}
            </Link>
            {
              Object.keys(topLevelSection.subsections).map((subsectionSlug) => {
                return makeSubsectionLink(
                  topLevelSection.slug,
                  topLevelSection.subsections[subsectionSlug]);
              })
            }
          </div>
        );
      })
    );
  };
  const makeSubsectionLink = (topLevelSectionSlug, subsection) => {
    return (
      <div key={`subsectionLink${subsection.id}`}>
        <Link className={classes.subsectionLink}
              to={`/${topLevelSectionSlug}/${subsection.slug}`}>
          {subsection.name}
        </Link>
      </div>
    );
  };

  return (
    <Container fluid={true} className={classes.PageFooter}>
      <Row className={classes.pageFooterMain}>
        <div className={classes.theSpectator}>The Spectator</div>
        <Col md="8" md-offset="2" className={classes.sectionFlex}>
          {makeSectionLinks()}
        </Col>
      </Row>
    </Container>
  );
};

export default (injectSheet(styles)(PageFooter));