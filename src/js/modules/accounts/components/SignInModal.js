import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Modal } from "react-bootstrap/lib";

import SignInForm from "./forms/SignInForm";
import { signIn, closeSignInModal } from "../actions";

const styles = {
  modalStyle: {
    width: "50%",
  },
  modalContent: {
    fontSize: "30px",
  },
};

const SignInModal = ({
  classes,
  isSignInModalOpen,
  closeSignInModal,
  signIn,
  status,
}) => {
  if (status.form === "signIn" && status.errors.length === 0) {
    // The form has been successfully submitted, so the modal can be closed.
    // closeSignInModal();
  }
  return (
    <Modal
      aria-labelledby="app"
      dialogClassName={classes.modalStyle}
      show={isSignInModalOpen}
      onHide={closeSignInModal}
    >
      <div className={classes.modalContent}>
        {/* If second param of signIn is true, the form will not redirect
        to the profile page because it knows it is in a modal */}
        <SignInForm onSubmit={values => signIn(values, true)} />
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isSignInModalOpen: state.accounts.isSignInModalOpen,
  status: state.accounts.status,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, closeSignInModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SignInModal),
);
