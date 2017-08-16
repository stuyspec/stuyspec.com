import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getIllustratorFromSlug } from "../selectors";
import { getIllustratorArticles } from "../../articles/selectors";
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

const IllustratorPage = ({ classes, illustrator, articles }) => {
  const createArticleRows = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return <ArticleRow key={ article.id } article={ article }/>;
    });
  };
  return (
    <Grid className={ classes.IllustratorPage }>
      <Row>
        <Col md={ 9 }>
          <p className={ classes.name }>{ illustrator.firstName } { illustrator.lastName }</p>
          <img alt={ photographer.lastName }
               className={ classes.profilePicture }
               src={ photographer.url }/>
          <p className={ classes.description }>{ illustrator.description }</p>
          <div className={ classes.allWork }>Illustrations</div>
          { createArticleRows() }
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  illustrator: getIllustratorFromSlug(state, ownProps),
  articles: getIllustratorArticles(state, ownProps),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(IllustratorPage));