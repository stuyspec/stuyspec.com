import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";

import { getIllustratorFromSlug } from "../selectors";
import { getIllustratorArticles } from "../../articles/selectors";
import { ArticleList } from "../../articles/components";

const styles = {
  IllustratorPage: {
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
    IllustratorPage: {
      paddingLeft: "10%",
    },
  },
};

const IllustratorPage = ({ classes, illustrator, articles }) => {
  return (
    <Grid className={classes.IllustratorPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${illustrator.firstName} ${illustrator.lastName}`}</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {`${illustrator.firstName} ${illustrator.lastName}`}
          </p>
          <a href={`mailto:${illustrator.email}`} className={classes.email}>
            {illustrator.email}
          </a>
          <p className={classes.description}>{illustrator.description}</p>
          <div className={classes.latest}>Latest</div>
          <ArticleList articles={articles} />
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  illustrator: getIllustratorFromSlug(state, ownProps),
  articles: getIllustratorArticles(state, ownProps),
});

export default connect(mapStateToProps, null)(
  injectSheet(styles)(IllustratorPage),
);
