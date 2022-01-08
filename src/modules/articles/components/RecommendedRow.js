/* Row of recommended articles on the bottom of the Article Page */

import React from 'react';
import { compose } from 'redux';
import injectSheet from 'react-jss';
import { Row, Col } from 'react-bootstrap/lib';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ArticleRecommendation } from './summaries';

const RecommendedRowQuery = gql`
  query RecommendedRowQuery($section_id: ID!, $limit: Int!) {
    topRankedArticles(section_id: $section_id, limit: $limit, has_media: true) {
      id
      title
      slug
      preview
      created_at
      contributors {
        slug
        first_name
        last_name
      }
      media {
        attachment_url
      }
      section {
        id
        name
        permalink
      }
    }
  }
`;

const styles = {
  RecommendedRow: {
    padding: 0,
    marginBottom: '24px',
  },
  title: {
    border: '1px solid #ddd',
    borderStyle: 'solid none',
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '26px',
    marginBottom: '24px',
    padding: '12px 0 13px',
    textAlign: 'center',
  },
  recommendedList: {
    borderBottom: 'solid 1px #ddd',
    padding: '0 0 24px',
    '& > .row > div': {
      padding: '18px !important',
    },
    '& > .row > div:first-child': {
      paddingLeft: '0 !important',
    },
    '& > .row > div:last-child': {
      paddingRight: '0 !important',
    },
  },
  '@media (max-width: 991px)': {
    RecommendedRow: {
      padding: '0 10%',
    },
  },
  '@media (max-width: 767px)': {
    RecommendedRow: {
      padding: '0 2%',
    },
    recommendedList: {
      '& > .row > div': {
        padding: '0px !important',
        marginBottom: '38px',
      },
    },
  },
};

function RecommendedRow({
  classes,
  data,
  match: { params: { article_slug } },
}) {
  if (data.loading) {
    return null;
  }

  const articles = data.topRankedArticles.filter(
    article => article.slug !== article_slug,
  );

  return (
    <Row className={classes.RecommendedRow}>
      <Col xs={12} sm={12} md={12} lg={12} className={classes.title}>
        Recommended
      </Col>
      <Col xs={12} sm={12} md={12} lg={12} className={classes.recommendedList}>
        <Row>
          {articles
            .slice(0, 2)
            .map(article => (
              <ArticleRecommendation key={article.id} article={article} />
            ))}
        </Row>
        <Row>
          {articles
            .slice(2, 4)
            .map(article => (
              <ArticleRecommendation key={article.id} article={article} />
            ))}
        </Row>
      </Col>
    </Row>
  );
}

export default compose(
  graphql(RecommendedRowQuery, {
    options: ({ section }) => ({
      variables: {
        section_id: section.id,

        // Though the RecommendedRow only displays four articles, to account
        // for the case that one of the recommended articles includes the
        // current article, we want a backup.
        limit: 5,
      },
    }),
  }),
  withRouter,
  injectSheet(styles),
)(RecommendedRow);
