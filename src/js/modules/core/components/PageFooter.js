import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

const styles = {
  PageFooter: {
    background: "#fff",
    height: "370px",
    marginTop: "14px",
    marginBottom: "60px",
  },
  pageFooterMain: {
    borderTop: "3px solid #ddd",
    margin: "0 auto",
  },
  sectionFlex: {
    height: "264px",
    display: "flex",
    flexFlow: "column wrap",
    paddingTop: "6px",
  },
  sectionBlock: {
    marginTop: "19px",
  },
  topLevelSectionLink: {
    color: "#000",
    fontSize: "14px",
    fontFamily: "Circular Std",
    fontStyle: "normal",
    fontWeight: "bold",
    marginBottom: 0,
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  subsectionLink: {
    color: "#000",
    display: "block",
    fontSize: "13px",
    fontFamily: "Circular Std",
    fontStyle: "normal",
    fontWeight: 300,
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  theSpectator: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: 400,
    paddingTop: "10px",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  aboutNavLinksMobile: {
    paddingLeft: "7px",
    "& > div": {
      border: 0,
      paddingBottom: "1px",
    },
    "& > div > a": {
      // each about-us link
      display: "inline-block",
      color: "#aaa",
      fontSize: "12px",
      padding: "0 16px 6px 0",
      "&:hover, &:active, &:focus": {
        color: "#aaa",
        textDecoration: "underline",
      },
    },
  },
  hr: {
    margin: "12px 0",
  },
  creditLine: {
    color: "#aaa",
    fontSize: "12px",
    padding: "0 15px",
    paddingLeft: "7px",
    "& a": {
      color: "#aaa",
      textDecoration: "underline",
      "&:hover, &:active, &:focus": {
        color: "#aaa",
      },
    },
  },
  "@media (max-width: 767px)": {
    PageFooter: {
      marginBottom: "30px",
    },
    sectionFlex: {
      flexWrap: "nowrap",
      height: "auto",
      "& > div:nth-child(6) ~ div": {
        // shows first six section blocks
        display: "none",
      },
      "& > div:nth-child(6)": {
        borderBottom: "1px solid #ddd",
      },
    },
    sectionBlock: {
      margin: 0,
      padding: "10px 0",
      borderTop: "1px solid #ddd",
    },
    topLevelSectionLink: {
      fontSize: "15px",
      fontWeight: 500,
      "&:hover, &:active, &:focus": {
        color: "#000",
        textDecoration: "none",
      },
    },
    subsectionLink: {
      display: "none",
    },
    hr: {
      display: "none",
    },
  },
};

const DescriptionLinks = ({ classes, descriptions }) => {
  return (
    <div className={classes.sectionBlock} key="about">
      <p className={classes.topLevelSectionLink} key={-1}>
        About Us
      </p>
      {descriptions.map(description => {
        return (
          <Link
            className={classes.subsectionLink}
            key={description.id}
            to={`/about/${description.slug}`}
          >
            {description.title}
          </Link>
        );
      })}
      <a
        className={classes.subsectionLink}
        key={-2}
        href="https://issuu.com/stuyspectator"
      >
        Visual Archives
      </a>
      <a
        className={classes.subsectionLink}
        key={-3}
        href="https://specapparel.strikingly.com/"
      >
        Apparel
      </a>
    </div>
  );
};

const PageFooter = ({ classes, sections, descriptions }) => {
  return (
    <Grid fluid className={classes.PageFooter}>
      <Row className={classes.pageFooterMain}>
        <Col
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={8}
          lgOffset={2}
        >
          <Link to="/" className={classes.theSpectator}>
            The Spectator
          </Link>
        </Col>
        <Col
          xs={12}
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={8}
          lgOffset={2}
          className={classes.sectionFlex}
        >
          {sections.map(section => {
            return (
              <div className={classes.sectionBlock} key={section.id}>
                <Link
                  className={classes.topLevelSectionLink}
                  key={section.id}
                  to={section.permalink}
                >
                  {section.name}
                </Link>
                {section.subsections.map(subsection => {
                  return (
                    <Link
                      className={classes.subsectionLink}
                      key={subsection.id}
                      to={subsection.permalink}
                    >
                      {subsection.name}
                    </Link>
                  );
                })}
              </div>
            );
          })}
          <DescriptionLinks classes={classes} descriptions={descriptions} />
        </Col>
        <Col
          xsHidden
          sm={10}
          smOffset={1}
          md={8}
          mdOffset={2}
          lg={8}
          lgOffset={2}
          className={classes.creditLine}
        >
          <hr className={classes.hr} />
          Created by Jason Kao, Nicholas Yang, Jason Lin, Darius Jankauskas, and
          Cathy Cai{" "}
          <a href="https://github.com/stuyspec">
            @The Spectator Web Department
          </a>.
        </Col>
        <Col
          xs={12}
          smHidden
          mdHidden
          lgHidden
          className={classes.aboutNavLinksMobile}
        >
          <DescriptionLinks classes={classes} descriptions={descriptions} />
        </Col>
        <Col xs={12} smHidden mdHidden lgHidden className={classes.creditLine}>
          <hr className={classes.hr} />
          Created by Jason Kao, Nicholas Yang, Jason Lin, Darius Jankauskas, and
          Cathy Cai{" "}
          <a href="https://github.com/stuyspec">
            @The Spectator Web Department
          </a>.
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  descriptions: state.descriptions,
});

export default connect(mapStateToProps)(injectSheet(styles)(PageFooter));
