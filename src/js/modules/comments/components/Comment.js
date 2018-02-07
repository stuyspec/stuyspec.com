import React from "react";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import dateFormat from "dateformat";

const MILLISECONDS_IN_DAY = 8.64e7;

const styles = {
  Comment: {
    fontFamily: "Minion Pro",
    marginBottom: "18px",
  },
  commentInfo: {
    marginBottom: "2px",
  },
  userName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    color: "#000",
    fontSize: "16px",
    lineHeight: "1.5",
    margin: 0,
  },
  bulletPoint: {
    color: "#ccc",
    fontSize: "12px",
    margin: "0 4px",
    position: "relative",
  },
  publishedAt: {
    color: "#a8a8a8",
    fontSize: "16px",
    fontWeight: 300,
  },
};

/* date settings:
 * longDate: June 9, 2007
 * shortTime: 5:46 PM
 */

const Comment = ({ classes, comment }) => {
  const { user, publishedAt } = comment;
  // If the timestamp is the same day (< 24 hours difference), use the
  // shortTime format. If not, use the longDate format.
  const dateSetting =
    new Date() - new Date(publishedAt) < MILLISECONDS_IN_DAY
      ? "shortTime"
      : "longDate";
  const dateline = dateFormat(publishedAt, dateSetting);
  return (
    <Row className={classes.Comment}>
      <Col md={7} lg={7}>
        <p className={classes.commentInfo}>
          <span className={classes.userName}>
            {user.firstName} {user.lastName}
          </span>
          <span className={classes.bulletPoint}>&#8226;</span>
          <span className={classes.publishedAt}>
            Published {dateSetting === "shortTime" ? "at" : "on"} {dateline}
          </span>
        </p>
        <p className={classes.content}>{comment.content}</p>
      </Col>
      <Col md={5} lg={5} />
    </Row>
  );
};

export default injectSheet(styles)(Comment);
