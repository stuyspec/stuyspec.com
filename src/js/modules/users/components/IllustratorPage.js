import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getIllustratorWithArticles } from "../selectors";
import { ArticleRow } from "../../articles/components";

const styles = {
  IllustratorPage: {
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

const IllustratorPage = ({ classes, illustratorWithArticles }) => {
  const createIllustratorArticles = () => {
    const articles = illustratorWithArticles.articles;
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return <ArticleRow key={ article.id } article={ article }/>;
    });
  };
  return (
    <Grid className={ classes.IllustratorPage }>
      <Row>
        <Col md={ 9 }>
          <p className={ classes.name }>{ illustratorWithArticles.firstName } { illustratorWithArticles.lastName }</p>
          <img src={ illustratorWithArticles.url } alt={ illustratorWithArticles.id }
               className={ classes.profilePicture }/>
          <p className={ classes.description }>{ illustratorWithArticles.description }</p>
          <div className={ classes.allWork }>Illustrations</div>
          { createIllustratorArticles() }
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  illustratorWithArticles: getIllustratorWithArticles(state, ownProps),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(IllustratorPage));