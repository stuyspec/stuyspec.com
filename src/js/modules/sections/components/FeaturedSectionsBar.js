import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../accounts/selectors";
import { Search } from "../icons";
import { openSidebar } from "../actions";
import { getTopLevelSections } from "../../sections/selectors";
import { openSubscriptionModal } from "../../accounts/actions";

const FeaturedSectionsBar = ({ classes, openSidebar, openSubscriptionModal }) => {
  return (
    <ul className={classes.sectionLinksNav}>
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
      {!session && (
        <li key={-3} className={classes.sectionListItem}>
          <Link to="/search" className={classes.sectionLink}>
            <Search className={classes.navSearchButton} />
          </Link>
        </li>
      )}
      */}
    </ul>
  )
}

const mapStateToProps = state => ({
  sections: getTopLevelSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal, openSidebar }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(Masthead),
);
