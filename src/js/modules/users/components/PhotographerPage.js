import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { createPhotographerArticles } from "../selectors";

const styles = {
  PhotographerPage: {
    marginTop: '50px',
  },
};

const PhotographerPage = ({ classes, role, photographerWithArticles }) => {
  const createPhotographerArticles = () => {
    const articles = photographerWithArticles.articles;
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return (
        <li key={article.id}>
          <Link to={`${sections[ article.sectionSlug ].permalink}/${articleSlug}`}>
            {article.title}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.PhotographerPage}>
      <h1>{photographer.firstName} {photographer.lastName}</h1>
      <p>role: <Link to={`/${role.slug}`}>{role.title}</Link></p>
      <div>
        <p>articles</p>
        <ul>
          {createLinksToArticlesByContributor()}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  photographerWithArticles: getPhotographerWithArticles(state, ownProps),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(PhotographerPage));