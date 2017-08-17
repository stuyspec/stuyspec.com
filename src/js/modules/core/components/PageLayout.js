import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";
import Sidebar from "react-sidebar";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import SidebarContent from "./SidebarContent";
import { getSidebarOpen } from "../selectors";
import { getTopLevelSectionsWithDirectChildren } from "../../sections/selectors";
import { setSidebarOpen } from "../actions";

const styles = {
  PageContainer: {
    margin: '0 auto',
    width: '1060px',
  }
};

const sidebarStyles = {
  sidebar: {
    background: '#fff',
    boxShadow: '1px 2px 12px 0 rgba(0, 0, 0, 0.5)',
    padding: '14px',
    width: '220px',
    zIndex: 5001,
  },
  overlay: {
    background: 'rgba(255, 255, 255, 0.8)',
    zIndex: 5000,
  }
}

const PageLayout = ({
                      classes,
                      children,
                      location,
                      topLevelSectionsWithDirectChildren,
                      sidebarOpen,
                      setSidebarOpen }) => {
  const handleSetSidebarOpen = open => {
    setSidebarOpen(open);
  };

  /*
   * TODO: topLevelSectionsWithDirectChildren is flippin' annoying. If only
   *   need sections, move that shit into PageFooter.
   */

  return (
    <Sidebar sidebar={ <SidebarContent topLevelSectionsWithDirectChildren={ topLevelSectionsWithDirectChildren }/> }
             open={ sidebarOpen }
             onSetOpen={ handleSetSidebarOpen }
             styles={ sidebarStyles }>
      <PageHeader location={ location }
                  topLevelSectionsWithDirectChildren={ topLevelSectionsWithDirectChildren }/>
      <div className={ classes.PageContainer }>
        { children }
      </div>
      <PageFooter topLevelSectionsWithDirectChildren={ topLevelSectionsWithDirectChildren }/>
    </Sidebar>
  );
};

const mapStateToProps = (state) => ({
  topLevelSectionsWithDirectChildren: getTopLevelSectionsWithDirectChildren(state),
  sidebarOpen: getSidebarOpen(state)
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setSidebarOpen: setSidebarOpen,
  }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectSheet(styles)(PageLayout))
);