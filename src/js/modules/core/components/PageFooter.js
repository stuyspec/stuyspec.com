import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getTopLevelSectionsWithChildren } from "../../sections/selectors";

const styles = {
  PageFooter: {
    background: '#fff',
    height: '370px',
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

const PageFooter = ({ classes, topLevelSectionsWithChildren }) => {
  const createSectionLinks = () => {
    return Object.values(topLevelSectionsWithChildren).map(section => {
      return (
        <div className={ classes.sectionBlock } key={ section.id }>
          <Link className={ classes.topLevelSectionLink }
                key={ section.id }
                to={ section.permalink }>
            { section.name }
          </Link>
          {
            Object.values(section.subsections).map(subsection => {
              return (
                <Link className={ classes.subsectionLink }
                      key={ subsection.id }
                      to={ subsection.permalink }>
                  { subsection.name }
                </Link>
              );
            })
          }
        </div>
      );
    });
  };
  return (
    <Grid className={ classes.PageFooter }>
      <Row className={ classes.pageFooterMain }>
        <Col md={ 8 } mdOffset={ 2 } className={ classes.theSpectator }>
          The Spectator
        </Col>
        <Col md={ 8 } mdOffset={ 2 } className={ classes.sectionFlex }>
          { createSectionLinks() }
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  topLevelSectionsWithChildren: getTopLevelSectionsWithChildren(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(PageFooter));