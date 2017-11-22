import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
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

const styles = {
  horizontalAdContainer: {
    margin: "20px 0",
    "& > div > a": {
      display: "block",
      margin: "0 auto",
      width: "75%",
    },
  },
  "@media (max-width: 991px)": {
    PageContainer: {
      marginTop: "60px",
    },
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
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (document.getElementById('scroll-reset-assistant')) { // onChange called once before my-page renders
        document.getElementById('scroll-reset-assistant').parentNode.scrollTop = 0;
      }
    }
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
        <div id="scroll-reset-assistant">
          <PageHeader location={location} />
          <Helmet>
            <title>The Stuyvesant Spectator</title>
            <meta
              name="description"
              content="The Stuyvesant Spectator is a newspaper published by Stuyvesant High School students every two weeks. It contains sections such as news, features, opinions, arts & entertainment, humor, sports, photography, art, layout, copy, business, and web. This website is basically the best high school newspaper website in New York because it uses React and Redux with a Rails API and utilizes modern technology to spread knowledge of current events and opinions on pressing issues. The Stuyvesant Spectator informs the Stuyvesant student body about what has been going on lately in the school, especially those students who do nothing but study 24/7, so this newspaper basically keeps everyone up to date. During certain parts of the year, The Stuyvesant Spectator publishes special editions written exclusively by the wonderful and intelligent students at Stuyvesant High School. With such a wide range of topics, readers would never run out of reading material, which makes this newspaper awesome!"
            />
            <meta
              name="keywords"
              content="newspaper,news,Stuyvesant,stuyvesant,highschool,humor,opinions,sports,arts,entertainment,articles,Spectator,spectator,knowledge,intelligence,pulse,manhattan,specialized,writers,photos"
            />
          </Helmet>
          <Favicon url="https://i.imgur.com/CxNoalR.png" />
          <div className={classes.PageContainer}>
            {children}
            <Grid fluid className={classes.footerAd}>
              <div className={classes.horizontalAdContainer}>
                <HorizontalAd />
              </div>
            </Grid>
          </div>
          <SubscriptionModal />
          <PageFooter />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(PageLayout)),
);

/**
import {Helmet} from "react-helmet";

<Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>

        </title>
        <meta>

        </meta>
      </Helmet>
*/
