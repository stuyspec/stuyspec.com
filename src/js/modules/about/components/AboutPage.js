import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

const styles = {
  'AboutPage': {
    'marginTop': '100px',
  },
};

const AboutPage = ({ classes, about }) => {
  return (
    <div className={classes.AboutPage}>
      <h1>{about.title}</h1>
      <p>{about.content}</p>
    </div>
  );
};

export default injectSheet(styles)(AboutPage);