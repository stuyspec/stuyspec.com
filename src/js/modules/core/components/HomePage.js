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

import {openSubscriptionModal} from "../../accounts/actions";

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
};

//The filler column should have a borderRight. Wait until there is something there first

const HomePage = ({ classes, sections, articles, openSubscriptionModal}) => {
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
  return (
    <div>
      <button onClick={()=>openSubscriptionModal()}>Subscribe</button>
      <Grid>
        <Row>
          <Col lg={9} md={9} className={classes.primaryComponents}>
            <FeaturedArticle />
            <SectionFeature section={sectionFeature} sections={sections} />
          </Col>
          <Col lg={3} md={3} className={classes.recommendedArticles}>
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

/*
Just for testing the subscription modal
*/
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps,mapDispatchToProps)(injectSheet(styles)(HomePage));
