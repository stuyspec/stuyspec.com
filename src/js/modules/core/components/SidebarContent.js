import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { closeSidebar } from "../actions";
import { getTopLevelSections } from "../../sections/selectors";

const styles = {
  divider: {
    background: "#ddd",
    border: 0,
    height: "1px",
    margin: 0,
  },
  sidebarSectionLink: {
    borderRadius: "3px",
    color: "#000",
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "15px",
    fontWeight: "500",
    margin: "8px 0",
    padding: "8px 0 8px 11px",
    textAlign: "left",
    width: "100%",
    "&:active": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
    "&:hover": {
      background: "rgba(84, 153, 232, 0.26)",
      color: "#000",
      textDecoration: "none",
    },
  },
};

const SidebarContent = ({ classes, topLevelSections, closeSidebar }) => {
  let sidebarElements = [];
  sidebarElements.push(
    <Link
      className={classes.sidebarSectionLink}
      key={-1}
      onClick={closeSidebar}
      to={"/"}
    >
      Home
    </Link>,
  );
  Object.values(topLevelSections).forEach(section => {
    sidebarElements.push(
      <Link
        className={classes.sidebarSectionLink}
        key={section.id}
        onClick={closeSidebar}
        to={section.permalink}
      >
        {section.name}
      </Link>,
    );
    // We want a line separating the writing sections from the non-writing
    //   sections and one separating the non-writing sections from the
    //   user account options.
    if (section.slug === "sports" || section.slug === "video") {
      sidebarElements.push(
        <hr className={classes.divider} key={section.id + 100} />,
      );
    }
  });

  return <div>{sidebarElements}</div>;
};

const mapStateToProps = state => ({
  topLevelSections: getTopLevelSections(state),
  isSidebarOpen: state.core.isSidebarOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(SidebarContent),
);
