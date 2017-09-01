import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { EditUserForm } from "./forms";
import { updateUser } from "../actions";

const EditProfilePage = ({ session, updateUser }) => {
  return (
    <div>
      {session.user ? (
        <div>
          <Link to="/myaccount/profile">Back to profile</Link>          
          <EditUserForm onSubmit={values => updateUser(values, session.user.id)} />
        </div>
      ) : (
        <p>
          You are not signed in. <Link to="/myaccount">Sign in.</Link>
        </p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
