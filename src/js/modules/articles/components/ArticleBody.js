import React from "react";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import RightRail from "./RightRail";

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
      marginTop: "28px",
    },
    "& p:first-child::first-letter": {
      // dropcap
      float: "left",
      fontSize: "58px",
      lineHeight: "43px",
      padding: "7px 6px 0px 3px",
    },
  },
  content: {
    marginTop: "13px",
  },
  "@media (max-width: 991px)": {
    ArticleBody: {
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
    ArticleBody: {
      "& figure:first-child": {
        padding: "0 2%",
        "& img": {
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

const ArticleBody = ({ classes, content, media }) => {
  /*
  const generateFigure = (match, string, offset) => {
    const image = media[parseInt(string)];
    return (
      <figure>
        <img src={image.attachmentUrl} alt={image.title}/>
        <figcaption>{image.caption}</figcaption>
      </figure>
    );
  };
  // overlap of first spec-img afind = 0; and regular figure and artifletaeuerdmedia
  specImgPattern = /<spec-img id=(\d)\/>/;
  while (specImgPattern.test(content)) {
    content = content.replace(specImgPattern, generateFigure);
  }
  */
  //  featuredMedia = Object.values(articleMedia).find(image => image.isFeatured);
  const featuredMedia = media.find(medium => medium.isFeatured);
  return (
    <Row>
      <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
        {featuredMedia && (
          <ArticleFeaturedMedia
            featuredMedia={featuredMedia}
            isCaption={true}
          />
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
