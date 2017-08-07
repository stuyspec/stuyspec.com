import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { getUserBySlug } from '../selectors';
import { getArticlesByContributor } from '../../articles/selectors';
import { getSections } from '../../sections/selectors';

const styles = {
  UserPage: {
    marginTop: '50px',
  }
};

/**
 * @param match necessary for retrieving user from slug.
 */
const UserPage = ({ classes, role, user, articlesByContributor, sections, match }) => {
  const linkToArticlesByContributor = () => {
    return Object.keys(articlesByContributor).map((articleSlug, index) => {
      const article = articlesByContributor[ articleSlug ];
      return (
        <li key={`article${index}`}>
          <Link to={`${sections[ article.sectionSlug ].permalink}/${articleSlug}`}>
            {article.title}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.UserPage}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>role: <Link to={`/${role.slug}`}>{role.title}</Link></p>
      <hr/>
      {
        articlesByContributor !== null &&
          <div>
            <p>articles</p>
            <ul>
              {linkToArticlesByContributor()}
            </ul>
          </div>
      }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const userIsContributor = ownProps.role.title === "Contributor";
  return {
    user: getUserBySlug(state, ownProps),
    articlesByContributor: userIsContributor ?
      getArticlesByContributor(state, ownProps) : null,
    sections: getSections(state),
  };
};

export default connect(
  mapStateToProps,
  null
)( injectSheet(styles)(UserPage) );
