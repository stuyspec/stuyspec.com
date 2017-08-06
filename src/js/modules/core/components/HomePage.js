import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import articles from "../../articles";
import sections from "../../sections";
import users from "../../users";

const styles = {
  HomePage: {}
};

const HomePage = ({ classes, sectionsWithLinks, articles, users }) => {
  const createSectionListItems = () => {
    return Object.keys(sectionsWithLinks).map((key) => {
      return (
        <li key={key}>
          <Link to={sectionsWithLinks[ key ].pathToSectionPage}>{sectionsWithLinks[ key ].name}</Link>
        </li>
      );
    });
  };
  const createArticleListItems = () => {
    return Object.keys(articles).map((key) => {
      const article = articles[ key ];
      const pathToArticlePage = `${sectionsWithLinks[ article.sectionSlug ]
        .pathToSectionPage}/${key}`;
      return (
        <li key={key}>
          <Link to={pathToArticlePage}>{article.title}</Link>
        </li>
      );
    });
  };
  const createContributorListItems = () => {
    return Object.keys(users).map((userSlug) => {
      return (
        <li key={userSlug}>
          <Link to={`/contributors/${userSlug}`}>{users[ userSlug ].lastName}</Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      <h2>Sections</h2>
      <ul>
        {createSectionListItems()}
      </ul>
      <h2>Articles</h2>
      <ul>
        {createArticleListItems()}
      </ul>
      <h2>Contributors</h2>
      <ul>
        {createContributorListItems()}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({

  //TODO: why is state undefined in users?
  articles: articles.selectors.getArticles(state),
  sectionsWithLinks: sections.selectors.getSectionsWithLinks(state),
  users: users.selectors.getUsers(state),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
