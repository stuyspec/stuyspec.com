import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import { getSectionTree } from '../../sections/selectors';

const styles = {};

const PageLayout = ({ children, sectionTree }) => {
  return (
    <div>
      <PageHeader/>
      {children}
      <PageFooter sectionTree={sectionTree}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sectionTree: getSectionTree(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(PageLayout));