import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import * as constants from "../constants";

const styles = {
  GamePage: {
    borderRadius: "5px",
    borderColor: "gray",
    color: "#000",
    display: "inlineBlock",
    marginLeft: "5px",
    marginRight: "5px"
  },
  GameText: {
    fontFamily: "Circular Std",
    fontSize: "1.3em",
    lineHeight: "1.4em",
    margin: "10px",
    paddingTop: "35px",
    textAlign: "center",
    width: "300px",
    height: "300px",
    border: "3px solid black",
    borderRadius: "15px",
    backgroundColor: "white",
    margin: "15px",
    //paddingTop: "290px",
    fontWeight: "bold",
    ':hover': {
      border: '1px solid blue'
    }
  },
  SectionText: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "1.3em",
    lineHeight: "1.4em",
    margin: "13px",
    padding: "3px",
    textAlign: "center",
  },
  FlexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: "150px",
    //backgroundColor: "#B3DAF1"
  },
  Image: {
    display: "block",
    height: "150px",
    margin: "0 auto 10px",
    width: "150px",
  },
  Link: {
    fontFamily: "Circular Std",
    fontSize: "1.3em",
    lineHeight: "1em",
    color: "black"
  }
};

const GamePage = ({ classes }) => {
  return (
    <div>
      <div key={-5} className={classes.FlexContainer}>
        <Link to="/winter-crossword" className={classes.Link}>
          <div className={classes.GameText}>
            <img src={`${process.env.PUBLIC_URL}/img/crossword_logo.jpg`} className={classes.Image} alt="crossword_logo"/>
            <p style={{paddingTop:"10px"}}>THE WINTER CROSSWORD</p>
          </div>
        </Link>
      </div>    
    </div>
  );
};

const StyledSection = injectSheet(styles)(GamePage);

/*const Quote = ({ classes, text, source }) => {
  return (
    <div className={classes.Quote}>
      <p className={classes.QuoteText}>
        <i>{"“" + text + "”"}</i>
      </p>
      <p className={classes.QuoteText}>
        <i>{"―" + source}</i>
      </p>
    </div>
  );
};

const StyledQuote = injectSheet(styles)(Quote);

const Section = ({ classes, imageLink, name, description, quotes, app }) => {
  const appLink = (app) ?
      <a className={classes.App} href={app} >
         {" "}
         Click here to sign up for {name}!{" "}
      </a>:
      <p className={classes.App}>Recruitments in the Fall!</p>

  return (
    <div className={classes.Section}>
      <h1 className={classes.SectionTitle}>{name}</h1>
      {imageLink && <img src={imageLink} className={classes.Image} alt="Quote"/>}
      <p className={classes.SectionText}>{description}</p>
      {quotes.map(({ text, source }) => {
        return <StyledQuote text={text} source={source} />;
      })}
      {appLink}
    </div>
  );
};

const StyledSection = injectSheet(styles)(Section);*/

export default injectSheet(styles)(GamePage);
