import React from "react";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";

import SectionBlock from "./SectionBlock";

const styles = {
  SectionColumn: {
    borderLeft: "solid 1px #ddd",
    padding: "0 0 0 7px !important",
    "& > div:not(:last-child)": {
      // targets each SectionBlock
      borderBottom: "solid 1px #ddd",
      marginBottom: "24px",
    },
  },
  "@media (max-width: 768px)": {
    SectionColumn: {
      borderLeft: "none",
      padding: "0 !important",
    },
  },
};

const SectionColumn = ({ classes, sections }) => {
  return (
    <div className={classes.SectionColumn}>
      {sections.map(section => {
        return <SectionBlock section={section} key={section.id} />;
      })}
    </div>
  );
};

export default injectSheet(styles)(SectionColumn);
