import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import ArticleList from "./ArticleList";

import { getLatestArticles } from "../selectors";

const styles = {
  pageTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  latest: {
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "22px",
    padding: "4px 0",
  },
  "@media (min-width: 992px)": {
    LatestPage: {
      marginTop: "60px",
    },
  },
};

const LatestPage = ({ classes, articles }) => {
  return (
    <Grid fluid className={classes.LatestPage}>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.pageTitle}>Latest Articles</p>
          <p className={classes.latest}></p>
          <ArticleList articles={articles} />
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  articles: getLatestArticles(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(LatestPage));
