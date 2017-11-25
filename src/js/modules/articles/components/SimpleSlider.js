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
      opacity: .75,
    },
  },
  slideContainer: {
    "& img": {
      margin: "0 auto",
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
    "-webkit-box-align": "center",
    "-ms-flex-align": "center",
    alignItems: "center",
    display: "flex",
    display: "-webkit-box",
    display: "-ms-flexbox",
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
    alignSelf: "flex-end",
    marginTop: 0,
    minWidth: "65px",
    position: "static",
    textAlign: "right",
    "-webkit-transform": "none",
    "-ms-transform": "none",
    transform: "none",
  }
};

const img = 'https://media.newyorker.com/photos/59096a581c7a8e33fb38ddf5/master/w_1926,c_limit/Fairfield_Bathtub.RGB.LoRes-thumb-300x236-15963.jpg';
class SimpleSlider extends Component {
  constructor(props) {
    super(props);
  }
  nextSlide = () => {
    this.slider.slickNext();
  }
  prevSlide = () => {
    this.slider.slickPrev();
  }
  render = () => {
    const { classes, media } = this.props;
    const settings = {
      customPaging: i => {
        return <a><img key={i} className={classes.thumbnailImage} src={media[i].thumbAttachmentUrl}/></a>;
      },
      arrows: false,
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className={classes.Page}>
      <div className={classes.Page}>
        <h2>Custom Paging</h2>
        <Slider {...settings} ref={c => this.slider = c } className={classes.Slider}>
        {media.map(image => {
          return (
            <div className={classes.slideContainer} key={image.id}>
              <img src={image.attachmentUrl}/>
              <p>{image.title}</p>
            </div>
          );
        })}
        </Slider>
        <div className={classes.sliderFooter}>
          <button className='button' onClick={this.prevSlide}>Previous</button>
          <button className='button' onClick={this.nextSlide}>Next</button>
        </div>

      </div></div>
    )
  }
}
export default injectSheet(styles)(SimpleSlider);