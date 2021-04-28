import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Sidebar from "react-sidebar";
import Favicon from "react-favicon";
import { Grid } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import SidebarContent from "./SidebarContent";
import SubscriptionModal from "../../accounts/components/SubscriptionModal";
import { HorizontalAd } from "../../advertisements/components";
import { openSidebar, closeSidebar } from "../actions";

const PageLayoutQuery = gql`
  query PageLayoutQuery {
    featuredSections {
      id
      name
      permalink
      subsections {
        id
        name
        permalink
      }
    }
  }
`;

const styles = {
  horizontalAdContainer: {
    margin: "20px 0",
    "& > div > a": {
      display: "block",
      margin: "0 auto",
      width: "75%",
      textAlign: "center",
    },
  },
  "@media screen and (min-width: 769px)": {
      horizontalAdContainer: {
          display: "none",
      }
  },
  "@media (max-width: 991px)": {
    footerAd: {
      padding: 0,
    },
    horizontalAdContainer: {
      padding: "0 10%",
      "& > div > a": {
        width: "100%",
      },
    },
  },
  "@media (max-width: 767px)": {
    horizontalAdContainer: {
      padding: "0 2%",
    },
  },
};

const sidebarStyles = {
  sidebar: {
    background: "#fff",
    padding: "14px",
    width: "220px",
    zIndex: 5001,
  },
  overlay: {
    background: "rgba(255, 255, 255, 0.8)",
    zIndex: 5000,
  },
};

class PageLayout extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (document.getElementById("scroll-reset-assistant")) {
        // onChange called once before my-page renders
        document.getElementById(
          "scroll-reset-assistant",
        ).parentNode.scrollTop = 0;
      }
    }
  }

  handleSetOpen = isSidebarOpen => {
    if (isSidebarOpen) {
      this.props.openSidebar();
    } else {
      this.props.closeSidebar();
    }
  };

  render() {
    const { classes, children, location, isSidebarOpen, data } = this.props;
    const { loading, featuredSections } = data;
    if (loading) {
      return null;
    }
    return (
      <Sidebar
        sidebarClassName="sidebar"
        overlayClassName="sidebar-overlay"
        sidebar={<SidebarContent sections={featuredSections} />}
        open={isSidebarOpen}
        onSetOpen={isSidebarOpen => this.handleSetOpen(isSidebarOpen)}
        styles={sidebarStyles}
      >
        <div id="scroll-reset-assistant">
          <Helmet>
            <title>
              The Stuyvesant Spectator - The Pulse of the Stuyvesant Student
              Body
            </title>
          </Helmet>
          <PageHeader location={location} sections={featuredSections} />
          <Favicon url={`${process.env.PUBLIC_URL}/img/logo.png`} />
          <div className={classes.PageContainer}>
            {children}
            <Grid fluid className={classes.footerAd}>
              <div className={classes.horizontalAdContainer}>
                {<HorizontalAd />}
              </div>
            </Grid>
          </div>
          <SubscriptionModal />
          <PageFooter sections={featuredSections} />
        </div>
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

export default compose(
  graphql(PageLayoutQuery),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectSheet(styles),
)(PageLayout);
