import React  from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

const styles = {};

const PageHeader = () => {
  return (
    <h1>Hello this is a Header</h1>
  )
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(PageHeader));