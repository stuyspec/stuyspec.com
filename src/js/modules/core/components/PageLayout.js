import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import Sidebar from "react-sidebar";
import Favicon from "react-favicon";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import SidebarContent from "./SidebarContent";

import { openSidebar, closeSidebar } from "../actions";

const styles = {
  PageContainer: {},
};

const sidebarStyles = {
  sidebar: {
    background: "#fff",
    boxShadow: "1px 2px 12px 0 rgba(0, 0, 0, 0.5)",
    padding: "14px",
    width: "220px",
    zIndex: 5001,
  },
  overlay: {
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 5000,
  },
};

const PageLayout = ({
  classes,
  children,
  location,
  isSidebarOpen,
  openSidebar,
  closeSidebar,
}) => {
  const handleSetOpen = isSidebarOpen => {
    // TODO: rename to setSidebarOpen?
    isSidebarOpen ? openSidebar() : closeSidebar();
  };
  return (
    <Sidebar
      sidebar={<SidebarContent />}
      open={isSidebarOpen}
      onSetOpen={handleSetOpen}
      styles={sidebarStyles}
    >
      <PageHeader location={location} />
      <Favicon url="https://i.imgur.com/CxNoalR.png" />
      <div className={classes.PageContainer}>{children}</div>
      <PageFooter />
    </Sidebar>
  );
};

const mapStateToProps = state => ({
  isSidebarOpen: state.core.isSidebarOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar, closeSidebar }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(PageLayout)),
);
