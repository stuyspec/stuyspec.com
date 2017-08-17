import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { toggleSidebar } from "../actions";

const styles = {
  divider: {
    background: '#ddd',
    border: 0,
    height: '1px',
    margin: 0,
  },
  sidebarSectionLink: {
    borderRadius: '3px',
    color: '#000',
    display: 'block',
    fontFamily: 'Circular Std',
    fontSize: '15px',
    fontWeight: '500',
    margin: '8px 0',
    padding: '8px 0 8px 11px',
    textAlign: 'left',
    width: '100%',
    '&:active': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:focus': {
      color: '#000',
      textDecoration: 'none',
    },
    '&:hover': {
      background: 'rgba(84, 153, 232, 0.26)',
      color: '#000',
      textDecoration: 'none',
    }
  },
};

const SidebarContent = ({ classes, topLevelSectionsWithDirectChildren, isSidebarOpen, toggleSidebar }) => {
  const handleToggleSidebar = () => {
    toggleSidebar(!isSidebarOpen);
  };

  let sidebarElements = [];
  sidebarElements.push(
    <Link className={ classes.sidebarSectionLink }
          key={ -1 }
          onClick={ handleToggleSidebar }
          to={ '/' }>
      Home
    </Link>
  );
  Object.keys(topLevelSectionsWithDirectChildren).forEach(sectionSlug => {
    const section = topLevelSectionsWithDirectChildren[ sectionSlug ];
    sidebarElements.push(
      <Link className={ classes.sidebarSectionLink }
            key={ section.id }
            onClick={ handleToggleSidebar }
            to={ section.permalink }>
        { section.name }
      </Link>
    );
    if (sectionSlug === 'sports' || sectionSlug === 'video') {
      sidebarElements.push(
        <hr className={ classes.divider } key={ section.id + 100 }/>
      );
    }
  });

  return (
    <div>
      { sidebarElements }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isSidebarOpen: state.core.isSidebarOpen,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleSidebar: toggleSidebar,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SidebarContent));