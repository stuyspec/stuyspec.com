import React from "react";
import { graphql, ChildDataProps } from "react-apollo";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

import Byline from "./Byline";
import { TallAd } from "../../advertisements/components";

import { RIGHT_RAIL_QUERY, IRightRailData } from '../queries';

const styles = {
  RightRail: {
    marginTop: "28px",
  },
  Recommended: {
    "& div:last-child": {
      borderBottom: 0,
    },
  },
  label: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    color: "#000",
    display: "block",
    fontFamily: "Comic Sans MS",
    fontSize: "13px",
    fontWeight: 300,
    margin: "0 0 12px 0",
    padding: "4px 0",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  article: {
    borderBottom: "solid 1px #ddd",
    paddingBottom: "9px",
    marginBottom: "7px",
  },
  bigTitle: {
    color: "#000",
    fontFamily: "Comic Sans MS",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.22",
    marginBottom: "7px",
  },
  smallTitle: {
    color: "#000",
    fontFamily: "Comic Sans MS",
    fontSize: "15px",
    lineHeight: "1.25",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Comic Sans MS",
    fontSize: "12px",
    marginBottom: "6px",
    textTransform: "uppercase",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  figure: {
    float: "right",
    height: "62px",
    marginLeft: "5px",
    overflow: "hidden",
    width: "62px",
    "& img": {
      width: "100%",
    },
  },
  Byline: {
    color: "#888",
    fontFamily: "Comic Sans MS",
    fontSize: "12px",
    fontWeight: 300,
    marginBottom: "3px",
    "& p": {
      margin: "0",
      display: "inline",
      "& a": {
        color: "#888",
        "&:hover": {
          color: "#888",
        },
      },
    },
  },
  Dateline: {
    color: "#888",
    fontFamily: "Comic Sans MS",
    fontSize: "12px",
    fontWeight: 300,
    margin: 0,
    "& p": {
      color: "#000",
      margin: 0,
      display: "inline",
    },
  },
  tallAdContainer: {
    marginTop: "100px",
  },
  "@media (max-width: 991px)": {
    RightRail: {
      paddingLeft: "1.5vw",
    },
  },
};

type IProps = ChildDataProps<{classes: any}, IRightRailData>

// inside a Col
const RightRail: React.FunctionComponent<IProps> = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }

  const articles = data.topRankedArticles || [];
  return (
    <div className={classes.RightRail}>
      <div className={classes.Recommended}>
        <Link to="/recommended" className={classes.label}>
          Recommended
        </Link>
        {articles.map(article => {
          if(!article) {
            return undefined;
          }
          const { section } = article;
          return (
            <div className={classes.article} key={article.id}>
              {article.media && article.media.length > 0 && (
                <Link to={`${section.permalink}/${article.slug}`}>
                  <figure className={classes.figure}>
                      <img src={article.media[0].thumb_attachment_url} 
                           alt={article.media[0].title}/>
                  </figure>
                </Link>
              )}
              <Link
                to={`${section.permalink}/${article.slug}`}
                className={classes.smallTitle}
              >
                {article.title}
              </Link>
              <Byline classes={classes} contributors={article.contributors} />
            </div>
          );
        })}
      </div>
      <div className={classes.tallAdContainer}>
        <TallAd />
      </div>
    </div>
  );
};

const withRightRail = graphql<{}, IRightRailData, {}>(RIGHT_RAIL_QUERY);

export default withRightRail(injectSheet(styles)(RightRail));
