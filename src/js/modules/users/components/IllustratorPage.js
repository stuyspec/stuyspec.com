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
    marginTop: "62px",
  },
  name: {
    color: "#000000",
    fontFamily: "Canela",
    fontSize: "36px",
    fontWeight: "500",
    margin: "0px",
    textAlign: "center",
  },
  workList: {
    border: "1px solid #ddd",
    borderStyle: "solid none",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: "300",
    margin: "34px 0px 14px",
    padding: "8px 0px 7px",
  },
  profilePicture: {
    display: "block",
    height: "302px",
    margin: "18px auto 12px",
    width: "256px",
  },
  description: {
    color: "#000000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    lineHeight: "1.28",
    margin: 0,
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
        <title>
          {illustrator.firstName} {illustrator.lastName}
        </title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {illustrator.firstName} {illustrator.lastName}
          </p>
          <img
            alt={illustrator.lastName}
            className={classes.profilePicture}
            src={illustrator.url}
          />
          <p className={classes.description}>{illustrator.description}</p>
          <div className={classes.workList}>Illustrations</div>
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

export default connect(mapStateToProps)(injectSheet(styles)(IllustratorPage));
