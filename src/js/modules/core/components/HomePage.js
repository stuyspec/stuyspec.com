import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import {
  getArticlesWithContributors,
  getLatestArticles,
} from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

import {
  FeaturedArticle,
  SectionFeature,
  RecommendedArticles,
  ArticleBlock,
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
};

const HomePage = ({ classes, sections, articles, latestArticles }) => {
  const articleObjects = Object.values(articles);
  const featuredArticle = articleObjects[0];
  const sectionFeature = sections["1"];
  const sectionFeatureArticles = articleObjects.slice(0, 2);
  const recommendedArticles = articleObjects.slice(0, 5);
  const topFiveLatest = Object.values(latestArticles).slice(0, 5);
  return (
    <div>
      <Grid>
        <Row>
          <Col lg={9} md={9} className={classes.featured}>
            <FeaturedArticle article={featuredArticle} />
            <SectionFeature
              section={sectionFeature}
              articles={sectionFeatureArticles}
            />
          </Col>
          <Col lg={3} md={3} className={classes.recommendedArticles}>
            <RecommendedArticles articles={recommendedArticles} />
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12} className={classes.sectionArticles}>
            {
              //in the future, this will display an article from each section
              //but right now, it is just displaying the articles in the state
            }
            {topFiveLatest.map(article => {
              return (
                <ArticleBlock
                  article={article}
                  section={sections[article.sectionId]}
                  key={article.id}
                />
              );
            })}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
  latestArticles: getLatestArticles(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
