import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getArticlesWithContributors } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers } from "../../users/selectors";
import { getMedia } from "../../media/selectors";

import { fetchArticles } from "../../articles/actions";
import { fetchMedia } from "../../media/actions";
import { fetchUsers } from "../../users/actions";
import { addRowHeight } from '../../core/actions';

import { ArticleSummary } from "../../articles/components";

const styles = {
  HomePage: {
    marginTop: "23px 0px 13px",
  },
  primaryCol: {
    paddingRight: '13px',
    borderRight: '1px solid #ddd',
  },
  secondaryCol: {
    paddingRight: '13px',
    borderRight: '1px solid #ddd',
  },
};

const HomePage = ({ classes, articles, fetched, fetchArticles, fetchUsers, fetchMedia }) => {
    if (fetched) {
      const values = Object.values(articles);
      return (
        <div>

          <Grid>
            <Row id="homepageRow">
              <Col className={ classes.primaryCol } lg={6} md={6} sm={12} xs={12}>
                <ArticleSummary type={ "primary" } article={ values[0] }/>
              </Col>
              <Col className={ classes.secondaryCol } lg={3} md={3} sm={12} xs={12}>
                <ArticleSummary type={ "secondary" } article={ values[1] }/>
                <ArticleSummary type={ "secondary" } article={ values[2] }/>
              </Col>
              <Col className={ classes.ternaryCol } lg={3} md={3} sm={12} xs={12}>
                <ArticleSummary type={ "ternary" } article={ values[3] }/>
                <ArticleSummary type={ "ternary" } article={ values[4] }/>
                <ArticleSummary type={ "ternary" } article={ values[3] }/>
                <ArticleSummary type={ "ternary" } article={ values[4] }/>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={ fetchArticles }>articles</button>
          <button onClick={ fetchUsers }>Users</button>
          <button onClick={ fetchMedia }>Media</button>
        </div>
      );
    }
  }

const mapStateToProps = (state) => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
  media: getMedia(state),
  users: getUsers(state),
  fetched: state.articles.isFetched && state.media.isFetched,
  rowHeight: state.core.rowHeight,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchArticles,
    fetchMedia,
    fetchUsers,
    addRowHeight,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
