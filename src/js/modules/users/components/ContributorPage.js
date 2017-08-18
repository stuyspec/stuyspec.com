import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getContributorFromSlug } from "../selectors";
import { getContributorArticles } from "../../articles/selectors";
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
    border: '1px solid #ddd',
    borderStyle: 'solid none',
    color: '#000',
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
    margin: 0,
  },
};

//   in feature/media-module, change it.
// TODO: if getArticlesByContributor is not renaned to getContributorArticles
const ContributorPage = ({ classes, contributor, articles }) => {
  const createArticleRows = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return <ArticleRow article={ article } key={ articleSlug }/>;
    });
  };
  return (
    <Grid className={ classes.ContributorPage }>
      <Row>
        <Col md={ 9 }>
          <p className={ classes.name }>{ contributor.firstName } { contributor.lastName }</p>
          <img alt={ contributor.lastName }
               className={ classes.profilePicture }
               src={ contributor.url }/>
          <p className={ classes.description }>{ contributor.description }</p>
          <div className={ classes.allWork }>All Work</div>
          { createArticleRows() }
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  contributor: getContributorFromSlug(state, ownProps),
  articles: getContributorArticles(state, ownProps)
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ContributorPage));