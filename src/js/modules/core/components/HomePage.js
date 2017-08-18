import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getArticles } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers, getUserRoles } from "../../users/selectors";
import { fetchArticles } from "../../articles/actions";
import { fetchUsers } from "../../users/actions";
import { fetchMedia } from "../../media/actions";

const styles = {
  HomePage: {}
};

const HomePage = ({
                    classes,
                    sections,
                    articles,
                    users,
                    userRoles,
                    fetchArticles,
                    fetchUsers
                  }) => {
  const createArticleLinks = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return (
        <li key={ `articleLink${article.id}` }>
          <Link to={ `${sections[ article.sectionSlug ].permalink}/${article.slug}` }>
            { article.title }
          </Link>
        </li>
      );
    });
  };
  const createContributorLinks = () => {
    return Object.keys(users).map(userSlug => {
      if (userRoles.find(userRole => userRole.userSlug === userSlug &&
          userRole.roleSlug === "contributors")) {
        const contributor = users[ userSlug ]
        return (
          <li key={ `contributorLink${contributor.id}` }>
            <Link to={ `/contributors/${userSlug}` }>
              { `${contributor.firstName} ${contributor.lastName}` }
            </Link>
          </li>
        );
      }
    });
  };
  return (
    <div className={ classes.HomePage }>
      <h1>Home page</h1>
      <button onClick={ fetchArticles }>fetch articles</button>
      <button onClick={ fetchUsers }>fetch users</button>
      <h2>Articles</h2>
      <ul>
        { createArticleLinks() }
      </ul>
      <h2>Contributors</h2>
      <ul>
        { createContributorLinks() }
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
  return bindActionCreators({ fetchArticles, fetchUsers }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
