import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

import { openLoginModal, closeLoginModal } from "../actions";

const styles = {
  CommentForm: {
    color: '#000',
    fontFamily: 'Minion Pro',
    marginBottom: '28px',
    padding: 0,
  },
  textarea: {
    backgroundColor: '#fff',
    border: 'solid 1px #e2e2e2',
    fontSize: '16px',
    height: '222px',
    lineHeight: '1.5',
    marginBottom: '10px',
    padding: '12px',
    width: '100%',
  },
  submitDiv: {
    textAlign: 'right',
    clear: 'both',
  },
  submitButton: {
    backgroundColor: '#3472b7',
    border: '1px solid #3472b7',
    borderRadius: '3px',
    color: '#fff',
    float: 'left',
    fontSize: '15px',
    fontStyle: 'italic',
    height: '32px',
    textAlign: 'center',
    width: '70px',
  },
  moderationWarning: {
    bottom: '7px',
    float: 'right',
    fontSize: '15px',
    fontStyle: 'italic',
    position: 'relative',
  },
  errorMessage: {
    color: 'red',
  },
  editProfile: {
    background: 'none',
    border: 'none',
    color: '#3572b7',
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '16px',
    margin: 0,
    padding: 0,
  },
  userName: {
    display: 'inline',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '4px',
  },
  userInfo: {
    marginBottom: '13px',
  },
  bulletPoint: {
    color: '#ccc',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    margin: '0 4px',
    position: 'relative',
  },
  optOut: {
    background: 'none',
    border: 'none',
    color: '#3572b7',
    display: 'inline',
    fontSize: '16px',
    padding: 0,
  },
  fulfilled: {
    color: 'green',
  },
  rejected: {
    color: 'red',
  }
};

const validate = values => {
  const errors = {};
  if (!values.content) {
    errors.content = 'Required';
  } else if (values.content.length > 1000) {
    errors.content = 'Must be 1000 characters or less';
  }
  return errors;
};

const renderField = ({ input, meta: { touched, error }, checkLogin }) => {
  return (
    <div>
      <textarea { ...input }
                placeholder="Comment"
                style={ styles.textarea }
                onClick={ checkLogin }/>
      { touched && (
        ( error &&
          <span style={ styles.errorMessage }>
            {error}
          </span>
        )
      ) }
    </div>
  );
};

const CommentForm = ({ classes, handleSubmit, submitting, session, openLoginModal, closeLoginModal, message }) => {
  const checkLogin = () => {
    if (!session) {
      openLoginModal();
    } else {
      closeLoginModal();
    }
  };
  return (
    <Col md={ 7 } lg={ 7 } className={ classes.CommentForm }>
      { session && (
        <div className={ classes.userInfo }>
          <p className={ classes.userName }>
            { session.data.data.firstName } { session.data.data.lastName }
          </p>
          <span className={ classes.bulletPoint }>&#8226;</span>
          <Link className={ classes.optOut } to="/myaccount/profile">
            Edit Profile
          </Link>
          <span className={ classes.bulletPoint }>&#8226;</span>
          <button className={ classes.optOut }>
            Log Out
          </button>
        </div>
      ) }
      <form onSubmit={ handleSubmit }>
        <Field name="content" component={ renderField } checkLogin={ checkLogin }/>
        <div className={ classes.submitDiv }>
          <button type="submit"
                  disabled={ !session && submitting }
                  className={ classes.submitButton }>
            Submit
          </button>
          <p className={ classes.moderationWarning }>
            Comments are moderated.
            <br/>
            { message.status === "fulfilled" && (
              <span className={ classes.fulfilled }>{ message.text }</span>
            ) }
            { message.status === "rejected" && (
              <span className={ classes.rejected }>{ message.text }</span>
            ) }
          </p>
        </div>
      </form>
    </Col>
  );
};

const mapStateToProps = state => ({
  message: state.comments.message,
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openLoginModal, closeLoginModal }, dispatch);
};

const SmartCommentForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectSheet(styles)(CommentForm));

export default reduxForm({
  form: 'createComment',
  validate,
})(SmartCommentForm);