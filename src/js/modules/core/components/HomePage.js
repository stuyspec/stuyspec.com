import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import articles from "../../articles";
import sections from "../../sections";

const styles = {
  HomePage: {}
};

const HomePage = ({ classes, sectionsWithLinks, articles }) => {
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: articles.selectors.getArticles(state),
  sectionsWithLinks: sections.selectors.getSectionsWithLinks(state),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
