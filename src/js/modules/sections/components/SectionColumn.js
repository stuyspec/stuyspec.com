import React from "react";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";

import SectionBlock from "./SectionBlock";

const styles = {
  SectionColumn: {
    borderLeft: "solid 1px #ddd",
    padding: "0 13px !important",
    "& > div:not(:last-child)": { // targets each SectionBlock
      borderBottom: "solid 1px #ddd",
      marginBottom: "24px",
    },
  },
};

const SectionColumn = ({ classes, sections }) => {
  return (
    <Col sm={3} md={3} lg={3} className={classes.SectionColumn}>
      {sections.map(section => {
        return (
          <SectionBlock section={section} key={section.id} />
        );
      })}
    </Col>
  );
};

export default injectSheet(styles)(SectionColumn);
