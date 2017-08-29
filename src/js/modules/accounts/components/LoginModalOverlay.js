import React from "react";
import injectSheet from "react-jss";
import { Modal } from "react-bootstrap/lib";
import SignInForm from "./forms/SignInForm";

const styles = {
  modalStyle: {
    width: "50%",
  },
  modalContent: {
    fontSize: "30px",
  },
};

const LoginModalOverlay = ({
  classes,
  isModalOpen,
  closeModalLogin,
  signIn,
}) => {
  return (
    <Modal
      aria-labelledby="app"
      dialogClassName={classes.modalStyle}
      show={isModalOpen}
      onHide={closeModalLogin}
    >
      <div className={classes.modalContent}>
        <SignInForm onSubmit={signIn} />
      </div>
    </Modal>
  );
};

export default injectSheet(styles)(LoginModalOverlay);
