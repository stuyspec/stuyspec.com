import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "./Byline";

const styles = {
  ArticleHeader: {
    borderBottom: "1px solid #dedede",
    color: "#000",
    fontFamily: "Minion Pro",
    marginBottom: "20px",
    padding: "10px 0 11px",
  },
  rubric: {
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "20px",
    textDecoration: "none",
    textTransform: "uppercase",
    width: "150px",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
  },
  headline: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "36px",
    fontWeight: "normal",
    marginTop: 0,
    marginBottom: "20px",
  },
  Byline: {
    display: "inline",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight: "9px",
    "& p": {
      display: "inline",
      margin: 0,
      "& a": {
        color: "#000",
        "&:hover": {
          color: "#000",
        },
      },
    },
  },
  dateline: {
    fontSize: "14px",
  },
};

// TODO: make selector for dateline

const ArticleHeader = ({
  classes,
  article: { contributors, dateline, title },
  section,
}) => {
  return (
    <Row>
      <Col md={8} lg={8} className={classes.ArticleHeader}>
        <Link to={section.permalink} className={classes.rubric}>
          {section.name}
        </Link>
        <h1 className={classes.headline}>{title}</h1>
        <Byline classes={classes} contributors={contributors} />
        <span>{dateline}</span>
      </Col>
      <Col md={4} lg={4} />
    </Row>
  );
};

export default injectSheet(styles)(ArticleHeader);
