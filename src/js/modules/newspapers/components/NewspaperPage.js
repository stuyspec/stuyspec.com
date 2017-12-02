// TODO: make a component, NewspaperPage, that takes volume & issue props and does what i drew on the whiteboard

import React from "react";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import {getNewspaperFromSlug} from "../selectors";
import { Grid, Row, Col } from "react-bootstrap/lib";


const styles = {
  NewspaperPage: {
    marginTop: "60px",
  },
  text: {
    fontSize: "30px",
    fontFamily: "Canela",
  }
}

const NewspaperPage = ({classes, newspaper}) => {
  return (
    <Grid className={classes.NewspaperPage}>
      <Row>
        <Col xs={12} md={8}>
        <h2 className={classes.text}>Volume: {newspaper.volume_num}, Issue: {newspaper.issue_num}</h2>
        </Col>
      </Row>
    </Grid>
  )
};

const mapStateToProps = (state,ownProps) => ({
  newspaper: getNewspaperFromSlug(state,ownProps),
  });

export default connect(mapStateToProps)(injectSheet(styles)(NewspaperPage));