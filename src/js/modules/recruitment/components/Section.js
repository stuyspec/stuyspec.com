import React from "react";
import Quote from "./Quote";

const styles = {
    background: {
        backgroundColor: "powderblue",
        borderRadius: "15px",
        borderColor: "steelblue"
    }
}

const Section = (name, description, quotes) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            {quotes.map((text, source) => {
                return (<Quote text={text} source={source} />)})
            }
        </div>
    )
}