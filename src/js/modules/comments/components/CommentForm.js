import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { getCurrentUser } from "../../accounts/selectors";
import injectSheet from "react-jss";

import { openSignInModal, signOut } from "../../accounts/actions";

const styles = {
  CommentForm: {
    color: "#000",
    fontFamily: "Minion Pro",
    marginBottom: "28px",
    padding: "0 20px 0 0",
  },
  textarea: {
    backgroundColor: "#fff",
    border: "solid 1px #e2e2e2",
    fontSize: "16px",
    height: "222px",
    lineHeight: "1.5",
    marginBottom: "10px",
    padding: "12px",
    width: "100%",
  },
  submitDiv: {
    textAlign: "right",
    clear: "both",
  },
  submitButton: {
    backgroundColor: "#3472b7",
    border: "1px solid #3472b7",
    borderRadius: "3px",
    color: "#fff",
    float: "left",
    fontSize: "15px",
    fontStyle: "italic",
    height: "32px",
    textAlign: "center",
    width: "70px",
    "&:disabled": {
      background: "#ddd",
      borderColor: "#ddd",
      color: "#888",
    },
  },
  moderationWarning: {
    bottom: "7px",
    float: "right",
    fontSize: "15px",
    fontStyle: "italic",
    position: "relative",
  },
  errorMessage: {
    color: "red",
  },
  editProfile: {
    background: "none",
    border: "none",
    color: "#3572b7",
    display: "inline",
    fontFamily: "Circular Std",
    fontSize: "16px",
    margin: 0,
    padding: 0,
  },
  userName: {
    display: "inline",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "4px",
  },
  userInfo: {
    marginBottom: "13px",
  },
  bulletPoint: {
    color: "#ccc",
    fontFamily: "Circular Std",
    fontSize: "12px",
    margin: "0 4px",
    position: "relative",
  },
  optOut: {
    background: "none",
    border: "none",
    color: "#3572b7",
    display: "inline",
    fontSize: "16px",
    padding: 0,
  },
  fulfilled: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  "@media (max-width: 991px)": {
    CommentForm: {
      paddingRight: "0 !important",
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.content) {
    errors.content = "Required";
  } else if (values.content.length > 1000) {
    errors.content = `Must be 1000 characters or less. Currently 
    ${values.content.length} characters`;
  }
  return errors;
};

const renderField = ({
  input,
  disabled,
  meta: { touched, error },
  checkLogin,
}) => {
  return (
    <div>
      <textarea
        {...input}
        placeholder="Comment"
        style={styles.textarea}
        onClick={checkLogin}
      />
      {touched && (error && <span style={styles.errorMessage}>{error}</span>)}
    </div>
  );
};

const CommentForm = ({
  classes,
  handleSubmit,
  submitting,
  currentUser,
  session,
  openSignInModal,
  status,
  signOut,
}) => {
  return (
    <Col md={7} lg={7} className={classes.CommentForm}>
      {currentUser && (
        <div className={classes.userInfo}>
          <p className={classes.userName}>
            {currentUser.firstName} {currentUser.lastName}
          </p>
          <span className={classes.bulletPoint}>&#8226;</span>
          <Link className={classes.optOut} to="/myaccount/profile">
            Edit Profile
          </Link>
          <span className={classes.bulletPoint}>&#8226;</span>
          <button className={classes.optOut} onClick={() => signOut(session)}>
            Log Out
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="content"
          component={renderField}
          checkLogin={() => !currentUser && openSignInModal()}
        />
        <div className={classes.submitDiv}>
          <button
            type="submit"
            disabled={!currentUser || submitting}
            className={classes.submitButton}
          >
            Submit
          </button>
          <p className={classes.moderationWarning}>
            Comments are moderated.
            <br />
            {status.type === "fulfilled" && (
              <span className={classes.fulfilled}>{status.message}</span>
            )}
            {status.type === "rejected" && (
              <span className={classes.rejected}>{status.message}</span>
            )}
          </p>
        </div>
      </form>
    </Col>
  );
};

const mapStateToProps = state => ({
  status: state.comments.status,
  currentUser: getCurrentUser(state),
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSignInModal, signOut }, dispatch);
};

const ConnectedCommentForm = connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(CommentForm),
);

export default reduxForm({
  form: "createComment",
  validate,
})(ConnectedCommentForm);
