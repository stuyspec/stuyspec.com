import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { EditUserForm } from "./forms";
import { updateUser } from "../actions";

const styles = {
  EditProfilePage: {
    margin: "78px auto 0",
    width: "1066px",
  },
};

const EditProfilePage = ({ classes, session, updateUser }) => {
  if (!session.user) {
    return (
      <Grid className={classes.EditProfilePage}>
        <p>
          You are not signed in. <Link to="/myaccount">Sign in.</Link>
        </p>
      </Grid>
    );
  }
  const handleUpdateUser = values => {
    updateUser(values, session.user.id);
  };
  return (
    <Grid className={classes.EditProfilePage}>
      <Row>
        <Col md={6} lg={6}>
          <Link to="/myaccount/profile">Back to profile</Link>
          <EditUserForm onSubmit={handleUpdateUser} />
        </Col>
        <Col md={6} lg={6} />
      </Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(EditProfilePage),
);
