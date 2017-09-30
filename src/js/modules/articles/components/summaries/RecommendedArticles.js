import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

const styles = {
  RecommendedArticles: {
    padding: "0 0 10px 14px",
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    margin: 0,
    padding: "4px 0",
    "&:hover": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
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
    padding: "12px 0 12px 12px",
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
    margin: 0,
  },
};

const RecommendedArticles = ({ classes, articles, sections }) => {
  // NESTED IN <Col lg={3} md={3}>
  return (
    <div className={classes.RecommendedArticles}>
      <Link to="/recommended" className={classes.label}>
        Recommended
      </Link>
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
              <p className={classes.focus}>{article.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(
  injectSheet(styles)(RecommendedArticles),
);
