import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Grid, Row, Col, Table } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";

import { SignOutForm } from "./forms";
import { signOut } from "../actions";

const styles = {
  pageTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  hr: {
    margin: "10px 0",
  },
  editRedirect: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    marginBottom: "14px",
  },
  dataTable: {
    "& .table-responsive table > tbody > tr > td": {
      fontFamily: "Minion Pro",
      fontSize: "17px",
      padding: "8px 0",
    },
    "& .table-responsive table > tbody > tr > td:first-child": {
      paddingRight: "12px",
      width: "120px",
    },
  },
  "@media (min-width: 992px)": {
    ProfilePage: {
      marginTop: "60px",
    },
  },
};

const ProfilePage = ({ classes, session, signOut, status, users }) => {
  const user = users[session.userId];
  if (user) {
    return (
      <Grid fluid className={classes.ProfilePage}>
        <Helmet titleTemplate="%s | The Stuyvesant Spectator">
          <title>Profile</title>
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
            <p className={classes.pageTitle}>Welcome, {user.firstName}.</p>
            <Link
              to={"/myaccount/profile/edit"}
              className={classes.editRedirect}
            >
              Edit Profile
            </Link>
            <div className={classes.dataTable}>
              <Table responsive>
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>{user.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{user.lastName}</td>
                  </tr>
                  <tr>
                    <td>E-mail Address</td>
                    <td>{user.email}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {/* We keep the SignOutForm to display the success message */}
            <SignOutForm onSubmit={() => signOut(session)} />
          </Col>
        </Row>
      </Grid>
    );
  }
};

const mapStateToProps = state => ({
  session: state.accounts.session,
  status: state.accounts.status,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(ProfilePage),
);
