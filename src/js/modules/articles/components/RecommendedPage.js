import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";
import {Helmet} from "react-helmet";

import ArticleList from "./ArticleList";
import { TallAd } from "../../advertisements/components/index"
import { getArticlesWithContributors } from "../selectors";

const styles = {
  RecommendedPage: {
    marginTop: "20px",
  },
  pageTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  "@media (min-width: 992px)": {
    RecommendedPage: {
      marginTop: "80px",
    },
  },
};

const RecommendedPage = ({ classes, articles }) => {
  return (
    <Grid fluid className={classes.RecommendedPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>
          Most Recommended
        </title>
        <meta>

        </meta>
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <ArticleList articles={articles} title="Recommended" label="Articles"/>
        </Col>
        <Col xsHidden smHidden md={3} lg={3} className={classes.tallAdContainer}>
          <TallAd/>
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RecommendedPage));
