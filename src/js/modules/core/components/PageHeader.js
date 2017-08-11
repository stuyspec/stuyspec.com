import React from "react";
import injectSheet from "react-jss";
import { slide as Sidebar } from "react-burger-menu";

import Masthead from "./Masthead";
import MastheadBar from "./MastheadBar";

const styles = {
  PageHeader: {
    margin: '0px auto 24px auto',
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
};

const sidebarStyles = {
  bmMenu: {
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
        <Sidebar customBurgerIcon={false}
                 customCrossIcon={false}
                 isOpen={this.state.isSidebarOpen}
                 styles={sidebarStyles}>
          <a id="home" className="menu-item" href="#">Home</a>
          <a id="about" className="menu-item" href="#">About</a>
          <a id="contact" className="menu-item" href="#">Contact</a>
        </Sidebar>
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
