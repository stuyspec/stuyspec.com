import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";

const styles = {
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
  "@media (min-width: 992px)": {
    DescriptionPage: {
      marginTop: "60px",
    }
  },
};

const DescriptionPage = ({ classes, description }) => {
  return (
    <Grid fluid className={classes.DescriptionPage}>
      <p className={classes.descriptionTitle}>{description.title}</p>
      <div
        className={classes.descriptionContent}
        dangerouslySetInnerHTML={{ __html: description.content }}
      />
    </Grid>
  );
};

export default injectSheet(styles)(DescriptionPage);
