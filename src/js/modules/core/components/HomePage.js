import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getArticlesWithContributors } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

import {
  FeaturedArticle,
  SectionFeature,
  RecommendedArticles,
} from "../../articles/components/summaries";

const styles = {
  HomePage: {
    marginTop: '23px 0px 13px',
  },
};

const HomePage = ({ classes, sections, articles }) => {
    const articleObjects = Object.values(articles);
    const featuredArticle = articleObjects[ 0 ];
    const sectionFeature = sections[ '0' ];
    const sectionFeatureArticles = articleObjects.slice(0, 2);
    const recommendedArticles = articleObjects.slice(0, 5);
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={ 9 } md={ 9 }>
              <FeaturedArticle className={ classes.featuredArticle }
                               article={ featuredArticle }/>
              <SectionFeature className={ classes.sectionFeature }
                              section={ sectionFeature }
                              articles={ sectionFeatureArticles }/>
            </Col>
            <Col lg={ 3 } md={ 3 }>
              <RecommendedArticles articles={ recommendedArticles }/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
};

const mapStateToProps = state => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
