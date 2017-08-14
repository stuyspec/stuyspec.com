import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

const styles = {
  'AboutPage': {
    'marginTop': '100px',
  },
  'aboutTitle': {
    'fontFamily':'Canela',
    'fontSize':'36px',
    'fontWeight':'500',
    'textAlign':'center',
    'color':'#000000',
  },
  'aboutContent':{
    'fontFamily':'Minion Pro',
    'fontSize':'18px',
    'color':'#000000',
  },
};

const AboutPage = ({ classes, about }) => {
  return (
    <div className={classes.AboutPage}>
      <p className={classes.aboutTitle}>{about.title}</p>
      <p className={classes.aboutContent}>{about.content}</p>
    </div>
  );
};

export default injectSheet(styles)(AboutPage);