import React, { Component } from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import { MEDIA_CREATOR_SLUGS } from "../../../constants";
import { capitalizeWord } from "../../../utils";

const styles = {
  figure: {
    margin: 0,
    width: "100%",
  },
  tallFigure: {
    float: "left",
    marginTop: "28px !important",
    marginBottom: "8px",
    paddingRight: "3.5% !important",
    width: "45%",
  },
  img: {
    width: "100%",
  },
  caption: {
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.07",
    marginTop: "7px",
  },
  creditLine: {
    color: "#888",
  },
  "@media (max-width: 767px)": {
    tallFigure: {
      "& img": {
        marginLeft: "0 !important",
        width: "100% !important",
      },
    },
  },
};

class ArticleFeaturedMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: 0,
      imgWidth: 0,
    };
  }
  componentDidMount() {
    const img = new Image();
    img.src = this.props.featuredMedia.attachmentUrl;
    img.onload = () => {
      this.setState({
        imgHeight: img.height,
        imgWidth: img.width,
      });
    };
  }
  render() {
    const { classes, featuredMedia, isCaption, users } = this.props;
    const creator = users[featuredMedia.userId];

    return (
      <figure
        className={
          this.state.imgHeight > this.state.imgWidth * 1.2 ? (
            classes.tallFigure
          ) : (
            classes.figure
          )
        }
      >
        <img className={classes.img} src={featuredMedia.attachmentUrl} />
        {isCaption &&
        creator && (
          <figcaption className={classes.caption}>
            <span>
              {featuredMedia.caption}
              {featuredMedia.caption !== "" && "&nbsp;"}
            </span>
            <Link
              className={classes.creditLine}
              to={`/${MEDIA_CREATOR_SLUGS[
                featuredMedia.mediaType
              ]}/${creator.slug}`}
            >
              {capitalizeWord(featuredMedia.mediaType)}
              &nbsp;by&nbsp;
              {creator.firstName}
              {creator.lastName !== "" && " " + creator.lastName}
            </Link>
            .
          </figcaption>
        )}
      </figure>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(
  injectSheet(styles)(ArticleFeaturedMedia),
);
