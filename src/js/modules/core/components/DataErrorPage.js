import React from "react";
import { Grid } from "react-bootstrap/lib";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";

const styles = {
  DataErrorPage: {
    fontFamily: "Minion Pro",
    paddingTop: "80px",
    textAlign: "center",
    "& h1": {
      fontFamily: "Canela",
      fontSize: "36px",
      lineHeight: "40px",
    },
    "& p": {
      fontSize: "21px",
      lineHeight: "27px",
      marginBottom: "2px",
    },
  },
  retryButton: {
    backgroundColor: "#3472b7",
    border: "1px solid #3472b7",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "21px",
    fontStyle: "italic",
    height: "46px",
    marginTop: "15px",
    textAlign: "center",
    width: "146px",
  },
  wowFace: {
    bottom: 0,
    position: "absolute",
    right: 0,
    width: "50vw",
  },
};

const DataErrorPage = ({ classes, error, action}) => {
  console.error(error);
  return (
    <Grid className={classes.DataErrorPage}>
      <Helmet>
        <title>The Stuyvesant Spectator</title>
      </Helmet>
      <h1>Data Error.</h1>
      <p>Our apologies, we have encountered a problem with our data-fetching.</p>
      <p>&mdash;<i>The Stuyvesant Spectator Web Department</i></p>
      <button className={classes.retryButton} onClick={action}>Reload Page</button>
      <img src="/img/wow-face.png" className={classes.wowFace} />
      {/*
      <p className={classes.requestText}>
        Help the Spectator Web Department out, and
        &nbsp;<a href="mailto:web@stuyspec.com">e-mail</a>&nbsp;
        us with a screenshot of your console.
      <p>
      */}
    </Grid>
  );
};

export default injectSheet(styles)(DataErrorPage);
