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
  },
  title: {
    fontFamily: 'Minion Pro',
    fontSize: '36px',
    margin: 0,
  },
  titleLink: {
    color: '#000',
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    marginTop: '4px',
  },
  featuredMediaContainer: {
    marginBottom: '10px',
  }
};

const secondaryStyles = {
  ArticleSummary: {
    borderBottom: "solid 1px #ddd",
    marginBottom: '14px',
    paddingBottom: '14px',
  },
  featuredMediaContainer: {
    marginBottom: '10px',
  },
  title: {
    margin: 0,
  },
  titleLink: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    margin: 0,
    marginTop: '4px',
  },
};

const ternaryStyles = {
  ArticleSummary: {
    borderBottom: "solid 1px #ddd",
    marginBottom: '14px',
    paddingBottom: "14px",
  },
  title: {
    margin: 0,
  },
  titleLink: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    fontWeight: 'bold',
  },
  Byline: {
  },
  preview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    margin: 0,
    marginTop: '2px',
  },
  featuredMediaContainer: {
    float: 'right',
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
      {
        type !== "ternary" && (
          <div style={ styles.featuredMediaContainer }>
            <ArticleFeaturedMedia featuredMedia={ featuredMedia }/>
          </div>
        )
      }
      <h6 style={ styles.title }>
        <Link style={ styles.titleLink }
              to={ `${sections[ article.sectionId ].permalink}/${article.slug}` }>
          { article.title }
        </Link>
      </h6>
      <Byline style={ styles.Byline }
              contributors={ article.contributors }/>
      <p style={ styles.preview }>
        {
          type === "ternary" && (
            <div style={ styles.featuredMediaContainer }>
              <ArticleFeaturedMedia featuredMedia={ featuredMedia }/>
            </div>
          )
        }
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