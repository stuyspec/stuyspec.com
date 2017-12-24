import React from "react";
import { connect } from "react-redux";
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
    "& t": {
      display: "inline-block",
      marginRight: "40px",
    },
    "& h4": {
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    "& h5": {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    "& h2": {
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
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
  articles,
  media,
}) => {
  const isCarouselButtonVisible =
    SPEC_IMG_CAROUSEL_PATTERN.test(content) && Object.values(media).length > 0;
  const referencedArticleId = SPEC_REFERENCE_PATTERN.test(content)
    ? parseInt(SPEC_REFERENCE_PATTERN.exec(content)[1])
    : null;
  let referencedArticle = null;
  if (referencedArticleId) {
    referencedArticle = articles.find(
      article => article.id === referencedArticleId,
    );
  }
  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
        {SPEC_IMG_CAROUSEL_PATTERN.test(content) && (
          <Lightbox title={title}>
            <Gallery media={Object.values(media)} />
          </Lightbox>
        )}
        {Object.values(media).length > 0 && (
          <ArticleFeaturedMedia
            image={Object.values(media)[0]}
            isCarouselButtonVisible={isCarouselButtonVisible}
            carouselImageCount={Object.values(media).length}
          />
        )}
        {referencedArticle && <ArticleReference article={referencedArticle} />}
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
});

export default connect(mapStateToProps)(injectSheet(styles)(ArticleBody));
