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
  const linkToAllArticles = () => {
    return Object.keys(articles).map((articleSlug, index) => {
      const article = articles[ articleSlug ];
      return (
        <li key={`articleLink${index}`}>
          <Link to={`${sections[ article.sectionSlug ].permalink}/${article.slug}`}>{article.title}</Link>
        </li>
      );
    });
  };
  const linkToAllContributors = () => {
    return Object.keys(users).map((userSlug, index) => {
      if (userRoles.find(userRole => userRole.userSlug === userSlug &&
          userRole.roleSlug === "contributors")) {
        const contributor = users[ userSlug ]
        return (
          <li key={`contributorLink${index}`}>
            <Link to={`/contributors/${userSlug}`}>
              {contributor.firstName + ' ' + contributor.lastName}
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
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      <Link to="/about">Link</Link>
      <button onClick={handleArticlesFetch}>fetch articles</button>
      <button onClick={handleUsersFetch}>fetch users</button>
      <h2>Articles</h2>
      <ul>
        {linkToAllArticles()}
      </ul>
      <h2>Contributors</h2>
      <ul>
        {linkToAllContributors()}
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
