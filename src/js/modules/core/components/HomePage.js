import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import articles from "../../articles";
import sections from "../../sections";
import users from "../../users";
import { fetchArticles} from "../../articles/actions"

const styles = {
  HomePage: {}
};

const HomePage = ({ classes, sections, articles, users, userRoles, fetchArticles }) => {
  const linkToAllSections = () => {
    return Object.keys(sections).map((sectionSlug, index) => {
      return (
        <li key={`sectionLink${index}`}>
          <Link to={sections[ sectionSlug ].permalink}>
            {sections[ sectionSlug ].name}
          </Link>
        </li>
      );
    });
  };
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
  const handleFetch = () => {
    fetchArticles();
  };
  return (
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      <button onClick={handleFetch}>Articles </button>
      <h2>Sections</h2>
      <ul>
        {linkToAllSections()}
      </ul>
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
  articles: articles.selectors.getArticles(state),
  sections: sections.selectors.getSections(state),
  users: users.selectors.getUsers(state),
  userRoles: users.selectors.getUserRoles(state),
});

//TODO: Make this mapDispatchToProps actually do something
const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchArticles: fetchArticles}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
