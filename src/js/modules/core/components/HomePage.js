import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getArticles } from "../../articles/selectors";
import { fetchArticles } from "../../articles/actions";
import { getSections } from "../../sections/selectors";
import { getUsers, getUserRoles } from "../../users/selectors";
import { fetchUsers } from "../../users/actions";

const styles = {
  HomePage: {}
};

const HomePage = ({ classes, sections, articles, users, userRoles, fetchArticles, fetchUsers }) => {
  const createLinksToArticles = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return (
        <li key={ `articleLink${article.id}` }>
          <Link to={ `${sections[ article.sectionSlug ].permalink}/${article.slug}` }>{ article.title }</Link>
        </li>
      );
    });
  };
  const createLinksToContributors = () => {
    return Object.keys(users).map(userSlug => {
      if (userRoles.find(userRole => userRole.userSlug === userSlug &&
          userRole.roleSlug === "contributors")) {
        const contributor = users[ userSlug ]
        return (
          <li key={ `contributorLink${contributor.id}` }>
            <Link to={ `/contributors/${userSlug}` }>
              { contributor.firstName + ' ' + contributor.lastName }
            </Link>
          </li>
        );
      }
    });
  };
  const handleArticlesFetch = () => {
    fetchArticles();
  };
  const handleUsersFetch = () => {
    fetchUsers();
  };
  return (
    <div className={ classes.HomePage }>
      <h1>Home page</h1>
      <button onClick={ handleArticlesFetch }>fetch articles</button>
      <button onClick={ handleUsersFetch }>fetch users</button>
      <h2>Articles</h2>
      <ul>
        { createLinksToArticles() }
      </ul>
      <h2>Contributors</h2>
      <ul>
        { createLinksToContributors() }
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: getArticles(state),
  sections: getSections(state),
  users: getUsers(state),
  userRoles: getUserRoles(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchArticles: fetchArticles,
    fetchUsers: fetchUsers,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
