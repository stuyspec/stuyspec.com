import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import humps from 'humps';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Helmet } from 'react-helmet';

import { EditUserForm } from './forms';
import { updateUser } from '../actions';
import { UserByUIDQuery } from '../../../queries';

const styles = {
  pageTitle: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: '11px',
  },
  backRedirect: {
    color: '#3084df',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    marginBottom: '14px',
  },
};

function EditProfilePage({ classes, updateUser, data }) {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const currentUser = data.userByUID;

  const handleUpdateUser = values => {
    updateUser(values, currentUser.id);
  };
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Edit Profile</title>
        <meta />
      </Helmet>
      <Row>
        <Col
          xs={12}
          sm={6}
          smOffset={3}
          md={6}
          mdOffset={3}
          lg={6}
          lgOffset={3}
        >
          <p className={classes.pageTitle}>Edit Profile</p>
          <Link to="/myaccount/profile" className={classes.backRedirect}>
            Back to Profile
          </Link>
          <EditUserForm onSubmit={handleUpdateUser} user={currentUser} />
        </Col>
      </Row>
    </Grid>
  );
}

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateUser }, dispatch);

export default compose(
  // connect is placed above the Apollo HOC so options can use props.session
  // as a variable
  connect(mapStateToProps, mapDispatchToProps),
  graphql(UserByUIDQuery, {
    options: ({ session }) => ({
      variables: { uid: (session && session.uid) || '' },

      // The "network-only" fetch policy prevents any caching of user token
      // headers, which constantly change.
      fetchPolicy: 'network-only',
    }),
  }),
  injectSheet(styles),
)(EditProfilePage);
