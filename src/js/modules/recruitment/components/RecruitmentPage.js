import React, { PureComponent } from "react";
import injectSheet from "react-jss";

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
        textAlign: "center"
    },
    SectionTitle: {
        color: "#000",
        fontFamily: "Canela",
        margin: "10px",
        textAlign: "center",
    },
    SectionText:{
        color: "#000",
        fontFamily: "Minion Pro",
        textAlign: "center",
        margin: "10px",
    },
    Section: {
        backgroundColor: "whitesmoke",
        borderColor: "steelblue",
        borderRadius: "10px",
        boxShadow: "0px 2.5px 5px 2.5px lightgray",
        flexGrow: "1",
        marginBottom: "25px",
        maxWidth: "350px",
        position: "relative",
    },
    RecruitmentPage: {

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
      //color: "#000",
      display: "block",
      fontFamily: "Minion Pro",
      margin: "10px",
      textAlign: "center",
      position: "absolute",
      bottom: "-2.5px",
      left: "0",
      right: "0",
    },
    Title: {
        fontFamily: "Old English Text MT",
        fontSize: "50px",
        textAlign: "center",
        paddingBottom: "10px",
    },
    Description: {
        fontFamily: "Minion Pro",
        fontSize: "20px",
        textAlign: "center",
        paddingBottom: "20px"
    }
};

const RecruitmentPage = ({classes}) => {
    return (
        <div className={classes.RecruitmentPage}>
            <h1 className={classes.Title}>Recruitments</h1>
            <p className={classes.Description}>
                Come to the Stuyvesant Spectator's recruitments to join a 100 year tradition of student journalism.
                Interest meeting this Wednesday and Thursday after 10th at the library.
            </p>
            <div className={classes.FlexContainer}>
                {
                    constants.SECTIONS.map(
                    section => <StyledSection name={section.name}
                                              imageLink={section.imageLink}
                                              description={section.description}
                                              quotes={section.quotes}
                                              app={section.link} />
                    )
                }
            </div>
        </div>
    );
};


const Quote = ({ classes, text, source }) => {
    return (
        <div className={classes.Quote}>
            <p className={classes.QuoteText}>
                {"“" + text + "”"}
            </p>
            <p className={classes.QuoteText}>
                <i>{"―" + source}</i>
            </p>
        </div>
    );
};

const StyledQuote = injectSheet(styles)(Quote);

const Section = ({ classes, imageLink, name, description, quotes, app}) => {
    return (
        <div className={classes.Section}>
            <h1 className={classes.SectionTitle}>{name}</h1>
            {imageLink && <img src={imageLink} className={classes.Image}/>}
            <p className={classes.SectionText}>{description}</p>
            {quotes.map(({text, source}) => {
                return (<StyledQuote text={text} source={source} />)})
            }
            {app && <a href={app} className={classes.App}> Click here to sign up for {name}! </a>}
        </div>
    );
};

const StyledSection = injectSheet(styles)(Section);

export default injectSheet(styles)(RecruitmentPage);