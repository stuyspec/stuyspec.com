import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { SignOutForm } from "./forms";
import { signOut } from "../actions";

const ProfilePage = ({ session, signOut }) => {
  if (!session) {
    return (
      <p>
        You are not signed in. <Link to="/myaccount">Sign in.</Link>
      </p>
    );
  }
  const handleSignOut = () => {
    signOut({
      // dashes are invalid in JS variables
      "access-token": session.headers["access-token"],
      client: session.headers.client,
      uid: session.headers.uid,
    });
  };
  // session structure after signing in
  let user = session.data.data;
  // session structure after updating profile
  // TODO: does this affect anything else? what else uses session?
  if (!user) {
    user = session.data;
  }
  return (
    <div>
      <p>first name: {user.firstName}</p>
      <p>last name: {user.lastName}</p>
      <p>email: {user.email}</p>
      <Link to="/myaccount/profile/edit">Edit Profile</Link>
      <SignOutForm onSubmit={handleSignOut} />
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
