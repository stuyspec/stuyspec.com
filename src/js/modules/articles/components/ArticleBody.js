import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { SPEC_REEFER_PATTERN, SPEC_IMG_CAROUSEL_PATTERN } from "../../../constants";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import RightRail from "./RightRail";

import SimpleSlider from "./SimpleSlider";
import { Lightbox } from "../../core/components";
import { openLightbox } from "../../core/actions";


const styles = {
  ArticleBody: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    lineHeight: 1.44,
    padding: "0 0 18px",
    "& figure:first-child figcaption": {
      lineHeight: 1.3,
    },
    "& p": {
      marginBottom: "20px",
    },
    "& p:first-child": {
      marginTop: "8px",
    },
    "& > div > p::first-letter": {
      // dropcap
      float: "left",
      fontSize: "58px",
      lineHeight: "43px",
      padding: "7px 6px 0px 3px",
    },
    "& > div > p ~ p::first-letter": {
      float: "none",
      fontSize: "18px",
      lineHeight: 1.44,
      padding: 0,
    },
    "& span#article-reefer": {
      display: "block",
      fontStyle: "italic",
      marginTop: "12px",
      marginBottom: "24px",
      "& a#reefer-link": {
        color: "#000",
        textDecoration: "underline",
        "&:hover": {
          color: "#000",
        },
        "&:active": {
          color: "#000",
        },
        "&:focus": {
          color: "#000",
        },
      },
    },
    "& spec-reefer": {
      // the original reefer
      display: "none",
    },
  },
  featuredMediaContainer: {
    "& figure": {
      marginBottom: "28px",
    },
  },
  content: {
    marginTop: "13px",
  },
  lightboxButton: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 0,
    outline: "none",
    transitionDuration: ".3s",
    "&:hover": {
      backgroundColor: "#ccc",
    }
  },
  lightboxButtonContent: {
    padding: "6px 8px",
  },
  lightboxIcon: {
    width: "30px !important",
  },
  "@media (max-width: 991px)": {
    featuredMediaContainer: {
      "& figure:first-child": {
        // featured media
        padding: "0 10%",
      },
    },
    innerHTML: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    featuredMediaContainer: {
      "& figure:first-child": {
        padding: "0 2%",
        "& > div > img": {
          marginLeft: "-14px", // ArticleBody.paddingLeft = 14px
          width: "100vw",
        },
      },
    },
    innerHTML: {
      padding: "0 2%",
    },
  },
};

const ArticleBody = ({ classes, articles, article: {content, title}, sections, media, openLightbox }) => {
  /*
  const generateFigure = (match, string, offset) => {
    const image = media[parseInt(string)];
    if (image) {
      return `<figure>
          <img src={image.attachmentUrl} alt={image.title}/>
          <figcaption>{image.caption}</figcaption>
        </figure>`;
    } else {
      return `<figure>
          <img src={`mediaId:${string}`} alt={Media not found.}/>
        </figure>`;
    }
  };
  // overlap of first spec-img afind = 0; and regular figure and artifletaeuerdmedia
  specImgPattern = /<spec-img id=(\d)><\/spec-img>/;
  while (specImgPattern.test(content)) {
    content = content.replace(specImgPattern, generateFigure);
  }
  */
  //  featuredMedia = Object.values(articleMedia).find(image => image.isFeatured);
  const generateArticleReefer = content => {
    const match = SPEC_REEFER_PATTERN.exec(content);
    const reeferArticle = articles[parseInt(match[1])];
    if (reeferArticle) {
      const title = reeferArticle.title.replace("“", "‘").replace("”", "’");
      return (
        <span id="article-reefer">
          This article was written in response to &ldquo;
          <Link
            id="reefer-link"
            target="_blank"
            to={`${sections[reeferArticle.sectionId].permalink}/${reeferArticle.slug}`}
          >
            {title}
          </Link>
          ,&rdquo; published in Volume {reeferArticle.volume} Issue {reeferArticle.issue}.
        </span>
      );
    }
  };
  const featuredMedia = media.find(medium => medium.isFeatured);
  const displayImgCarousel = SPEC_IMG_CAROUSEL_PATTERN.test(content);
  const firstImage = Object.values(media)[0];
  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
        {displayImgCarousel ? (
          Object.values(media).length > 0 && (
            <div>
              <Lightbox title={title}>
                <SimpleSlider media={Object.values(media)}/>
              </Lightbox>
              <div className={classes.featuredMediaContainer}>
                <ArticleFeaturedMedia featuredMedia={firstImage}>
                  <button 
                    key="carouselButton" 
                    className={classes.lightboxButton} 
                    onClick={openLightbox}
                  >
                    <div className={classes.lightboxButtonContent}>
                      <img className={classes.lightboxIcon} src="/img/slides.svg"/>
                    </div>
                  </button>
                  <i>{/* with multiple children of ArticleFeaturedMedia, it can conduct a chidlren.find*/}</i>
                </ArticleFeaturedMedia>
              </div>
            </div>
          )
        ) : (
          featuredMedia && (
            <div className={classes.featuredMediaContainer}>
              <ArticleFeaturedMedia
                featuredMedia={featuredMedia}
              />
            </div>
          )
        )}
        {SPEC_REEFER_PATTERN.test(content) && generateArticleReefer(content)}
        <div
          className={classes.innerHTML}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Col>
      <Col xsHidden smHidden mdOffset={1} md={3} lgOffset={1} lg={3}>
        <RightRail />
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  sections: state.sections.sections,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openLightbox }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(ArticleBody));
