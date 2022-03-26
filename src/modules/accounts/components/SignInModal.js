import React from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Modal } from 'react-bootstrap/lib';

import { SignInForm } from './forms';
import { signIn, closeSignInModal } from '../actions';

const styles = {
  SignInModal: {
    width: '50%',
    maxWidth: '420px',
  },
  modalContent: {
    padding: '12px',
  },
  formTitle: {
    fontFamily: 'Canela',
    fontSize: '26px',
    fontWeight: 300,
    textAlign: 'center',
  },
  signInForm: {
    display: 'inline-block',
    width: '100%',
    '& hr': {
      overflow: 'visible',
      padding: 0,
      border: 'none',
      borderTop: 'medium double #333',
      color: '#333',
      textAlign: 'center',
      '&:after': {
        content: '"§"',
        fontFamily: 'Minion Pro',
        display: 'inline-block',
        position: 'relative',
        top: '-0.7em',
        fontSize: '1.5em',
        padding: '0 0.25em',
        background: 'white',
      },
    },
  },
  signOutForm: {
    display: 'inline-block',
    width: '100%',
  },
  signUpRedirect: {
    color: '#999',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '15px',
    marginBottom: '7px',
    '&:hover, &:active, &:focus': {
      color: '#999',
    },
  },
  '@media (max-width: 767px)': {
    SignInModal: {
      margin: '40px auto',
      width: '95.5%',
    },
  },
  '@media (max-width: 575px)': {
    SignInModal: {
      maxWidth: 'none',
      width: '95.5%',
    },
  },
};

function SignInModal({
  classes,
  isSignInModalOpen,
  closeSignInModal,
  signIn,
  status,
}) {
  if (status.formName === 'signIn' && status.errors.length === 0) {
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
          <h3 className={classes.formTitle}>Sign in!</h3>
          <hr />
          <SignInForm onSubmit={values => signIn(values, true)} />
        </div>
        <Link to="/myaccount/sign-up" className={classes.signUpRedirect}>
          Don't have an account? Create one »
        </Link>
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  isSignInModalOpen: state.accounts.isSignInModalOpen,
  status: state.accounts.status,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signIn, closeSignInModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SignInModal),
);
