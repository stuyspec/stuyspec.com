import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getArticlesWithContributors } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

import { fetchArticles } from "../../articles/actions";
import { fetchMedia } from "../../media/actions";
import { fetchUsers } from "../../users/actions";

import {
  FeaturedArticle,
  SectionFeature,
} from "../../articles/components/summaries";

const styles = {
  HomePage: {
    marginTop: '23px 0px 13px',
  },
  featuredArticle: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '14px',
  },
};

const HomePage = ({ classes, articles, sections, fetched, fetchArticles, fetchUsers, fetchMedia }) => {
  const fetchAll = () => {
    fetchArticles();
    fetchUsers();
    fetchMedia();
  }
  if (fetched) {
    const articleObjects = Object.values(articles);
    const featuredArticle = articleObjects[ 0 ];
    const sectionFeature = sections[ '0' ];
    const sectionFeatureArticles = articleObjects.slice(1, 3);
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
          </Row>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={ fetchAll }>fetch all</button>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
  fetched: state.articles.isFetched && state.media.isFetched && state.articles.isFetched,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchArticles,
    fetchMedia,
    fetchUsers,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
