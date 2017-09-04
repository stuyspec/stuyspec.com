import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { SignOutForm } from "./forms";
import { signOut } from "../actions";

const styles = {
  successMessage: {
    color: "green",
  },
};

const ProfilePage = ({ classes, session, signOut, status, users }) => {
  if (status.form === "signOut" && status.errors.length === 0) {
    return (
      <div>
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
      <p>
        You are not signed in. <Link to="/myaccount">Sign in</Link> or go back
        to the <Link to="/">home page</Link>
      </p>
    );
  }

  const user = users[session.userId]
  return (
    <div>
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
    </div>
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
