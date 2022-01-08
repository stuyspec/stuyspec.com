import React from 'react';
import { Grid } from 'react-bootstrap/lib';
import injectSheet from 'react-jss';
import { Helmet } from 'react-helmet';

const styles = {
  DataErrorPage: {
    fontFamily: 'Minion Pro',
    maxWidth: '767px',
    paddingTop: '80px',
    textAlign: 'center',
    '& h1': {
      fontFamily: 'Canela',
      fontSize: '36px',
      lineHeight: '40px',
    },
    '& p': {
      fontSize: '21px',
      lineHeight: '27px',
      marginBottom: '2px',
    },
  },
  retryButton: {
    backgroundColor: '#3472b7',
    border: '1px solid #3472b7',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '21px',
    fontStyle: 'italic',
    height: '46px',
    margin: '15px 0',
    textAlign: 'center',
    width: '146px',
  },
  wowFace: {
    bottom: 0,
    maxHeight: '50vh',
    maxWidth: '50vw',
    position: 'absolute',
    right: 0,
    zIndex: -1,
  },
};

function DataErrorPage({ classes, action }) {
  return (
    <Grid className={classes.DataErrorPage}>
      <Helmet>
        <title>The Stuyvesant Spectator</title>
      </Helmet>
      <h1>Data Error.</h1>
      <p>Our apologies, we encountered a problem when fetching our data.</p>
      <p>
        &mdash;
        <i>The Stuyvesant Spectator Web Department</i>
      </p>
      <button className={classes.retryButton} onClick={action}>
        Reload Page
      </button>
      <img
        src="/img/wow-face.png"
        title="Art by Jade Lo (Class Of '20)"
        className={classes.wowFace}
        alt=""
      />
      <p className={classes.requestText}>
        If the error persists, please e-mail The Spectator Web Department at
        &nbsp;
        <a href="mailto:web@stuyspec.com">web@stuyspec.com</a>
&nbsp; with
        a brief explanation of what went wrong.
      </p>
    </Grid>
  );
}

export default injectSheet(styles)(DataErrorPage);
