import React from "react";
import { Grid, Row, Col } from "react-bootstrap/lib";
import injectSheet from "react-jss";
import {Helmet} from "react-helmet";

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
    },
  },
};

const DescriptionPage = ({ classes, description }) => {
  return (
    <Grid fluid className={classes.DescriptionPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>
          {description.title}
        </title>
        <meta>

        </meta>
      </Helmet>
      <p className={classes.descriptionTitle}>{description.title}</p>
      <div
        className={classes.descriptionContent}
        dangerouslySetInnerHTML={{ __html: description.content }}
      />
    </Grid>
  );
};

export default injectSheet(styles)(DescriptionPage);
