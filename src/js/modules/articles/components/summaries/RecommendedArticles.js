import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import { getSections } from "../../../sections/selectors";

const styles = {
  RecommendedArticles: {
    padding: "0 0 10px 14px",
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: 0,
    padding: "4px 0",
  },
  numberLabel: {
    color: "#000",
    float: "left",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: 0,
  },
  articleItem: {
    padding: "9px 0 0 12px",
    "&:not(:last-child)": {
      borderBottom: "solid 1px #ddd",
    },
  },
  articleSummary: {
    paddingLeft: "21px",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1,
    marginBottom: "8px",
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
  focus: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: 1.21,
    marginBottom: "12px",
  },
};

const RecommendedArticles = ({ classes, articles, sections }) => {
  // NESTED IN <Col lg={3} md={3}>
  return (
    <div className={classes.RecommendedArticles}>
      <p className={classes.label}>Recommended</p>
      {articles.map((article, index) => {
        const section = Object.values(sections).find(section => {
          return section.id === article.sectionId;
        });
        return (
          <div className={classes.articleItem} key={article.id}>
            <p className={classes.numberLabel}>{index + 1}.</p>
            <div className={classes.articleSummary}>
              <Link
                className={classes.title}
                to={`${section.permalink}/${article.slug}`}
              >
                {article.title}
              </Link>
              <p className={classes.focus}>
                Unfortunately, all good things must come to an end. We came into
                Stuyvesant last September, saved from the unstructured summer.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  sections: getSections(state),
});

export default connect(mapStateToProps)(
  injectSheet(styles)(RecommendedArticles),
);
