import React, { PureComponent } from "react";
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
    width: "55%",
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
  carouselButton: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    opacity: 0.8,
    outline: "none",
    padding: "8px 11px",
    transitionDuration: ".3s",
    "&:hover": {
      opacity: 0.9,
    },
  },
  slidesIcon: {
    width: "23px !important",
  },
  carouselImageCount: {
    fontFamily: "Circular Std",
    fontSize: "17px",
    marginLeft: "12px",
  },
  "@media (max-width: 767px)": {
    tallFigure: {
      "& > div > img": {
        marginLeft: "0 !important",
        width: "100% !important",
      },
    },
  },
};

const initialState = {
  isImageTall: false,
};

class ArticleFeaturedMedia extends PureComponent<any, typeof initialState> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const img = new Image();
    img.src = this.props.image.thumb_attachment_url;
    img.onload = () =>
      this.setState({ isImageTall: img.height > img.width * 1.3 });
  }

  render() {
    const {
      classes,
      image,
      isCarouselButtonVisible,
      carouselImageCount,
      openLightbox,
    } = this.props;
    const { isImageTall } = this.state;

    return (
      <figure className={isImageTall ? classes.tallFigure : classes.figure}>
        <div className={classes.imgContainer}>
          <img className={classes.img} src={image.attachment_url} />
          {isCarouselButtonVisible && (
            <button className={classes.carouselButton} onClick={openLightbox}>
              <img className={classes.slidesIcon} src="/client-app/img/slides.svg" />
              <span className={classes.carouselImageCount}>
                {carouselImageCount}
              </span>
            </button>
          )}
        </div>
        <ArticleMediaCaption image={image} />
      </figure>
    );
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return bindActionCreators({ openLightbox }, dispatch);
};

export default connect(null, mapDispatchToProps)(
  injectSheet(styles)(ArticleFeaturedMedia),
);
