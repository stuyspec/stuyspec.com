import React, { Component } from "react";
import Slider from "react-slick";
import injectSheet from "react-jss";

const styles = {
  SimpleSlider: {
    height: "100%",
    width: "90%",
    "-webkit-box-pack": "end",
    "-ms-flex-pack": "end",
    position: "relative",
    display: "flex",
    "-webkit-box-orient": "vertical",
    "-webkit-box-direction": "normal",
    "-ms-flex-direction": "column",
    flexDirection: "column",
    justifyContent: "space-around",
    "& *": {
      minHeight: 0,
      minWidth: 0,
    },
  },
  Slider: {
    // height: "100%",
    // "& .slick-list": {
    //   height: "100%",
    //   "& .slick-track": {
    //     height: "100%",
    //   },
    // },
    "& .slick-next:before, .slick-prev:before": {
      fontSize: "20px",
      color: "#00558B",
      opacity: 0.75,
    },
  },
  slideContainer: {},
  slide: {
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    height: "100%",
    "-webkit-box-pack": "end",
    "-ms-flex-pack": "end",
    position: "relative",
    display: "flex",
    "-webkit-box-orient": "vertical",
    "-webkit-box-direction": "normal",
    "-ms-flex-direction": "column",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: 0,
    "& img": {      
      margin: "0 auto",
      maxHeight: "50vh",
      maxWidth: "100%",
    },
  },
  slideCaption: {
    alignSelf: "flex-start",
    width: "100%",
    "& p": {
      color: "#fff",
      marginTop: "10px",
      width: "100%",
      fontFamily: "Minion Pro",
      fontStyle: "italic",
      fontSize: "17px",
      textAlign: "center",
    },
  },
  thumbnailImage: {
    height: "100%",
    width: "100%",
  },
  sliderFooter: {
    display: "-webkit-box",
    display: "-ms-flexbox",
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    display: "flex",
    "-webkit-box-orient": "horizontal",
    "-webkit-box-direction": "normal",
    "-ms-flex-direction": "row",
    flexDirection: "row",
    "-webkit-box-pack": "end",
    "-ms-flex-pack": "end",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  index: {
    color: "#ddd",
    fontFamily: "Circular Std",
  },
  carouselControls: {
    "-webkit-box-align": "end",
    "-ms-flex-align": "end",
    "align-items": "flex-end",
    display: "-webkit-box",
    display: "-ms-flexbox",
    display: "flex",
  },
  controlButton: {
    background: "#333",
    height: "48px",
    outline: "none",
    marginLeft: "10px",
    position: "relative",
    width: "48px",
    color: "#bbb",
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: 1,
    border: 0,
    borderRadius: "2px",
    padding: "15px",
    verticalAlign: "middle",
  },
};

const img =
  "https://media.newyorker.com/photos/59096a581c7a8e33fb38ddf5/master/w_1926,c_limit/Fairfield_Bathtub.RGB.LoRes-thumb-300x236-15963.jpg";
class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  nextSlide = () => {
    this.slider.slickNext();
  };
  prevSlide = () => {
    this.slider.slickPrev();
  };
  render = () => {
    const { classes, media } = this.props;
    const settings = {
      customPaging: i => {
        return (
          <a>
            <img
              key={i}
              className={classes.thumbnailImage}
              src={media[i].thumbAttachmentUrl}
            />
          </a>
        );
      },
      afterChange: currentSlideIndex =>
        this.setState({ index: currentSlideIndex }),
      arrows: false,
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className={classes.SimpleSlider}>
        <Slider
          {...settings}
          ref={c => (this.slider = c)}
          className={classes.Slider}
        >
          {media.map(image => {
            return (
              <div className={classes.slideContainer} key={image.id}>
                <figure className={classes.slide}>
                  <img src={image.attachmentUrl} />
                  <figcaption className={classes.slideCaption}>
                    <p>{image.title}</p>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </Slider>
        <div className={classes.sliderFooter}>
          <div className={classes.index}>
            <p>
              {this.state.index + 1} of {this.props.media.length}
            </p>
          </div>
          <div className={classes.carouselControls}>
            <button
              className={classes.controlButton}
              onClick={this.prevSlide}
            >
              &lt;
            </button>
            <button
              className={classes.controlButton}
              onClick={this.nextSlide}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    );
  };
}
export default injectSheet(styles)(SimpleSlider);
