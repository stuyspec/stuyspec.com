import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Modal } from 'react-bootstrap/lib';

import SubscriptionForm from './forms/SubscriptionForm';
import { closeSubscriptionModal, subscribe } from '../actions';

const styles = {
  SubscriptionModal: {
    textAlign: 'center',
    top: '3%',
    width: '483px',
    margin: 'auto',
    maxWidth: '100%',
    padding: '10px',
  },
  film: {
    display: 'block',
    height: '89px',
    margin: 'auto',
    width: '164px',
  },
  playlist: {
    height: '108px',
    left: '3%',
    position: 'absolute',
    top: '48%',
  },
  borough: {
    display: 'block',
    height: '145px',
    margin: 'auto auto 30px auto',
    width: '234px',
  },
  notInterested: {
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '3px',
    color: '#888',
    fontFamily: 'Circular Std',
    fontSize: '15px',
    fontWeight: 300,
    margin: '20px 0',
    padding: '11px',
    width: '275px',
    maxWidth: '90%',
  },
  newsletter: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '28px',
    margin: '0 0 13px',
    padding: '0 10px',
  },
  inbox: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '21px',
    margin: '0 0 24px 0',
    padding: '0 10px',
  },
  '@media (max-width: 540px)': {
    playlist: {
      display: 'none',
    },
  },
};

function SubscriptionModal({
  classes,
  isSubscriptionModalOpen,
  closeSubscriptionModal,
  subscribe,
}) {
  return (
    <Modal
      dialogClassName={classes.SubscriptionModal}
      show={isSubscriptionModalOpen}
      onHide={closeSubscriptionModal}
    >
      <img
        className={classes.borough}
        src="https://i.imgur.com/4dYhg6S.png"
        title="Art by Vivian Lin (Class of '18)"
        alt=""
      />
      <img
        className={classes.playlist}
        src="https://i.imgur.com/zEV6AQ5.png"
        title="Art by Vivian Lin (Class of '18)"
        alt=""
      />
      <p className={classes.newsletter}>Get The Spectator Newsletter.</p>
      <p className={classes.inbox}>Delivered directly to your inbox.</p>
      <SubscriptionForm onSubmit={values => subscribe(values)} />
      <button
        onClick={closeSubscriptionModal}
        className={classes.notInterested}
      >
        I am not interested.
      </button>
      <br />
      <img
        className={classes.film}
        src="https://i.imgur.com/CY9Xf3s.png"
        title="Art by Karen Lai (Class of '19)"
        alt=""
      />
    </Modal>
  );
}

const mapStateToProps = state => ({
  isSubscriptionModalOpen: state.accounts.isSubscriptionModalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({ closeSubscriptionModal, subscribe }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SubscriptionModal),
);
