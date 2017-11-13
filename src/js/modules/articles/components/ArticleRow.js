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
import Dateline from "./Dateline";

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
    fontSize: "13px",
    fontWeight: "300",
    float: "left",
    marginRight: "19px",
    width: "110px",
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
  preview: {
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
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "1.12",
    marginBottom: "5px",
    paddingTop: "2px",
  },
  summary: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.25",
  },
  "@media (max-width: 767px)": {
    DatelineDesktop: {
      display: "none",
    },
    DatelineMobile: {
      display: "block",
    },
    preview: {
      overflow: "visible",
    },
    figure: {
      float: "none",
      margin: "0 0 14px 0",
      width: "100%",
      "& img": {
        marginLeft: "-14px",
        width: "100vw",
      },
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
        <div className={classes.DatelineDesktop}>
          <Dateline article={article} />
        </div>
        <div className={classes.preview}>
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
          <p className={classes.summary}>{article.summary}</p>
          <Byline contributors={article.contributors} />
          <p className={classes.DatelineMobile}>
            <Dateline article={article} />
          </p>
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
