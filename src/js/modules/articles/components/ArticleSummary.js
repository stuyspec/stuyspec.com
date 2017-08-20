import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ArticleFeaturedMedia from "./ArticleFeaturedMedia";
import Byline from "./Byline";
import { getMedia } from "../../media/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers } from "../../users/selectors";

const primaryStyles = {
  ArticleSummary: {
    paddingLeft: 0,
    paddingRight: "13px",
  },
  title: {
    fontFamily: 'Minion Pro',
    fontSize: '36px',
    margin: "4px 0px 2px",
  },
  titleLink: {
    color: '#000',
  },
  Byline: {
    marginBottom: "4px",
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
  },
};

const secondaryStyles = {
  ArticleSummary: {
    borderBottom: "solid 2px #ddd",
    marginBottom: "14px",
    marginRight: "13px",
    paddingLeft: 0,
    paddingRight: "13px",
  },
  title: {
    marginTop: "10px",
    marginBottom: 0,
  },
  titleLink: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  Byline: {
    marginBottom: "2px",
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
  },
};

const ternaryStyles = {
  ArticleSummary: {
    borderBottom: "solid 2px #ddd",
    marginBottom: "14px",
    marginRight: "13px",
    padding: 0,
  },
  title: {
    marginBottom: "6px",
  },
  titleLink: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  Byline: {
    marginBottom: "4px",
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    marginBottom: "14px",
  },
  figure: {
    float: 'right',
    margin: '8px 0 9px 14px',
    width: '72px',
  },
};

const stylesObject = {
  "primary": primaryStyles,
  "secondary": secondaryStyles,
  "ternary": ternaryStyles,
};

const ArticleSummary = ({ article, media, sections, users, type }) => {
  const styles = stylesObject[ type ];
  const featuredMedia = Object.values(media).find(mediaObject => {
    return mediaObject.isFeatured && mediaObject.articleId === article.id;
  });
  featuredMedia.creator = users[ featuredMedia.userId ];

  return (
    <div style={ styles.ArticleSummary }>
      { type !== "ternary" && <ArticleFeaturedMedia featuredMedia={ featuredMedia }/> }
      <h6 style={ styles.title }>
        <Link style={ styles.titleLink }
              to={ `${sections[ article.sectionId ].permalink}/${article.slug}` }>
          { article.title }
        </Link>
      </h6>
      <Byline style={ styles.Byline }
              contributors={ article.contributors }/>
      { type === "ternary" && <ArticleFeaturedMedia featuredMedia={ featuredMedia }/> }
      <p style={ styles.preview }>
        This is a preview of the article. Wow, look at that big image. It is
        HUGE. So how was your day? Did you do anything interesting. Now I need
        more words to fill up space so blah blah blah lobster!
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  media: getMedia(state),
  sections: getSections(state),
  users: getUsers(state),
});

export default connect(
  mapStateToProps
)(ArticleSummary);