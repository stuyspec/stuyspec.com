import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

import { SearchForm, SearchResults } from '.';

const styles = {
  title: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '36px',
    fontWeight: 500,
    margin: 0,
    textAlign: 'center',
  },
  form: {
    margin: '0 auto',
    display: 'block',
  },
};

function SearchPage(props) {
  const handleSearchFormSubmit = ({ query }) => {
    // We want a reusable search path
    props.history.push(
      `${props.location.pathname}?query=${encodeURIComponent(query)}`,
    );
  };

  const { classes } = props;
  const searchParams = new URLSearchParams(props.location.search);
  const query = searchParams.get('query');

  return (
    <Grid fluid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>Search</title>
      </Helmet>
      <Row>
        <p className={classes.title}>Search Results</p>
        <SearchForm
          onSubmit={handleSearchFormSubmit}
          query={query}
          className={classes.form}
        />
        <hr className={classes.hr} />
      </Row>
      {query && <SearchResults query={query} />}
    </Grid>
  );
}

export default compose(withRouter, injectSheet(styles))(SearchPage);
