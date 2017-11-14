import React from "react";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: "0 auto",
    textAlign: "center",
    width: "100%",
  },
};

const PageHeader = ({ classes, location }) => {
  return (
    <Grid>
      <Row>
        <Col xsHidden smHidden md={12} lg={12}>
          {location.pathname === "/" ? (
            <Masthead />
          ) : (
            <MastheadBar location={location} />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} mdHidden lgHidden>
          <MastheadBar location={location} />
        </Col>
      </Row>
    </Grid>
  );
};

export default injectSheet(styles)(PageHeader);
