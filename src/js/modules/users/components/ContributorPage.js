import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getContributorFromSlug } from "../selectors";
import { getArticlesByContributor } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";
import { ArticleRow } from "../../articles/components";

const styles = {
  ContributorPage: {
    marginTop: '62px',
  },
  name: {
    color: '#000000',
    fontFamily: 'Canela',
    fontSize: '36px',
    fontWeight: '500',
    margin: '0px',
    textAlign: 'center',
  },
  allWork: {
    borderBottom: '1px solid #dddddd',
    borderTop: '1px solid #dddddd',
    color: '#000000',
    fontFamily: 'Circular Std',
    fontSize: '14px',
    fontWeight: '300',
    margin: '34px 0px 14px',
    padding: '8px 0px 7px',
  },
  profilePicture: {
    display: 'block',
    height: '302px',
    margin: '18px auto 12px',
    width: '256px',
  },
  description: {
    color: '#000000',
    fontFamily: 'Minion Pro',
    fontSize: '18px',
    lineHeight: '1.28',
    margin: '0px'
  },
};

const ContributorPage = ({ classes, contributor, articles, sections, featuredMedia }) => {
  const createArticleList = () => {
    return Object.keys(articles).map((articleSlug) => {
      const article = articles[ articleSlug ];
      return <ArticleRow article={article}
                         featuredMedia={featuredMedia}
                         key={articleSlug}
                         section={sections[ article.sectionSlug ]}/>
    });
  };
  return (
    <Grid className={classes.ContributorPage}>
      <Row>
        <Col md={9}>
          <p className={classes.name}>{contributor.firstName} {contributor.lastName}</p>
          <img src={contributor.url} alt={contributor.id} className={classes.profilePicture}/>
          <p className={classes.description}>{contributor.description}</p>
          <div className={classes.allWork}>All Work</div>
          {createArticleList()}
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  contributor: getContributorFromSlug(state, ownProps),
  articles: getArticlesByContributor(state, ownProps),
  sections: getSections(state),
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ContributorPage));