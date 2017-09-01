import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import Byline from "../Byline";
import Dateline from "../Dateline";
import { getMedia } from "../../../media/selectors";
import { getSections } from "../../../sections/selectors";
import { getUsers } from "../../../users/selectors";

const styles = {
  FeaturedArticle: {
    paddingBottom: "24px",
  },
  title: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "30px",
    fontWeight: "500",
    marginBottom: "7px",
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
    "&:hover": {
      color: "#000",
    },
  },
  rubric: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: "6px 0 9px 0",
    textTransform: "uppercase",
  },
  focus: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.29,
    margin: "0 0 17px 0",
  },
  figure: {
    "& img": {
      width: "100%",
    },
  },
  Byline: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "500",
    "& p": {
      display: "inline",
      margin: "0 0 2px 0",
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
    display: "inline",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "500",
    "& p": {
      color: "#000",
      display: "inline",
      margin: 0,
    },
  },
  featuredMediaContainer: {
    paddingRight: "14px",
    paddingTop: "6px",
  },
};

const FeaturedArticle = ({ classes, article, media, sections }) => {
  const section = Object.values(sections).find(section => {
    return section.id === article.sectionId;
  });
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  // NESTED IN <Col lg={9}>
  return (
    <Row className={classes.FeaturedArticle}>
      <Col lg={4} md={4}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${article.slug}`}
        >
          {article.title}
        </Link>
        <p className={classes.rubric}>{section.name}</p>
        <p className={classes.focus}>
          StuyHacks held its fourth hackathon, StuyHacks IV, on Saturday, May
          27, and Sunday, May 28. The event provided an opportunity for 175 high
          schools.
        </p>
        <Byline classes={classes} contributors={article.contributors} />
        <Dateline classes={classes} article={article} />
      </Col>
      <Col lg={8} md={8} className={classes.featuredMediaContainer}>
        <figure className={classes.figure}>
          <img src={featuredMedia.url} />
        </figure>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
  sections: getSections(state),
  users: getUsers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(FeaturedArticle));
