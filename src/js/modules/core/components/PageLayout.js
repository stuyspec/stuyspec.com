import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import Sidebar from "react-sidebar";
import Favicon from "react-favicon";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import SidebarContent from "./SidebarContent";
import SubscriptionModal from "../../accounts/components/SubscriptionModal";

import { openSidebar, closeSidebar } from "../actions";

const styles = {
  "@media (max-width: 991px)": {
    PageContainer: {
      marginTop: "60px",
    },
  },
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

class PageLayout extends Component {
  componentDidUpdate() {
    console.log('i did update')
    window.scrollTo(0, 0);
  }

  handleSetOpen = isSidebarOpen => {
    isSidebarOpen ? this.props.openSidebar() : this.props.closeSidebar();
  };

  render() {
    const { classes, children, location, isSidebarOpen } = this.props;
    return (
      <Sidebar
        sidebar={<SidebarContent />}
        open={isSidebarOpen}
        onSetOpen={isSidebarOpen => this.handleSetOpen(isSidebarOpen)}
        styles={sidebarStyles}
      >
        <PageHeader location={location} />
        <Favicon url="https://i.imgur.com/CxNoalR.png" />
        <div className={classes.PageContainer}>{children}</div>
        <SubscriptionModal />
        <PageFooter />
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({
  isSidebarOpen: state.core.isSidebarOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSidebar, closeSidebar }, dispatch);
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(PageLayout)),
);
