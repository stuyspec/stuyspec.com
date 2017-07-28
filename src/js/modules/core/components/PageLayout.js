import React from 'react';

import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const PageLayout = ({ children }) => {
  return (
    <div>
      <PageHeader/>
      {children}
      <PageFooter/>
    </div>
  )
}

export default PageLayout;