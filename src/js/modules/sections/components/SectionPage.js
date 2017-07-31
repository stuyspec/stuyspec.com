import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib/';

import articles from '../../articles';

const styles = {
  SectionPage: {
    color: '#000',
  },
  sectionName: {
    width: '1080px',
    height: '43px',
    fontFamily: 'Canela',
    fontSize: '36px',
    fontWeight: '500',
    textAlign: 'left',
    color: '#000000',
    padding: '0px 0px',
    paddingLeft: '0px',
    margin: '0px 0px',
    marginBottom: '11px',
  },
  subsectionLink: {
    listStyleType: 'none',
    margin: '0px',
    paddingLeft: '0px',
    width: '1080px',
    height: '7px',
    fontFamily: 'Circular Std',
    fontSize: '14px',
    textAlign: 'left',
    color: '#000000',
    textTransform: 'uppercase',
  },
  articleList: {
    width: '100%',
    margin: '0px',
  },
  Horizontal: {
    display: 'inline',
    paddingRight: '16px',
    paddingTop: '11px',
    textDecoration: 'none',
  },
  linkColor: {
    color: '#000000',
  },
  eachArticle: {
    listStyleType: 'none',
    paddingLeft: '0px',
    marginLeft: '0px',
    paddingBottom: '14.4px',
    paddingTop: '14px',
  },
  image: {
    width: '256px',
    height: '170.6px',
    align: 'left',
    marginLeft: '0px',
    paddingRight: '14px',
  },
  articleTitle: {
    width: '526px',
    height: '15px',
    fontFamily: 'MinionPro',
    fontSize: '26px',
    textAlign: 'left',
    color: '#000000',
    margin: '0px 0px',
    border: '0px 0px',
  },
  articleDescription: {
    width: '526px',
    height: '15px',
    fontFamily: 'MinionPro',
    fontSize: '16px',
    lineHeight: '1.13',
    textAlign: 'left',
    color: '#000000',
    paddingTop: '5px',
    paddingBottom: '0px',
  },
  articleAuthor: {
    width: '242px',
    height: '0px',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#666666',
    textTransform: 'uppercase',
    paddingTop: '9px',
  },
  sectionNameDivider: {
    borderBottom: '2px solid #000000',
    borderTop: '0px',
    paddingTop: '8px',
    marginBottom: '29.6px',
  },
  articleDivider: {
    margin: '0px',
    paddingTop: '14.4',
    paddingBottom: '14',
  }
};

/* TODO: make subsection tree work for any depth
 */

const SectionPage = ({ classes, articles, subsections, section, match, featuredMedia }) => {
  const createSubsectionLinks = () => {
    return Object.keys(subsections).map((key) => {
      const subsection = subsections[ key ];
      return (
        <li key={subsection.id} className={classes.Horizontal}>
          <Link to={match.url + '/' + subsection.slug} className={classes.linkColor}>{subsection.name}</Link>
        </li>
      );
    });
  };
  const createArticleLinks = () => {
    return Object.keys(articles).map((key) => {
      const article = articles[ key ];
      let pathToArticlePage = article.slug;
      // if article is not a direct child of this section but is that of the section's subsection
      if (subsections[ article.sectionSlug ] !== undefined) {
        pathToArticlePage = article.sectionSlug + '/' + article.slug;
      }
      return (
        <div>
        <Row key={article.id} className={classes.eachArticle}>
          <Col md={3} lg={3}>
            <figure>
              <img src={featuredMedia.url} className={classes.image}/>
            </figure>
          </Col>
          <Col md={6} lg={6}>
            <Link to={match.url + '/' + pathToArticlePage} className={classes.articleTitle}>{article.title}</Link>
            <p className={classes.articleDescription}>Cathy plays a horizontal guitara.</p>
            <p className={classes.articleAuthor}>Jason Kao</p>
          </Col>
        </Row>
        <hr className={classes.articleDivider}/>
        </div>
      );
    });
  };
  return (
    <div className={classes.SectionPage}>
      <h1 className={classes.sectionName}>{section.name}</h1>
      {/* <p>description: {section.description}</p> */}
      <ul className={classes.subsectionLink}>
        {createSubsectionLinks()}
      </ul>
      <hr className={classes.sectionNameDivider}/>
      <Grid className={classes.articleList}>
        {createArticleLinks()}
      </Grid>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  articles: articles.selectors.getArticlesWithinSection(state, ownProps),
  featuredMedia: {
    url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
    caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
    type: 'Photograph',
    credits: 'Ting Ting',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SectionPage));
