import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { Search } from "../../core/icons";
import { getTopLevelSections } from "../selectors";
import { openSubscriptionModal } from "../../accounts/actions";

const styles = {
  FeaturedSectionsBar: {
    fontFamily: "Circular Std",
    listStyleType: "none",
    padding: "6px",
  },
  sectionListItem: {
    display: "inline",
    margin: "0px 13px",
  },
  navSearchButton: {
    top: "-1px",
    position: "relative",
  },
  sectionLink: {
    color: "#000",
    fontSize: "14px",
    fontWeight: 300,
    textDecoration: "none",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
};

const FeaturedSectionsBar = ({
  classes,
  openSubscriptionModal,
  sections,
  omitSearch,
}) => {
  return (
    <ul className={classes.FeaturedSectionsBar}>
      {Object.values(sections).map(section => {
        return (
          <li key={section.id} className={classes.sectionListItem}>
            <Link to={section.permalink} className={classes.sectionLink}>
              {section.name}
            </Link>
          </li>
        );
      })}
      <li key={-1} className={classes.sectionListItem}>
        <Link
          onClick={openSubscriptionModal}
          to={"/"}
          className={classes.sectionLink}
        >
          Newsletter
        </Link>
      </li>
      {/*
        <li key={-2} className={classes.sectionListItem}>
          <Link to={"/paper"} className={classes.sectionLink}>
            The Paper
          </Link>
        </li>
      */}
      {!omitSearch && (
        <li key={-3} className={classes.sectionListItem}>
          <Link to="/search" className={classes.sectionLink}>
            <Search className={classes.navSearchButton} />
          </Link>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = state => ({
  sections: getTopLevelSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(FeaturedSectionsBar),
);
