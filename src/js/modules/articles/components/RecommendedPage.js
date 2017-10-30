import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import ArticleList from "./ArticleList";

import { getArticlesWithContributors } from "../selectors";

const styles = {
  pageTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  recommended: {
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "22px",
    padding: "4px 0",
  },
  "@media (min-width: 992px)": {
    RecommendedPage: {
      marginTop: "60px",
    },
  },
};

const RecommendedPage = ({ classes, articles }) => {
  return (
    <Grid fluid className={classes.RecommendedPage}>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.pageTitle}>Recommended Articles</p>
          <p className={classes.recommended} />
          <ArticleList articles={articles} />
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedPage));
