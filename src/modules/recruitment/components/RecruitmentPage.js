import React from "react";
import injectSheet from "react-jss";
import ReactPlayer from "react-player/youtube"

import * as constants from "../constants";

const styles = {
  Quote: {
    borderRadius: "5px",
    borderColor: "gray",
    color: "#000",
    display: "inlineBlock",
    marginLeft: "5px",
    marginRight: "5px",
    marginBottom: "25px",
  },
  QuoteText: {
    fontFamily: "Minion Pro",
    fontSize: "1.3em",
    lineHeight: "1.4em",
    margin: "10px",
    padding: "3px",
    textAlign: "center",
  },
  SectionTitle: {
    color: "#000",
    fontFamily: "Canela",
    margin: "10px",
    textAlign: "center",
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
  Section: {
    backgroundColor: "whitesmoke",
    borderColor: "steelblue",
    borderRadius: "10px",
    boxShadow: "0px 2.5px 5px 2.5px lightgray",
    flexGrow: "1",
    marginBottom: "25px",
    maxWidth: "350px",
    maxHeight: "1300px",
    position: "relative",
  },
  FlexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  Image: {
    display: "block",
    height: "300px",
    margin: "0 auto 10px",
    width: "300px",
  },
  App: {
    display: "block",
    fontFamily: "Minion Pro",
    margin: "10px",
    textAlign: "center",
    float: "bottom",
    bottom: "-2.5px",
    left: "0",
    right: "0",
  },
  Title: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "50px",
    marginTop: "0",
    textAlign: "center",
    paddingBottom: "10px",
  },
  Description: {
    fontFamily: "Minion Pro",
    fontSize: "20px",
    textAlign: "center",
    paddingBottom: "20px",
  },
  Video: {
    display: "block",
    margin: "auto",
    width: "50%",
    paddingBottom: "",
    textAlign: "center",
  }
};

const RecruitmentPage = ({ classes }) => {
  return (
    <div>
      <h1 className={classes.Title}>Recruitments</h1>
      <p className={classes.Description}>
        Apply to the Stuyvesant Spectator to join a 100 year tradition of
        student journalism.
      </p>
      <ReactPlayer
        url="https://youtu.be/8MvOzTSwwCs"
        controls={true}
        className={classes.Video}
      />
      <hr></hr>
      <div className={classes.FlexContainer}>
        {constants.SECTIONS.map(section => (
          <StyledSection
            name={section.name}
            imageLink={section.imageLink}
            description={section.description}
            quotes={section.quotes}
            deadline={section.deadline}
            app={section.link}
            key={section.name}
          />
        ))}
      </div>
    </div>
  );
};

const Quote = ({ classes, text, source }) => {
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

const Section = ({ classes, imageLink, name, description, quotes, deadline, app }) => {
  const appLink = (app) ?
      <a className={classes.App} href={app} >
         {" "}
         Click here to sign up for {name}!{" "}
      </a>:
      <p className={classes.App}>Check out recruitments in the spring!</p>

  return (
    <div className={classes.Section}>
      <h1 className={classes.SectionTitle}>{name}</h1>
      {imageLink && <img src={imageLink} className={classes.Image} alt="Quote"/>}
      <p className={classes.SectionText}>{description}</p>
      {quotes.map(({ text, source }) => {
        return <StyledQuote text={text} source={source} />;
      })}
      <p className={classes.SectionText}>Deadline - <b>{deadline}</b></p>
      {appLink}
    </div>
  );
};

const StyledSection = injectSheet(styles)(Section);

export default injectSheet(styles)(RecruitmentPage);
