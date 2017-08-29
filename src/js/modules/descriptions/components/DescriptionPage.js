import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

const styles = {
  DescriptionPage: {
    marginTop: "100px",
  },
  descriptionTitle: {
    fontFamily: "Canela",
    fontSize: "36px",
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },
  descriptionContent: {
    fontFamily: "Minion Pro",
    fontSize: "18px",
    color: "#000000",
  },
};

const DescriptionPage = ({ classes, description }) => {
  return (
    <div className={classes.DescriptionPage}>
      <p className={classes.descriptionTitle}>{description.title}</p>
      <div
        className={classes.descriptionContent}
        dangerouslySetInnerHTML={{ __html: description.content }}
      />
    </div>
  );
};

export default injectSheet(styles)(DescriptionPage);
