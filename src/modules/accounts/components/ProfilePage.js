import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import humps from 'humps';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import {
  Grid, Row, Col, Table,
} from 'react-bootstrap/lib';
import { Helmet } from 'react-helmet';

import { SignOutForm } from './forms';
import { signOut } from '../actions';
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
  hr: {
    margin: '10px 0',
  },
  editRedirect: {
    color: '#3084df',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    marginBottom: '14px',
  },
  userInfo: {
    '& .table-responsive table > tbody > tr > td': {
      fontFamily: 'Minion Pro',
      fontSize: '17px',
      padding: '8px 0',
    },
    '& .table-responsive table > tbody > tr > td:first-child': {
      paddingRight: '12px',
      width: '120px',
    },
  },
};

function ProfilePage({
  classes, signOut, session, data,
}) {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const currentUser = data.userByUID;

  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Profile</title>
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
          <p className={classes.pageTitle}>
            Welcome,
            {currentUser.firstName}
            .
          </p>
          <Link to="/myaccount/profile/edit" className={classes.editRedirect}>
            Edit Profile
          </Link>
          <div className={classes.userInfo}>
            <Table responsive>
              <tbody>
                <tr>
                  <td>First Name</td>
                  <td>{currentUser.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{currentUser.lastName}</td>
                </tr>
                <tr>
                  <td>E-mail Address</td>
                  <td>{currentUser.email}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <SignOutForm onSubmit={() => signOut(session)} />
        </Col>
      </Row>
    </Grid>
  );
}

const mapStateToProps = state => ({
  session: state.accounts.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch);

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
)(ProfilePage);
