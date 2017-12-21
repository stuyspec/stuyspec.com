import React, { Component } from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

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

class HomePage extends Component {
  render() {
    const { classes, sections, articles, media } = this.props;
    const newsSection = Object.values(sections).find(
      section => section.name === "News",
    );
    const featuredArticle = articles.find(
      article =>
        sections[article.sectionId]["name"] !== "News" &&
        Object.values(media).find(
          media => media.articleId === article.id && media.isFeatured,
        ),
    );
    /* A HARDCODED ARTICLE */
    // const featuredArticle = articles.find(article => article.id === 253);
    let recommendedArticles = [];
    for (article of articles) {
      if (recommendedArticles.length >= 5) {
        break;
      }
      if (article !== featuredArticle && article.sectionId !== newsSection.id) {
        recommendedArticles.push(article);
      }
    }
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
              <RecommendedArticles recommendedArticles={recommendedArticles} />
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
  }
}

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  media: state.media.media,
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
