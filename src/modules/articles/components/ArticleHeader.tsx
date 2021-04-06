import React from "react";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "./Byline";
import Dateline from "./Dateline";
import ShareTools from "./ShareTools";

import { IArticle } from '../queries';

const styles = {
  ArticleHeader: {
    borderTop: "solid 1px #000",
    borderBottom: "1px solid #dedede",
    color: "#000",
    fontFamily: "Comic Sans MS",
    marginBottom: "20px",
    padding: "10px 0 11px",
  },
  rubric: {
    color: "#000",
    display: "block",
    fontFamily: "Comic Sans MS",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "20px",
    textDecoration: "none",
    textTransform: "uppercase",
    width: "150px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  headline: {
    color: "#000",
    fontFamily: "Comic Sans MS",
    fontSize: "36px",
    fontWeight: "normal",
    marginTop: 0,
    marginBottom: "18px",
  },
  meta: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      marginBottom: "5px",
    },
  },
  Byline: {
    color: "#000",
    display: "inline",
    fontSize: "15px",
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
  Dateline: {
    color: "#000",
    fontSize: "15px",
    marginRight: "28px",
    marginTop: 0,
  },
  "@media (max-width: 991px)": {
    headerRow: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    headerRow: {
      padding: "0 2%",
    },
  },
};

interface IProps {
  classes: any,
  article: IArticle
}

const ArticleHeader: React.FunctionComponent<IProps> = ({ classes, article }) => {
  const { contributors, section } = article;
  return (
    <Row className={classes.headerRow}>
      <p className="only-print" id="branding">
        The Stuyvesant Spectator
      </p>
      <Col xs={12} sm={12} md={12} lg={12} className={classes.ArticleHeader}>
        <Link to={section.permalink} className={classes.rubric}>
          {section.name}
        </Link>
        <h1 className={classes.headline}>{article.title}</h1>
        <div className={classes.meta}>
          {contributors && contributors.length > 0 &&
            <Byline classes={classes} contributors={article.contributors} />
          }
          <Dateline classes={classes} timestamp={article.created_at} />
          <ShareTools article={article} />
        </div>
      </Col>
    </Row>
  );
};

export default injectSheet(styles)(ArticleHeader);
