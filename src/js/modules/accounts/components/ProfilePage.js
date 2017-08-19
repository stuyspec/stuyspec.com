import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { SignOutForm } from "./forms";
import { signOut } from "../actions";

const ProfilePage = ({ session, signOut }) => {
  if (session === null) {
    return <p>You are not signed in. <Link to="/myaccount">Sign in.</Link></p>;
  }
  const user = session.data.data;
  return (
    <div>
      <p>first name: { user.firstName }</p>
      <p>last name: { user.lastName }</p>
      <p>email: { user.email }</p>
      <SignOutForm onSubmit={ signOut }/>
    </div>
  )
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { signOut },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
