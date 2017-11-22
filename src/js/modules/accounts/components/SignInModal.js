import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Modal } from "react-bootstrap/lib";

import { SignInForm, SignUpForm } from "./forms";
import { signIn, signUp, closeSignInModal } from "../actions";

const styles = {
  SignInModal: {
    width: "50%",
  },
  modalContent: {
    padding: "12px",
  },
  formTitle: {
    fontFamily: "Minion Pro",
    fontSize: "26px",
  },
  signInForm: {
    display: "inline-block",
  },
  signOutForm: {
    display: "inline-block",
  },
};

const SignInModal = ({
  classes,
  isSignInModalOpen,
  closeSignInModal,
  signIn,
  signUp,
  status,
}) => {
  if (status.formName === "signIn" && status.errors.length === 0) {
    // The form has been successfully submitted, so the modal can be closed.
    closeSignInModal();
  }
  return (
    <Modal
      dialogClassName={classes.SignInModal}
      show={isSignInModalOpen}
      onHide={closeSignInModal}
    >
      <div className={classes.modalContent}>
        {/* If second param of signIn is true, the form will not redirect
        to the profile page because it knows it is in a modal */}
        <div className={classes.signInForm}>
          <h3 className={classes.formTitle}>Sign in</h3>
          <SignInForm onSubmit={values => signIn(values, true)} />
        </div>
        <div className={classes.signUpForm}>
          <h3 className={classes.formTitle}>Don't have an account? Sign up.</h3>
          <SignUpForm onSubmit={signUp} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isSignInModalOpen: state.accounts.isSignInModalOpen,
  status: state.accounts.status,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, signUp, closeSignInModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SignInModal),
);
