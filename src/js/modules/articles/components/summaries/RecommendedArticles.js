import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Row, Col } from "react-bootstrap/lib";

import { getSections } from "../../../sections/selectors";

const styles = {
  RecommendedArticles: {
    borderBottom: '1px solid #ddd',
    padding: '0 0 14px 14px',
  },
  label: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #ddd',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    padding: '4px 0',
  },
  title: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: '2px',
    '&:active': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
    '&:hover': {
      color: '#000',
    },
  },
  focus: {
    color: '#000',
    fontFamily: 'Minion Pro',
    fontSize: '14px',
    lineHeight: 1.21,
  },
  articleList: {
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    margin: 0,
    paddingLeft: '33px',
  },
  articleListItem: {
    padding: '12px 0',
    '&:not(:last-child)': {
      borderBottom: 'solid 1px #ddd',
    },
    '&::before': {
      marginLeft: '-2em',
      width: '2em',
    }
  }
};

const RecommendedArticles = ({ classes, articles, sections }) => {
  return (
    <div className={ classes.RecommendedArticles }>
      <p className={ classes.label }>Recommended</p>
      <ol className={ classes.articleList }>
        {
          articles.map(article => {
            const section = Object.values(sections).find(section => {
              return section.id === article.sectionId;
            });
            return (
              <li className={ classes.articleListItem }
                  key={ article.id }>
                <Link className={ classes.title }
                      to={ `${section.permalink}/${article.slug}` }>
                  { article.title }
                </Link>
                <p className={ classes.focus }>Unfortunately, all good things
                  must come to an end. We came into Stuyvesant last September,
                  saved from the unstructured summer.</p>
              </li>
            );
          })
        }
      </ol>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: getSections(state),
});

export default connect(
  mapStateToProps
)(injectSheet(styles)(RecommendedArticles));