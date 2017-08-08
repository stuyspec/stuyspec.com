import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getUsersWithinRole } from "../selectors";

const styles = {
  RolePage: {
    marginTop: '50px',
  }
};

const RolePage = ({ classes, role, usersWithinRole }) => {
  const linkToUsersInRole = () => {
    return Object.keys(usersWithinRole).map((userSlug, index) => {
      const user = usersWithinRole[ userSlug ];
      return (
        <li key={`user${index}`}>
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
        {linkToUsersInRole()}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  usersWithinRole: getUsersWithinRole(state, ownProps)
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(RolePage));
