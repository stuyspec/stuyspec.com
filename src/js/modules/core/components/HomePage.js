import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Link } from "react-router-dom";

import { getArticlesWithContributors } from "../../articles/selectors";

import {
  FeaturedArticle,
  RecommendedArticles,
  LatestArticlesRibbon,
  LeftColumn,
  RightColumn,
} from "../../articles/components/summaries";

import { SectionFeature, SectionColumn } from "../../sections/components";

const styles = {
  HomePage: {
    marginTop: "23px 0px 13px",
  },
  recommendedArticles: {
    padding: 0,
  },
  primaryComponents: {
    borderRight: "solid 1px #ddd",
    marginBottom: "19px",
    paddingRight: "14px",
  },
  "@media (max-width: 991px)": {
    primaryComponents: {
      borderRight: "none",
      paddingRight: 0,
    },
  },
  "@media (max-width: 768px)": {
    skinnyCol: {
      padding: "0 !important",
    },
  },
};

//The filler column should have a borderRight. Wait until there is something there first

const HomePage = ({ classes, sections, articles, media }) => {
  const newsSection = Object.values(sections).find(
    section => section.name === "News",
  );
  const recommendedArticles = Object.values(articles).slice(0, 5);
  const featuredArticle = Object.values(articles).find(
    article =>
      sections[article.sectionId]["name"] != "News" &&
      Object.values(media).find(
        media => media.articleId === article.id && media.isFeatured,
      ),
  );
  const firstColumnSections = [
    "Opinions",
    "Features",
    "Humor",
  ].map(sectionName =>
    Object.values(sections).find(section => section.name === sectionName),
  );
  const secondColumnSections = [
    "Staff Editorials",
    "Arts & Entertainment",
    "Sports",
  ].map(sectionName =>
    Object.values(sections).find(section => section.name === sectionName),
  );
  // TODO: big components should be moved out of Col's and have their own
  return (
    <div>
      <Grid fluid>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={9}
            lg={9}
            className={classes.primaryComponents}
          >
            <FeaturedArticle article={featuredArticle} />
            <SectionFeature section={newsSection} />
          </Col>
          <Col
            xsHidden
            smHidden
            md={3}
            lg={3}
            className={classes.recommendedArticles}
          >
            <RecommendedArticles indexFrom={1} />
          </Col>
        </Row>
        <Row>
          <Col xsHidden sm={12} md={12} lg={12}>
            <LatestArticlesRibbon className={classes.latestArticlesRibbon} />
          </Col>
        </Row>
        <Row>
          <LeftColumn />
          <Col xs={12} sm={3} md={3} lg={3} className={classes.skinnyCol}>
            <SectionColumn sections={firstColumnSections} />
          </Col>
          <Col xs={12} sm={3} md={3} lg={3} className={classes.skinnyCol}>
            <SectionColumn sections={secondColumnSections} />
          </Col>
          <RightColumn />
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
