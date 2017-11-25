import React, { Component } from "react";
import Slider from "react-slick";
import injectSheet from "react-jss";

const styles = {
  Page: {
    padding: "20px",
    margin: "auto",
    width: "90%",
    "& *": {
      minHeight: 0,
      minWidth: 0,
    },
  },
  Slider: {
    "& .slick-next:before, .slick-prev:before": {
      fontSize: "20px",
      color: "#00558B",
      opacity: 0.75,
    },
  },
  slideContainer: {
    "& img": {
      margin: "0 auto",
      maxHeight: "50vh",
      maxWidth: "100%",
      border: "5px solid #fff",
    },
    "& p": {
      width: "100%",
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
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className={classes.Page}>
        <div className={classes.Page}>
          <h2>Custom Paging</h2>
          <Slider
            {...settings}
            ref={c => (this.slider = c)}
            className={classes.Slider}
          >
            {media.map(image => {
              return (
                <div className={classes.slideContainer} key={image.id}>
                  <img src={image.attachmentUrl} />
                  <p>{image.title}</p>
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
      </div>
    );
  };
}
export default injectSheet(styles)(SimpleSlider);
