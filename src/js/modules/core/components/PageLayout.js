import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import injectSheet from 'react-jss';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import {getSectionsWithSubsections} from '../../sections/selectors';

const styles = {};

const PageLayout = ({children, sectionsWithSubsections}) => {
  return (
    <div>
      <PageHeader sectionsWithSubsections={sectionsWithSubsections}/>
      {children}
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