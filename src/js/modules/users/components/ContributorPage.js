import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getContributorFromSlug } from "../selectors";
import { getContributorArticles } from "../../articles/selectors";
import { ArticleList } from "../../articles/components";

const styles = {
  ContributorPage: {
    marginTop: "100px",
  },
  name: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: 1,
    marginBottom: "8px",
  },
  workList: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    borderStyle: "solid none",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    marginBottom: "22px",
    padding: "4px 0px",
  },
  description: {
    color: "#666",
    fontFamily: "Minion Pro",
    fontSize: "20px",
    lineHeight: "1.3",
    marginBottom: "27px",
  },
  mailTo: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "20px",
    marginBottom: "8px",
  }
};

const ContributorPage = ({ classes, contributor, articles }) => {
  console.log(articles);
  return (
    <Grid className={classes.ContributorPage}>
      <Row>
        <Col md={9} lg={9}>
          <p className={classes.name}>
            {`${contributor.firstName} ${contributor.lastName}`}
          </p>
          <a href={`mailto:${contributor.email}`} className={classes.mailTo}>
            {contributor.email}
          </a>
          <p className={classes.description}>{contributor.description}</p>
          <div className={classes.workList}>Latest</div>
          <ArticleList articles={articles}/>
        </Col>
        <Col md={3} lg={3}/>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  contributor: getContributorFromSlug(state, ownProps),
  articles: getContributorArticles(state, ownProps),
});

export default connect(mapStateToProps, null)(
  injectSheet(styles)(ContributorPage),
);
