import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { EditUserForm, EditPasswordForm } from "./forms";
import { updateUser, updatePassword } from "../actions";

const EditProfilePage = ({ session, updateUser, updatePassword }) => {
  if (session === null) {
    return <p>You are not signed in. <Link to="/myaccount">Sign in.</Link></p>;
  }
  const user = session.data.data;
  const handleUpdateUser = values => {
    updateUser(values, user.id);
  }
  const handleUpdatePassword = values => {
    updatePassword(values, user.id);
  }
  return (
    <div>
      <EditUserForm onSubmit={ handleUpdateUser }/>
      {/*<EditPasswordForm onSubmit={handleUpdatePassword}/>*/}
    </div>
  )
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateUser, updatePassword },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfilePage);
