import React from "react";
import injectSheet from "react-jss";

const styles = {
    background: {
        borderRadius: "15px",
        borderColor: "gray",
        backgroundColor: "gainsboro",
    },
    text: {
        fontFamily: "Minion Pro",
        fontSize: "15px"
    },
}

const Quote = ({ text, source }) => {
    return (
        <div id={styles.background}>
            <p id={styles.text}>
                {"&ldquo;" + text + "&rdquo;"}
            </p>
            <i id={styles.text}>{source}</i>
        </div>
    );
};

export default injectSheet(styles)(Quote);