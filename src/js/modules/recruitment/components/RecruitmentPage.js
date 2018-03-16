import React, { PureComponent } from "react";
import injectSheet from "react-jss";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col"

import * as constants from "../constants";

const styles = {
    Quote: {
        borderRadius: "5px",
        borderColor: "gray",
        //backgroundColor: "gainsboro",
        marginLeft: "5px",
        marginRight: "5px",
        marginBottom: "50px",
        display: "inlineBlock",
    },
    QuoteText: {
        fontFamily: "Minion Pro",
        textAlign: "center"
    },
    SectionText: {
        fontFamily: "Circular Std",
        textAlign: "center"
    },
    Section: {
        backgroundColor: "whitesmoke",
        borderRadius: "10px",
        borderColor: "steelblue",
        maxWidth: "350px",
        display: "inlineBlock",
        boxShadow: "",
    },
    RecruitmentPage: {

    }
};

const RecruitmentPage = ({classes}) => {
    //const sections = constants.SECTIONS;
    return (
        /*<div>
            {sections.map(
                section => <Section name={section.name} description={section.description} quotes={section.quotes} />
            )}
        </div>
        */
       /*<div className={classes.RecruitmentPage}>
           <StyledSection name="Web" description="Best department" quotes={[{text: "Fight the power", source: "Nich"}]} />
        </div>*/
        <div className={classes.RecruitmentPage}>
            <Grid fluid>
                <Col>
                {
                    constants.SECTIONS.map(
                    section => <StyledSection name={section.name} imageLink={section.imageLink} description={section.description} quotes={section.quotes} />
                    )
                }
                </Col>
            </Grid>
        </div>
    );
};


const Quote = ({ classes, text, source }) => {
    return (
        <div className={classes.Quote}>
            <p className={classes.QuoteText}>
                {"“" + text + "”"}
            </p>
            <p  className={classes.QuoteText}>
                <i>{"―" + source}</i>
            </p>
        </div>
    );
};

const StyledQuote = injectSheet(styles)(Quote);

const Section = ({ classes, imageLink, name, description, quotes }) => {
    return (
        <div className={classes.Section}>
            <h1 className={classes.SectionText}>{name}</h1>
            <img src={imageLink} />
            <p className={classes.SectionText}>{description}</p>
            {quotes.map(({text, source}) => {
                return (<StyledQuote text={text} source={source} />)})
            }
        </div>
    );
};

const StyledSection = injectSheet(styles)(Section);

export default injectSheet(styles)(RecruitmentPage);