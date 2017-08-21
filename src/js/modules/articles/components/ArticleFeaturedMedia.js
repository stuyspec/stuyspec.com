import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { capitalizeWord } from "../../../utils";
import { MEDIA_CREATOR_SLUG } from "../../../constants";
import { getUsers } from "../../users/selectors";
import { createCreditLine } from "./CreditLine";

const styles = {
  figure: {
    margin: '0px 0px 13px 0px',
    width: '100%',
  },
  img: {
    width: '100%',
  },
  caption: {
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: '1.07',
    marginTop: '7px',
  },
  creditLine: {
    color: '#888',
  }
};

const ArticleFeaturedMedia = ({ classes, featuredMedia, users }) => {
  return (
    <figure className={ classes.figure }>
      <img className={ classes.img } src={ featuredMedia.url }/>
      <figcaption className={ classes.caption }>
        <span>{ featuredMedia.caption }&nbsp;</span>
        { createCreditLine() }
      </figcaption>
    </figure>
  );
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(ArticleFeaturedMedia));
