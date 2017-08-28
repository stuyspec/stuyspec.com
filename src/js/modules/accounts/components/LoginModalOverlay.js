import React from "react";
import injectSheet from "react-jss";
import { Modal } from "react-bootstrap/lib";

const styles = {
  modalStyle: {
    width: '50%',
  },
  modalContent: {
    fontSize: '30px',
  },
};

const LoginModalOverlay = ({ classes, isModalOpen, closeModalLogin }) => {
  return (
    <Modal
      aria-labelledby="app"
      dialogClassName={classes.modalStyle}
      show={isModalOpen}
      onHide={closeModalLogin}
    >
      <div className={classes.modalContent}>
        Please Log In
      </div>
    </Modal>
  )
};

export default injectSheet(styles)(LoginModalOverlay);