import React, { PureComponent } from "react";
import Slider from "react-slick";
import injectSheet from "react-jss";

import SliderFooter from "./SliderFooter";

const styles = {
  Gallery: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
    position: "relative",
    width: "90%",
    "& *": {
      // necessary for react-slick + flex
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
  slideContainer: {},
  slide: {
    alignItems: "center",
    height: "100%",
    position: "relative",
    display: "flex",
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
};

class Gallery extends PureComponent {
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
  render() {
    const { classes, media } = this.props;
    const settings = {
      customPaging: i => {
        return (
          <a key={i}>
            <img
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
      <div className={classes.Gallery}>
        <Slider
          {...settings}
          ref={c => (this.slider = c)}
          className={classes.Slider}
        >
          {media.map(image => {
            // Slide unable to be taken out of .map(); there seems to be
            // HTML classes passed down that are interrupted when the
            // following figure is substituted with a custom component.
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
        <SliderFooter
          helperText={`${this.state.index + 1} of ${this.props.media.length}`}
          nextSlide={this.nextSlide}
          prevSlide={this.prevSlide}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(Gallery);
