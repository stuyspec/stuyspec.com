import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";

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
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  email: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    marginBottom: "7px",
  },
  latest: {
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
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "26px",
  },
  "@media (max-width: 1199px) and (min-width: 992px)": {
    ContributorPage: {
      paddingLeft: "10%",
    },
  },
};

const ContributorPage = ({ classes, contributor, articles }) => {
  return (
    <Grid className={classes.ContributorPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>
          {`${contributor.firstName} ${contributor.lastName}`}
        </title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {`${contributor.firstName} ${contributor.lastName}`}
          </p>
          <a href={`mailto:${contributor.email}`} className={classes.email}>
            {contributor.email}
          </a>
          <p className={classes.description}>{contributor.description}</p>
          <div className={classes.latest}>Latest</div>
          <ArticleList articles={articles} />
        </Col>
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
