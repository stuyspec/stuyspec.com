import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import {
  getArticlesWithContributors,
  getLatestArticles,
} from "../../articles/selectors";
import { getSections, getColumnSections } from "../../sections/selectors";

import {
  FeaturedArticle,
  SectionFeature,
  RecommendedArticles,
  LatestArticleBlock,
  ArticleBlocks,
  SectionColumn,
} from "../../articles/components/summaries";

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

const HomePage = ({
  classes,
  sections,
  articles,
  latestArticles,
  columnSections,
}) => {
  const articleObjects = Object.values(articles);
  const featuredArticle = articleObjects[0];
  const sectionFeature = sections["1"];
  const recommendedArticles = articleObjects.slice(0, 5);
  const topFiveLatest = Object.values(latestArticles).slice(0, 5);
  const randomArticles = articleObjects.slice(3, 9);
  const firstColumn = columnSections.slice(0, 3);
  const secondColumn = columnSections.slice(3, 6);
  return (
    <div>
      <Grid>
        <Row>
          <Col lg={9} md={9} className={classes.featured}>
            <FeaturedArticle article={featuredArticle} />
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
          <Col md={3} lg={3} className={classes.filler} />
          <SectionColumn sections={firstColumn} />
          <SectionColumn sections={secondColumn} />
          <Col md={3} lg={3} />
        </Row>
        <ArticleBlocks articles={randomArticles} sections={sections} />
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
  latestArticles: getLatestArticles(state),
  columnSections: getColumnSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
