import React, { PureComponent } from "react";
import injectSheet from "react-jss";

import * as constants from "../constants";

const styles = {
    quote: {
        background: {
            borderRadius: "15px",
            borderColor: "gray",
            backgroundColor: "gainsboro",
        },
        text: {
            fontFamily: "Minion Pro",
            fontSize: "15px"
        },
    },
    section: {

    },
    page: {

    }
};

const RecruitmentPage = ({}) => {
    //const sections = constants.SECTIONS;
    return (
        /*<div>
            {sections.map(
                section => <Section name={section.name} description={section.description} quotes={section.quotes} />
            )}
        </div>
        */
       <div>
           <Section name="Web" description="Best department" quotes={[{text: "Fight the power", source: "Nich"}]} />
        </div>
    );
};


const Quote = ({ text, source }) => {
    return (
        <div id={styles.quote.background}>
            <p id={styles.quote.text}>
                {"“" + text + "”"}
            </p>
            <i id={styles.quote.text}>{"―" + source}</i>
        </div>
    );
};

const Section = ({ name, description, quotes }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            {quotes.map(({text, source}) => {
                return (<Quote text={text} source={source} />)})
            }
        </div>
    );
};

export default injectSheet(styles)(RecruitmentPage);