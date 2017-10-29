import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../media/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers } from "../../users/selectors";
import Byline from "./Byline";
import ArticleFeaturedMedia from "./ArticleFeaturedMedia";

const styles = {
  articleBlock: {
    borderBottom: "solid 1px #ddd",
    marginBottom: "22px",
    paddingBottom: "20px",
  },
  DatelineDesktop: {
    color: "#888",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    float: "left",
    marginRight: "19px",
  },
  DatelineMobile: {
    color: "#888",
    display: "none",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    float: "left",
    marginRight: "19px",
  },
  summary: {
    overflow: "hidden",
  },
  figure: {
    float: "right",
    marginLeft: "29px",
    width: "166px",
    "& img": {
      width: "100%",
    },
  },
  title: {
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "24px",
    color: "#000",
    lineHeight: "1",
    marginBottom: "2px",
    paddingTop: "2px",
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.13",
  },
  "@media (max-width: 767px)": {
    DatelineDesktop: {
      display: "none",
    },
    DatelineMobile: {
      display: "block",
    },
  },
  "@media (max-width: 575px)": {
    figure: {
      float: "none",
      margin: "0 0 14px 0",
      width: "100%",
    },
  },
};

const ArticleRow = ({ classes, article, sections, users, media }) => {
  const section = sections[article.sectionId];
  const featuredMedia = Object.values(media).find(media => {
    return media.isFeatured && media.articleId === article.id;
  });
  if (featuredMedia) {
    featuredMedia.creator = users[featuredMedia.userId];
  }
  return (
    <Row key={article.id} className={classes.ArticleRow}>
      <div className={classes.articleBlock} key={article.id}>
        <p className={classes.DatelineDesktop}>August 24, 2017</p>
        <div className={classes.summary}>
          {featuredMedia && (
            <figure className={classes.figure}>
              <img src={featuredMedia.url} alt={featuredMedia.title} />
            </figure>
          )}
          <Link
            to={`${section.permalink}/${article.slug}`}
            className={classes.title}
          >
            {article.title}
          </Link>
          <p className={classes.preview}>
            Unfortunately, all good things must come to an end. We came into
            Stuyvesant last September, saved from the unstructured summer.
          </p>
          <Byline contributors={article.contributors} />
          <p className={classes.DatelineMobile}>August 24, 2017</p>
        </div>
      </div>
    </Row>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
  sections: getSections(state),
  users: getUsers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleRow));
