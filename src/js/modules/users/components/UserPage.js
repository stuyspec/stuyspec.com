import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { getUserBySlug } from '../selectors';
import { getUserArticles } from '../../articles/selectors';
import { getSections } from '../../sections/selectors';

const styles = {
  UserPage: {
    marginTop: '50px',
  }
};

const UserPage = ({ classes, role, user, articles, sections }) => {
  const createArticleListItems = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      let pathToArticle = '/' + article.sectionSlug + '/' + article.slug;
      let section = sections[ article.sectionSlug ];
      while (section.parentSlug !== null) {
        pathToArticle = '/' + section.parentSlug + pathToArticle;
        section = sections[ section.parentSlug ];
      }
      return (
        <li>
          <Link to={pathToArticle}>{article.title}</Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.UserPage}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>role: <Link to={`/${role.slug}`}>{role.title}</Link></p>
      <hr/>
      <p>articles</p>
      <ul>
        {createArticleListItems()}
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: getUserBySlug(state, ownProps),
  articles: getUserArticles(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)( injectSheet(styles)(UserPage) );
