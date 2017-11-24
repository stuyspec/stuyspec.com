import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { SPEC_REEFER_PATTERN } from "../../../constants";

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

const ArticleBody = ({ classes, articles, sections, content, media }) => {
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
    const article = articles[parseInt(match[1])];
    console.log(article.title)
    if (article) {
      const title = article.title.replace('“', '‘').replace('”', '’');
      return (
        <span id="article-reefer">
          This article was written in response to &ldquo;
          <Link
            id="reefer-link"
            target="_blank"
            to={`${sections[article.sectionId].permalink}/${article.slug}`}
          >
            {title}
          </Link>
          ,&rdquo; published in Volume {article.volume} Issue{" "}
          {article.issue}.
        </span>
      );
    }
  };
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

export default connect(mapStateToProps)(injectSheet(styles)(ArticleBody));
