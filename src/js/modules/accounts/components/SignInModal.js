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
}) => {
  console.log('hi');
  return (
    <Modal
      aria-labelledby="app"
      dialogClassName={classes.modalStyle}
      show={isSignInModalOpen}
      onHide={closeSignInModal}
    >
      <div className={classes.modalContent}>
        <SignInForm onSubmit={signIn} />
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isSignInModalOpen: state.accounts.isSignInModalOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signIn, closeSignInModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(SignInModal));
