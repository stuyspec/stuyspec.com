import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import injectSheet from 'react-jss';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import {getSectionsWithSubsections} from '../../sections/selectors';

const styles = {
  PageContainer: {
    margin: '0 auto',
    width: '1060px',
  }
};

const PageLayout = ({classes, children, sectionsWithSubsections}) => {
  return (
    <div>
      <PageHeader sectionsWithSubsections={sectionsWithSubsections}/>
      <div className={classes.PageContainer}>
        {children}
      </div>
      <PageFooter sectionsWithSubsections={sectionsWithSubsections}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sectionsWithSubsections: getSectionsWithSubsections(state),
});

export default withRouter(
  connect(mapStateToProps)
  (injectSheet(styles)(PageLayout))
);