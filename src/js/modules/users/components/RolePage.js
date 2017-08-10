import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getUsersInRole } from "../selectors";

const styles = {
  RolePage: {
    marginTop: '50px',
  }
};

const RolePage = ({ classes, role, usersInRole }) => {
  const createLinksToUsersInRole = () => {
    return Object.keys(usersInRole).map(userSlug => {
      const user = usersInRole[ userSlug ];
      return (
        <li key={`user${user.id}`}>
          <Link to={`/${role.slug}/${user.slug}`}>
            {user.firstName} {user.lastName}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.RolePage}>
      <h1>Role page for {`${role.title}s`}</h1>
      <ul>
        {createLinksToUsersInRole()}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  usersInRole: getUsersInRole(state, ownProps)
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(RolePage));
