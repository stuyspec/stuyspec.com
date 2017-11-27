import React from "react";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import {
  SPEC_REFERENCE_PATTERN,
  SPEC_IMG_CAROUSEL_PATTERN,
} from "../../../constants";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import ArticleReference from "./ArticleReference";
import RightRail from "./RightRail";

import { Gallery } from "../../media/components";
import { Lightbox } from "../../core/components";

const styles = {
  ArticleBody: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    lineHeight: 1.44,
    padding: "0 0 18px",
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
    "& spec-reference": {
      display: "none",
    },
  },
  content: {
    marginTop: "13px",
  },
  "@media (max-width: 991px)": {
    ArticleBody: {
      "& > figure": {
        padding: "0 10%",
      },
    },
    innerHTML: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    ArticleBody: {
      "& > figure": {
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

const ArticleBody = ({
  classes,
  article: { content, title },
  media,
}) => {
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

  const isCarouselButtonVisible =
    SPEC_IMG_CAROUSEL_PATTERN.test(content) && Object.values(media).length > 0;
  const referencedArticleId = SPEC_REFERENCE_PATTERN.test(content)
    ? parseInt(SPEC_REFERENCE_PATTERN.exec(content)[1])
    : -1;
  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
        {isCarouselButtonVisible && (
          <Lightbox title={title}>
            <Gallery media={Object.values(media)} />
          </Lightbox>
        )}
        {Object.values(media).length > 0 && (
          <ArticleFeaturedMedia
            image={Object.values(media).find(media => media.isFeatured)}
            isCarouselButtonVisible={isCarouselButtonVisible}
            carouselImageCount={Object.values(media).length}
          />
        )}
        {referencedArticleId !== -1 && (
          <ArticleReference articleId={referencedArticleId} />
        )}
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

export default injectSheet(styles)(ArticleBody);
