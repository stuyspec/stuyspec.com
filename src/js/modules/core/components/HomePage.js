import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import {
  getArticlesWithContributors,
} from "../../articles/selectors";

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
  "@media (min-width: 768px)": {
    primaryComponents: {    
      borderRight: "none",
      paddingRight: 0,
    },
  },
};

//The filler column should have a borderRight. Wait until there is something there first

const HomePage = ({ classes, sections, articles}) => {
  const sectionFeature = Object.values(sections).find(
    section => section.name === "News",
  );
  const recommendedArticles = Object.values(articles).slice(0, 5);

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
          <Col sm={12} md={9} lg={9} className={classes.primaryComponents}>
            <FeaturedArticle />
            <SectionFeature section={sectionFeature} sections={sections} />
          </Col>
          <Col xsHidden smHidden md={3} lg={3} className={classes.recommendedArticles}>
            <RecommendedArticles articles={recommendedArticles} />
          </Col>
        </Row>
        <LatestArticlesRibbon className={classes.latestArticlesRibbon}/>
        <Row>
          <LeftColumn />
          <SectionColumn sections={firstColumnSections} />
          <SectionColumn sections={secondColumnSections} />
          <RightColumn />
        </Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
