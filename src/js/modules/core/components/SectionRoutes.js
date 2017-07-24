import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSections } from '../selectors';

class SectionRoutes extends Component
{
  render ()
  {
    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      sections: getSections(state),
  }
}

export default connect(mapStateToProps)(SectionRoutes);