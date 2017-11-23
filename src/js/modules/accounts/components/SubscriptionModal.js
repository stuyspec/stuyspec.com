import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Modal } from "react-bootstrap/lib";

import SubscriptionForm from "./forms/SubscriptionForm";
import { closeSubscriptionModal, subscribe } from "../actions";

const styles = {
  SubscriptionModal: {
    left: "30.5%",
    position: "absolute",
    textAlign: "center",
    top: "3%",
    width: "483px",
  },
  film: {
    display: "block",
    height: "89px",
    marginLeft: "40%",
    width: "164px",
  },
  playlist: {
    height: "108px",
    left: "3%",
    position: "absolute",
    top: "48%",
  },
  borough: {
    display: "block",
    height: "145px",
    margin: "0 0 30px 25%",
    width: "234px",
  },
  notInterested: {
    backgroundColor: "#ccc",
    border: "none",
    borderRadius: "3px",
    color: "#888",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "300",
    marginBottom: "19px",
    padding: "11px",
    width: "275px",
  },
  newsletter: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "28px",
    margin: "0 0 13px",
  },
  inbox: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "21px",
    margin: "0 0 24px 0",
  },
};

const SubscriptionModal = ({
  classes,
  isSubscriptionModalOpen,
  closeSubscriptionModal,
  subscribe,
}) => {
  return (
    <Modal
      dialogClassName={classes.SubscriptionModal}
      show={isSubscriptionModalOpen}
    >
      <img
        className={classes.borough}
        src="https://i.imgur.com/4dYhg6S.png"
        title="Art by Vivian Lin (Class of '18)"
      />
      <img
        className={classes.playlist}
        src="https://i.imgur.com/zEV6AQ5.png"
        title="Art by Vivian Lin (Class of '18)"
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
      />
    </Modal>
  );
};

const mapStateToProps = state => ({
  isSubscriptionModalOpen: state.accounts.isSubscriptionModalOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeSubscriptionModal, subscribe }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SubscriptionModal),
);
