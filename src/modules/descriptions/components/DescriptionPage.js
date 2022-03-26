import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import { NotFoundPage } from '../../core/components';

const styles = {
  descriptionTitle: {
    fontFamily: 'Canela',
    fontSize: '36px',
    fontWeight: 500,
    textAlign: 'center',
    color: '#000000',
  },
  descriptionContent: {
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    color: '#000000',
  },
};

function DescriptionPage({ classes, description }) {
  if (!description) {
    return <NotFoundPage />;
  }
  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{description.title}</title>
        <meta />
      </Helmet>
      <p className={classes.descriptionTitle}>{description.title}</p>
      <div
        className={classes.descriptionContent}
        dangerouslySetInnerHTML={{ __html: description.content }}
      />
    </Grid>
  );
}

const mapStateToProps = (state, ownProps) => ({
  description: state.descriptions.find(
    desc => desc.slug === ownProps.match.params.description_slug,
  ),
});

export default connect(mapStateToProps)(injectSheet(styles)(DescriptionPage));
