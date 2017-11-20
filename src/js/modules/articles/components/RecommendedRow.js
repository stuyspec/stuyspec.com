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
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: "300",
    marginBottom: "3px",
    textTransform: "uppercase",
  },
  recommendedText: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "12px",
    textTransform: "uppercase",
  },
  summary: {
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
    display: "block",
    fontFamily: "Canela",
    fontSize: "19px",
    lineHeight: "1.38",
    marginBottom: "2px",
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
  "@media (max-width: 991px)": {
    RecommendedRow: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    RecommendedRow: {
      padding: "0 2%",
    },
  },
  "@media (max-width: 575px)": {
    recommendedBlock: {
      width: "50%",
      marginBottom: "7px",
    },
    recommendedList: {
      /* recommendedBlocks are structured in a block form,
           1  2
           3  4,
         rendering these next padding removals necessary.
       */
      "& > div:nth-child(2)": {
        // 2nd recommendedBlock
        paddingRight: "0 !important",
      },
      "& > div:nth-child(3)": {
        // 3rd recommendedBlock
        paddingLeft: "0 !important",
      },
    },
  },
};

const RecommendedRow = ({ classes, media, section, articles, sections }) => {
  const recommendedArticles = Object.values(articles).slice(0, 4);
  return (
    <Row className={classes.RecommendedRow}>
      <p className={classes.recommendedText}>Recommended</p>
      <Col xs={12} sm={12} md={9} lg={9} className={classes.recommendedList}>
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
                  <img src={featuredMedia.mediumAttachmentUrl} />
                </figure>
                <Link to={`${section.permalink}`} className={classes.label}>
                  {section.name}
                </Link>
                <Link
                  to={`${section.permalink}/${article.slug}`}
                  className={classes.titleWithImage}
                >
                  {article.title}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={article.id} className={classes.recommendedBlock}>
                <Link to={`${section.permalink}`} className={classes.label}>
                  {section.name}
                </Link>
                <Link
                  to={`${section.permalink}/${article.slug}`}
                  className={classes.titleWithoutImage}
                >
                  {article.title}
                </Link>
                <p className={classes.summary}>{article.summary}</p>
              </div>
            );
          }
        })}
      </Col>
      <Col xsHidden smHidden md={3} lg={3} />
    </Row>
  );
};

const mapStateToProps = (state, ownProps) => ({
  media: getMedia(state),
  articles: getSectionTreeArticles(state, ownProps),
  sections: getSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedRow));
