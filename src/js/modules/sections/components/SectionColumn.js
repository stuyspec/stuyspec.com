import React from "react";
import injectSheet from "react-jss";
import { Col } from "react-bootstrap/lib";

import SectionBlock from "./SectionBlock";

const styles = {
  SectionColumn: {
    borderLeft: "solid 1px #ddd",
    padding: "0 0 0 14px !important",
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
      "& > div:last-child": {
        // targets last SectionBlock since all SectionColumns are stacked.
        borderBottom: "solid 1px #ddd",
        marginBottom: "24px",
      },
    },
  },
};

const SectionColumn = ({ classes, slugs }) => {
  return (
    <div className={classes.SectionColumn}>
      {slugs.map((slug, index) => {
        return <SectionBlock slug={slug} key={index} />;
      })}
    </div>
  );
};

export default injectSheet(styles)(SectionColumn);
