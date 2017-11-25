import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";

import { openLightbox } from "../../core/actions";
import ArticleMediaCaption from "./ArticleMediaCaption";

const styles = {
  figure: {
    margin: "0 0 28px 0",
    width: "100%",
  },
  tallFigure: {
    float: "left",
    marginTop: "9px !important",
    marginBottom: "5px",
    paddingRight: "3.5% !important",
    width: "45%",
  },
  imgContainer: {
    position: "relative",
    "& img": {
      width: "100%",
    },
    "& button": {
      bottom: "20px",
      left: "20px",
      position: "absolute",
    },
  },
  lightboxButton: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 0,
    opacity: 0.8,
    outline: "none",
    transitionDuration: ".3s",
    "&:hover": {
      opacity: 0.9,
    },
  },
  lightboxButtonContent: {
    padding: "6px 8px",
  },
  lightboxIcon: {
    width: "30px !important",
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
  componentDidMount = () => {
    const img = new Image();
    img.src = this.props.image.attachmentUrl;
    img.onload = () => {
      this.setState({
        imgHeight: img.height,
        imgWidth: img.width,
      });
    };
  };
  openLightbox = () => this.props.openLightbox();
  render = () => {
    const { classes, image, isCarouselButtonVisible } = this.props;
    const isFigureTall = this.state.imgHeight > this.state.imgWidth * 1.2;
    return (
      <figure className={isFigureTall ? classes.tallFigure : classes.figure}>
        <div className={classes.imgContainer}>
          <img className={classes.img} src={image.attachmentUrl} />
          {isCarouselButtonVisible && (
            <button
              className={classes.lightboxButton}
              onClick={this.openLightbox}
            >
              <div className={classes.lightboxButtonContent}>
                <img className={classes.lightboxIcon} src="/img/slides.svg" />
              </div>
            </button>
          )}
        </div>
        <ArticleMediaCaption image={image} />
      </figure>
    );
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openLightbox }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  injectSheet(styles)(ArticleFeaturedMedia),
);
