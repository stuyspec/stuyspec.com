import React from "react";
import injectSheet from "react-jss";
import { slide as Sidebar } from "react-burger-menu";
import { PAGE_HEADER_BOTTOM_MARGIN } from "../../../constants";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: '0 auto',
    marginBottom: PAGE_HEADER_BOTTOM_MARGIN,
    textAlign: 'center',
    width: '100%',
  },
  theSpectatorLogo: {
    fontFamily: 'Old English Text MT',
    fontSize: '75px',
    marginBottom: '22px',
    color: '#000',
  },
  sectionLinksNav: {
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    marginBottom: '16px',
    padding: 0,
  },
  sectionListElement: {
    display: 'inline',
    margin: '0px 12px',
  },
  sectionLink: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  sidebarContainer: {
    top: `-${PAGE_HEADER_BOTTOM_MARGIN}px`,
    position: 'relative',
  }
};

const sidebarStyles = {
  bmMenuWrap: {
    background: '#fff',
    zIndex: 9999,
  }
}

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false
    };
  }

  toggleSidebar = () => {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  render() {
    const { classes, location, topLevelSectionsWithDirectChildren } = this.props;
    return (
      <div className={classes.PageHeader}>
        <div className={classes.sidebarContainer}>
          <Sidebar customBurgerIcon={false}
                   customCrossIcon={false}
                   onStateChange={this.toggleSidebar}
                   isOpen={this.state.isSidebarOpen}
                   styles={sidebarStyles}>
            <a id="home" className="menu-item" href="#">Home</a>
            <a id="about" className="menu-item" href="#">About</a>
            <a id="contact" className="menu-item" href="#">Contact</a>
          </Sidebar>
        </div>
        {
          location.pathname === '/' ? (
            <Masthead
              topLevelSectionsWithDirectChildren={topLevelSectionsWithDirectChildren}/>
          ) : (
            <MastheadBar
              topLevelSectionsWithDirectChildren={topLevelSectionsWithDirectChildren}
              toggleSidebar={this.toggleSidebar}/>
          )
        }
      </div>
    );
  }
}

export default (injectSheet(styles)(PageHeader));
