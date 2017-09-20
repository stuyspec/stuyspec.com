import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import {
  getArticlesWithContributors,
  getLatestArticles,
} from "../../articles/selectors";

import {
  FeaturedArticle,
  RecommendedArticles,
  LatestArticleBlock,
  LeftColumn,
} from "../../articles/components/summaries";

import { SectionFeature, SectionColumn } from "../../sections/components";

const styles = {
  HomePage: {
    marginTop: "23px 0px 13px",
  },
  sectionArticles: {
    borderTop: "solid 1px #ddd",
    borderBottom: "solid 1px #ddd",
    padding: 0,
  },
  recommendedArticles: {
    padding: 0,
  },
  featured: {
    borderRight: "solid 1px #ddd",
    marginBottom: "19px",
    paddingRight: "14px",
  },
  filler: {},
  recentArticles: {
    marginBottom: "22px",
  },
};

//The filler column should have a borderRight. Wait until there is something there first

const HomePage = ({ classes, sections, articles, latestArticles }) => {
  const sectionFeature = Object.values(sections).find(
    section => section.name === "News",
  );
  const recommendedArticles = Object.values(articles).slice(0, 5);
  const topFiveLatest = Object.values(latestArticles).slice(0, 5);

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
      <Grid>
        <Row>
          <Col lg={9} md={9} className={classes.featured}>
            <FeaturedArticle />
            <SectionFeature section={sectionFeature} sections={sections} />
          </Col>
          <Col lg={3} md={3} className={classes.recommendedArticles}>
            <RecommendedArticles articles={recommendedArticles} />
          </Col>
        </Row>
        <Row className={classes.recentArticles}>
          <Col md={12} lg={12} className={classes.sectionArticles}>
            {
              //TODO: move the mapping to inside LatestArticleBlock
              //in the future, this will display an article from each section
              //but right now, it is just displaying the articles in the state
            }
            {topFiveLatest.map(article => {
              return (
                <LatestArticleBlock
                  article={article}
                  section={sections[article.sectionId]}
                  key={article.id}
                />
              );
            })}
          </Col>
        </Row>
        <Row>
          <LeftColumn />
          <SectionColumn sections={firstColumnSections} />
          <SectionColumn sections={secondColumnSections} />
          <Col md={3} lg={3} />
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  sections: state.sections.sections,
  latestArticles: getLatestArticles(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
