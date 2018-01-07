import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import {
  SPEC_IMG_CAROUSEL_PATTERN,
} from "../../../constants";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import ArticleReference from "./ArticleReference";
import RightRail from "./RightRail";

import { Gallery } from "../../media/components";
import { Lightbox } from "../../core/components";

const ReferencedArticleQuery = gql`
  query ReferencedArticleQuery($article_id: ID!) {
    articleByID(id: $article_id) {
      title
      volume
      issue
      slug
      section {
        permalink
      }
    }
  }
`;

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
      fontSize: "18px",
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

const ArticleBody = ({ classes, data, article: { content, title } }) => {
  const isCarouselButtonVisible =
    SPEC_IMG_CAROUSEL_PATTERN.test(content) && Object.values(media).length > 0;

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
        {!data.loading && !data.error && <ArticleReference article={data.articleByID} />}
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


export default graphql(ReferencedArticleQuery, {
  // skip this query if no referencedArticleId was found in article content
  skip: ({ referencedArticleId }) => !referencedArticleId,
  options: ({ referencedArticleId }) => ({
    variables: { article_id: referencedArticleId },
  }),
})(injectSheet(styles)(ArticleBody));
