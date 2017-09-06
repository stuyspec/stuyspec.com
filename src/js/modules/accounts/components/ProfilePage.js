import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { SignOutForm } from "./forms";
import { signOut } from "../actions";

const styles = {
  ProfilePage: {
    margin: "78px auto 0",
    width: "1066px",
  },
  successMessage: {
    color: "green",
  },
};

const ProfilePage = ({ classes, session, signOut, status, users }) => {
  if (status.formName === "signOut" && status.errors.length === 0) {
    return (
      <Grid className={classes.ProfilePage}>
        <p className={classes.successMessage}>{status.message}</p>
        <Link to="/myaccount">Sign in</Link>
        &nbsp;or go back to the&nbsp;
        <Link to="/">home page</Link>.
      </div>
    );
  }
  // The last if statement includes the following condition. This next if block
  // is a message for those who directly visit myaccount/profile.
  if (!session.userId) {
    return (
      <Grid className={classes.ProfilePage}>
        You are not signed in. <Link to="/myaccount">Sign in</Link> or go back
        to the <Link to="/">home page</Link>
      </Grid>
    );
  }

  const user = users[session.userId];
  return (
    <Grid className={classes.ProfilePage}>
      {user ? (
        <div>
          <p>first name: {user.firstName}</p>
          <p>last name: {user.lastName}</p>
          <p>email: {user.email}</p>
          <Link to="/myaccount/profile/edit">Edit Profile</Link>
        </div>
      ) : (
        <p>.</p>
      )}
      {/* We keep the SignOutForm to display the success message */}
      <SignOutForm onSubmit={() => signOut(session)} />
    </Grid>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
  status: state.accounts.status,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(ProfilePage),
);
