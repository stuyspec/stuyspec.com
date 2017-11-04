import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { getMedia } from "../../media/selectors";
import { getSectionTreeArticles } from "../selectors";
import { getSections } from "../../sections/selectors";

const styles = {
  RecommendedRow: {
    padding: 0,
    marginBottom: "24px",
  },
  recommendedList: {
    borderBottom: "solid 1px #ddd",
    padding: "0 0 24px",
  },
  label: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: "3px",
    textTransform: "uppercase",
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    fontWeight: "300",
    lineHeight: "1.29",
  },
  titleWithImage: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.21",
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
  titleWithoutImage: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "16px",
    lineHeight: "1.38",
    marginBottom: "2px",
  },
  figure: {
    marginBottom: "4.1px",
    width: "100%",
    "& img": {
      width: "100%",
    },
  },
  recommendedBlock: {
    float: "left",
    padding: "0 7px 0",
    width: "25%",
    "&:first-child": {
      paddingLeft: 0,
    },
    "&:last-child": {
      paddingRight: 0,
    },
  },
};

const RecommendedRow = ({ classes, media, section, articles, sections }) => {
  const recommendedArticles = Object.values(articles).slice(0, 4);
  return (
    <Row className={classes.RecommendedRow}>
      <Col xs={12} sm={9} md={9} lg={9} className={classes.recommendedList}>
        {recommendedArticles.map(article => {
          const featuredMedia = Object.values(media).find(mediaObject => {
            return (
              mediaObject.isFeatured && mediaObject.articleId === article.id
            );
          });
          if (featuredMedia) {
            return (
              <div key={article.id} className={classes.recommendedBlock}>
                <figure className={classes.figure}>
                  <img src={featuredMedia.url} />
                </figure>
                <p className={classes.label}>{section.name}</p>
                <Link
                  to={`${sections[article.sectionId]
                    .permalink}/${article.slug}`}
                  className={classes.titleWithImage}
                >
                  {article.title}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={article.id} className={classes.recommendedBlock}>
                <Link
                  to={`${sections[article.sectionId]
                    .permalink}/${article.slug}`}
                  className={classes.titleWithoutImage}
                >
                  {article.title}
                </Link>
                <p className={classes.preview}>
                  Unfortunately, all good things must come to an end. We came
                  into Stuyvesant last September, saved from the unstructured
                  summer.
                </p>
              </div>
            );
          }
        })}
      </Col>
      <Col xsHidden sm={3} md={3} lg={3} />
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state),
  articles: getSectionTreeArticles(state, ownProps),
  sections: getSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedRow));
