import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { isObjectEmpty, capitalizeWord } from "../../../utils";
import { MEDIA_CREATOR_SLUGS } from "../../../constants";
import { ArticleList } from "../../articles/components";
import { getSectionTreeArticles } from "../../articles/selectors";
import { getDirectSubsections } from "../../sections/selectors";
import SectionColumn from "./SectionColumn";
import LatestArticlesRibbon from "../../articles/components/summaries/LatestArticlesRibbon";
import { Dateline, Byline } from "../../articles/components/index";

const styles = {
  SectionPage: {
    "& a": {
      color: "#000",
      "&:hover": {color: "#000"},
      "&:active": {color: "#000"},
      "&:focus": {color: "#000"},
    },
  },
  subsectionBar: {
    margin: "0 0 28px 0",
    padding: 0,
    textAlign: "center",
  },
  featuredMedia: {
    "& figure": {
      margin: "0",
      width: "100%",
      "& img": {
        width: "100%",
      },
    },
  },
  featuredArticle: {
    marginLeft: "55px",
    paddingTop: "35px",
    textAlign: "center",
    width: "325px",
  },
  featuredArticleSection: {
    display: "block",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: 300,
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  featuredArticleTitle: {
    display: "block",
    fontFamily: "Canela",
    fontSize: "40px",
    fontWeight: 300,
    lineHeight: "48px",
    marginBottom: "13px",
  },
  featuredArticleSummary: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: 1.25,
    marginBottom: "18px",
  },


  latestArticleRibbon: {

  },
  subsectionListItem: {
    borderBottom: "solid 1px #ddd",
    display: "inline",
    textDecoration: "none",
    padding: "0 26px 10px 0",
    "&:last-child": {
      paddingRight: 0,
    },
  },
  subsectionLink: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "12px",
    fontWeight: 300,
    "&:hover": {
      color: "#000",
      textDecoration: "none",
    },
    "&:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  latest: {
    borderBottom: "solid 1px #ddd",
    borderTop: "solid 1px #000",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    padding: "4px 0",
    marginBottom: "22px",
  },
  latestArticles: {
    padding: "0 13px 0 0",
    borderRight: "solid 1px #ddd",
    "& > div:last-child": {
      // articleBlocks
      border: "none",
      margin: 0,
    },
  },
  emptySpace: {
    height: "20px",
    margin: 0,
    padding: 0,
  },
  sectionColumnContainer: {
    "& > div": {
      borderLeft: "none",
    },
  },
  "@media (min-width: 992px)": {
    SectionPage: {
      marginTop: "46px",
    },
  },
  "@media (max-width: 991px)": {
    SectionPage: {
      marginTop: "-16px", // counters PageContainer.marginTop = 60px
    },
    featuredArticle: {
      marginLeft: 0,
      paddingTop: "3vw",
      width: "41.666666%", // col-sm-5
    },
    featuredArticleTitle: {
      fontSize: "4vw",
      lineHeight: "4.4vw",
    },
    featuredArticleSummary: {
      margin: "0 auto 18px auto",
      width: "80%",
    },
  },
  "@media (max-width: 768px)": {
    latestArticles: {
      borderRight: "none",
      paddingRight: 0,
    },
  },
};

const SectionPage = ({
  classes,
  sectionTreeArticles,
  directSubsections,
  section,
  users,
  media,
}) => {
  let featuredMedia = null;
  const featuredArticle = Object.values(sectionTreeArticles).find(article => {
    const mediaObject = Object.values(media).find(
      mediaObject =>
        mediaObject.articleId === article.id
    );
    if (mediaObject) {
      featuredMedia = mediaObject;
    }
    return mediaObject;
  });
  let featuredArticleSection = Object.values(directSubsections).find(subsection => subsection.articleId === featuredArticle.id);
  if (!featuredArticleSection) {
    featuredArticleSection = section;
  }
  const featuredMediaArtist = Object.values(users).find(user => featuredMedia.userId === user.id);
  return (
    <Grid fluid className={classes.SectionPage}>
      {isObjectEmpty(directSubsections) ? (
        <div className={classes.emptySpace} />
      ) : (
        <ul className={classes.subsectionBar}>
          {Object.values(directSubsections).map(subsection => {
            return (
              <li className={classes.subsectionListItem} key={subsection.id}>
                <Link
                  className={classes.subsectionLink}
                  to={subsection.permalink}
                >
                  {subsection.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Row>
        <Col xs={12} sm={7} md={7} lg={7} className={classes.featuredMedia}>
          <figure className={classes.figure}>
            <img className={classes.img} src={featuredMedia.url} />
          </figure>
        </Col>
        <Col xs={12} sm={5} md={5} lg={5} className={classes.featuredArticle}>
          <Link className={classes.featuredArticleSection}
                to={featuredArticleSection.permalink}>
            {featuredArticleSection.name === "Arts & Entertainment" ? "A&E" : featuredArticleSection.name}
          </Link>
          <Link className={classes.featuredArticleTitle}
                to={`${featuredArticleSection.permalink}/${featuredArticle.slug}`}>
            {featuredArticle.title}
          </Link>
          <p className={classes.featuredArticleSummary}>
            {featuredArticle.summary}
          </p>
          <Byline contributors={featuredArticle.contributors} />
          <Dateline article={featuredArticle}/>
        </Col>
      </Row>
      <Row>
        <Col xsHidden sm={12} md={12} lg={12}>
          <LatestArticlesRibbon className={classes.latestArticlesRibbon} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={9} md={9} lg={9} className={classes.latestArticles}>
          <div className={classes.latest}>Latest</div>
          <ArticleList articles={sectionTreeArticles} />
        </Col>
        <Col xsHidden sm={3} md={3} lg={3}>
          <div className={classes.sectionColumnContainer}>
            <SectionColumn sections={Object.values(directSubsections)} />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  sectionTreeArticles: getSectionTreeArticles(state, ownProps),
  directSubsections: getDirectSubsections(state, ownProps),
  sections: state.sections.sections,
  media: state.media.media,
  users: state.users.users,
});

export default connect(mapStateToProps, null)(injectSheet(styles)(SectionPage));
