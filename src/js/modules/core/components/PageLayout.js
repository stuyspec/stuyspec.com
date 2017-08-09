import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import { getTopLevelSectionsWithDirectChildren } from "../../sections/selectors";
import { getParentAboutPagesWithChildren} from "../../about/selectors";

const styles = {
  PageContainer: {
    margin: '0 auto',
    width: '1060px',
  }
};

const PageLayout = ({ classes,
                      children,
                      location,
                      topLevelSectionsWithDirectChildren,
                      parentAboutPagesWithChildren }) => {
  return (
    <div>
      <PageHeader location={location}
                  topLevelSectionsWithDirectChildren={topLevelSectionsWithDirectChildren}/>
      <div className={classes.PageContainer}>
        {children}
      </div>
      <PageFooter topLevelSectionsWithDirectChildren={topLevelSectionsWithDirectChildren}
                  parentAboutPagesWithChildren={parentAboutPagesWithChildren}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  topLevelSectionsWithDirectChildren: getTopLevelSectionsWithDirectChildren(state),
  parentAboutPagesWithChildren: getParentAboutPagesWithChildren(state),
});

export default withRouter(
  connect(mapStateToProps)
  (injectSheet(styles)(PageLayout))
);