import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getLatestArticles } from "../../selectors";

const LATEST_ARTICLES_SHOWN = 5;

const styles = {
  LatestArticlesRibbon: {
    float: "left",
    height: "59px",
    marginTop: "9px",
    marginBottom: "11px",
    overflow: "hidden",
    paddingRight: "12.5px",
    width: "20%",
    "&:not(:last-child)": {
      borderRight: "solid 1px #ddd",
    },
    "&:not(:first-child)": {
      paddingLeft: "12.5px",
    },
  },
  sectionLabel: {
    color: "#a8a8a8",
    fontFamily: "Circular Std",
    fontSize: "11px",
    fontWeight: 300,
    letterSpacing: "0.5px",
    marginBottom: "1px",
    textTransform: "uppercase",
    "&:hover": {
      color: "#a8a8a8",
      textDecoration: "none"
    },
    "&:focus": {
      color: "#a8a8a8",
      textDecoration: "none"
    },
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    lineHeight: 1.17,
    margin: 0,
    "&:active": {
      color: "#000",
    },
    "&:focus": {
      color: "#000",
    },
    "&:hover": {
      color: "#000",
    },
  },
  figure: {
    float: "left",
    margin: "3px 8px 0 0",
    width: "75px",
    "& img": {
      width: "100%",
    },
  },
};

topFiveLatest.map(article => {
  return (
    <LatestArticlesRibbon
      article={article}
      section={sections[article.sectionId]}
      key={article.id}
    />
  );
})

const LatestArticlesRibbon = ({ classes, articles, section, media }) => {
  const latestArticles = Object.values(articles).slice(0, LATEST_ARTICLES_SHOWN);
  return (
    latestArticles.map(article => {

    })
  )
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  return (
    <div className={classes.LatestArticlesRibbon}>
      {featuredMedia && (
        <div>
          <figure className={classes.figure}>
            <img src={featuredMedia.url} />
          </figure>
        </div>
      )}
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name === "Arts & Entertainment" ? "A&E" : section.name}
      </Link>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={classes.title}
      >
        {article.title}
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  media: state.media.media,
});

export default connect(mapStateToProps)(
  injectSheet(styles)(LatestArticlesRibbon),
);
