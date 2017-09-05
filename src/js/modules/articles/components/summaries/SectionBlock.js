import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getMedia } from "../../../media/selectors";

const styles = {};

const SectionBlock = ({ classes, articles, section, media }) => {
  return <div />;
};

const mapStateToProps = state => ({
  media: getMedia(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(SectionBlock));
