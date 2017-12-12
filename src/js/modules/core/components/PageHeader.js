import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const PageHeader = ({ location, sections }) => {
  return (
    <Grid>
      <Row>
        <Col xsHidden smHidden md={12} lg={12}>
          {location.pathname === "/" ||
          location.pathname === "/404-page-not-found" ? (
            <Masthead sections={sections} />
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

export default PageHeader;
