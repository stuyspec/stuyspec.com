import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Helmet } from 'react-helmet';
import { toRoman } from 'roman-numerals';

import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import RecommendedRow from './RecommendedRow';
import CommentThread from '../../comments/components/CommentThread';
import NotFoundPage from '../../core/components/NotFoundPage';
import { getArticleFromRequestedSlug, getArticleMedia } from '../selectors';
import { openSubscriptionModal } from '../../accounts/actions';

const styles = {
  description: {
    border: '1px solid #ddd',
    borderStyle: 'solid none', // only top-bottom borders
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    marginBottom: '24px',
    padding: '12px 0 13px',
  },
  subscribe: {
    color: '#3572b7',
    '&:hover, &:focus, &:active': {
      color: '#3572b7',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '@media (max-width: 1199px)': {
    ArticlePage: {
      padding: '0 8%',
    },
  },
  '@media (max-width: 991px)': {
    ArticlePage: {
      padding: 0,
    },
    descriptionRow: {
      padding: '0 10%',
    },
  },
  '@media (max-width: 767px)': {
    descriptionRow: {
      padding: '0 2%',
    },
  },
};

const ArticlePage = ({
  classes,
  article,
  section,
  sections,
  media,
  openSubscriptionModal,
}) => {
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <Grid fluid className={classes.ArticlePage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{article.title}</title>
        <meta />
      </Helmet>
      <ArticleHeader article={article} section={section} />
      <ArticleBody article={article} media={media} />
      <Row className={classes.descriptionRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.description}>
          This article was published in&nbsp;
          <a
            className={classes.subscribe}
            href="https://issuu.com/stuyspectator/docs"
            target="_blank"
          >
            {`Volume ${toRoman(article.volume)}, Issue ${article.issue}`}
          </a>
          .
        </Col>
        <Col xsHidden smHidden md={3} lg={3} />
      </Row>
      <RecommendedRow
        section={section.parentId ? sections[section.parentId] : section}
      />
      <CommentThread article={article} />
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: getArticleFromRequestedSlug(state, ownProps),
  sections: state.sections.sections,
  media: getArticleMedia(state, ownProps),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(ArticlePage),
);
