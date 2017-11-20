import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "react-bootstrap/lib";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";

const styles = {
  NotFoundPage: {
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
    "& a": {
      color: "#000 !important",
      textDecoration: "underline !important",
    },
  },
  img: {
    height: "75vh",
    width: "50%",
    marginTop: "25px",
  },
  "@media (max-width: 767px)": {
    NotFoundPage: {
      paddingTop: "40px",
    },
    img: {
      width: "100%",
    },
  },
};

const NotFoundPage = ({ classes }) => {
  return (
    <Grid className={classes.NotFoundPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>404 Page Not Found</title>
        <meta />
      </Helmet>
      <h1>Page Not Found.</h1>
      <p>Our apologies, you have reached a page that Does Not Exist.</p>
      <p>If you were looking for an article, just know that we are currently transfering all of the articles<br/> from the old website to this one. Please be patient and enjoy the rest of our website. </p>
      <p>
        Please try a modified query, or visit our <Link to="/">home page</Link>.
      </p>
      <img src="https://i.imgur.com/TqAkThR.png" className={classes.img} />
    </Grid>
  );
};

export default injectSheet(styles)(NotFoundPage);
