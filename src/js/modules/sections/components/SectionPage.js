import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { isObjectEmpty } from "../../../utils";
import { ArticleList } from "../../articles/components";
import { getSectionTreeArticles } from "../../articles/selectors";
import { getSections, getDirectSubsections } from "../../sections/selectors";
import { getMedia } from "../../media/selectors";
import { Byline } from "../../articles/components";
import SectionColumn from "./SectionColumn";

const styles = {
  SectionPage: {
    margin: "50px auto 0",
    width: "1066px",
  },
  subsectionBar: {
    margin: "0 0 28px 0",
    padding: 0,
    textAlign: "center",
  },
  subsectionListItem: {
    borderBottom: "solid 1px #ddd",
    display: "inline",
    textDecoration: "none",
    padding: "0 26px 10px 0",
    "&:last-child": {
      paddingRight: 0,
    },
  },
  subsectionLink: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: 300,
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  latest: {
    borderBottom: "solid 1px #ddd",
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    padding: "4px 0",
    marginBottom: "22px",
  },
  latestArticles: {
    padding: "0 13px 0 0",
    borderRight: "solid 1px #ddd",
    "& > div:last-child": { // articleBlocks
      border: "none",
      margin: 0
    }
  },
  emptySpace: {
    height: "20px",
    margin: 0,
    padding: 0,
  },
  sectionColumnContainer: {
    "& > div": {
      borderLeft: "none",
    }
  }
};

const SectionPage = ({
  classes,
  sectionTreeArticles,
  directSubsections,
  section,
  media,
}) => {
  const threeSubsections = Object.values(directSubsections).slice(0, 3);
  return (
    <div className={classes.SectionPage}>
      {isObjectEmpty(directSubsections) ? (
        <div className={classes.emptySpace} />
      ) : (
        <ul className={classes.subsectionBar}>
          {Object.values(directSubsections).map(subsection => {
            return (
              <li className={classes.subsectionListItem} key={subsection.id}>
                <Link
                  className={classes.subsectionLink}
                  to={subsection.permalink}
                >
                  {subsection.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Grid>
        <Row>
          <Col md={9} lg={9} className={classes.latestArticles}>
            <div className={classes.latest}>Latest</div>
            <ArticleList articles={sectionTreeArticles} />
          </Col>
          <div className={classes.sectionColumnContainer}>
            <SectionColumn sections={threeSubsections} />
          </div>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  sectionTreeArticles: getSectionTreeArticles(state, ownProps),
  directSubsections: getDirectSubsections(state, ownProps),
  sections: getSections(state),
  media: getMedia(state),
});

export default connect(mapStateToProps, null)(injectSheet(styles)(SectionPage));
