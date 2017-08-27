import React from "react";
import { withRouter } from "react-router-dom";
import injectSheet from "react-jss";

import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

const styles = {
  PageContainer: {
    margin: '0 auto',
    width: '1060px',
  }
};

const PageLayout = ({ classes, children, location }) => {
  return (
    <div>
      <PageHeader location={ location }/>
      <div className={ classes.PageContainer }>
        { children }
      </div>
      <PageFooter/>
    </div>
  );
};

export default withRouter((injectSheet(styles)(PageLayout)));