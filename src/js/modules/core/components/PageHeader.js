import React  from 'react';
import injectSheet from 'react-jss';

const styles = {};

const PageHeader = () => {
  return (
    <h1>Hello this is a Header</h1>
  )
}

export default (injectSheet(styles)(PageHeader));