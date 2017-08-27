import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Field, reduxForm } from 'redux-form'

const styles = {
  ReplyForm: {
    marginTop: "0px",
    marginBottom: "24px",
    padding: 0,
  },
  bigBox: {
    backgroundColor: '#fff',
    border: 'solid 1px #e2e2e2',
    boxShadow: 'inset 1px 1px 5px 0 rgba(170, 170, 170, 0.5)',
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    height: '222px',
    lineHeight: '1.44',
    marginBottom: '14px',
    padding: '12px 12px 0',
    resize: 'none',
    width: '526px',
  },
  submitDiv: {
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: '#3472b7',
    borderColor: "#3472b7",
    borderRadius: '5px',
    borderStyle: 'none',
    color: '#fff',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    fontStyle: 'italic',
    height: '36px',
    textAlign: 'center',
    width: '76px',
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
    color: '#000',
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '8px',
  },
  userInfo: {
    marginBottom: '14px',
  }
};

const validate = values => {
  const errors = {};
  if (!values.replyInput) {
    errors.replyInput = 'No Reply Detected';
  } else if (values.replyInput.length > 1000) {
    errors.replyInput = 'Must be 1000 characters or less'
  }
  return errors;
};

const renderField = ({
                       input,
                       type,
                       meta: { touched, error, warning }
                     }) =>
  <div>
      <textarea {...input} placeholder="Write a reply..."
                type={type}
                style={styles.bigBox}/>
    {touched &&
    ((error &&
      <span style={styles.errorMessage}>
            {error}
          </span>) ||
      (warning &&
        <span>
              {warning}
            </span>))}

  </div>;

const ReplyForm = ({
                     classes,
                     handleSubmit,
                     submitting,
                     session,
                   }) => {
  const editProfile = () => {
    console.log('editing profile');
  };
  const createUserInfo = () => {
    return (
      <div className={classes.userInfo}>
        <p className={classes.userName}>
          {/*TODO:{session.firstName} {session.lastName}*/}
          {session.email}
        </p>
        <button className={classes.editProfile} onClick={editProfile}>
          Edit Profile
        </button>
      </div>
    )
  };
  const createButton = () => {
    return (
      <button type="submit"
              disabled={submitting}
              className={classes.submitButton}>
        Submit
      </button>
    );
  };
  return (
    <Col mdOffset={1} md={6} lgOffset={1} lg={6} className={classes.ReplyForm}>
      {createUserInfo()}
      <form onSubmit={handleSubmit}>
        <Field name="replyInput"
               type="text"
               component={renderField}/>
        <div className={classes.submitDiv}>
          {createButton()}
        </div>
      </form>
    </Col>
  );
};

const mapStateToProps = (state, ownProps) => ({});


const smartReplyForm = connect(
  mapStateToProps,
)(injectSheet(styles)(ReplyForm));

export default reduxForm({
  form: `replyForm`,
  validate,
})(smartReplyForm);