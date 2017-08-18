import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getContributorFromSlug } from "../selectors";
import { getArticlesByContributor } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

const styles = {
  ContributorPage: {
    marginTop: '50px',
  },
};

// TODO: if getArticlesByContributor is not renaned to getContributorArticles
//   in feature/media-module, change it.

const ContributorPage = ({ classes, role, contributor, articles, sections }) => {
  const createContributorArticlesLinks = () => {
    return Object.values(articles).map(article => {
      return (
        <li key={ `contributorArticleListItem${article.id}` }>
          <Link to={ `${sections[ article.sectionSlug ].permalink}/${article.slug}` }>
            { article.title }
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={ classes.ContributorPage }>
      <h1>{ contributor.firstName } { contributor.lastName }</h1>
      <p>role: <Link to={ `/${role.slug}` }>{ role.title }</Link></p>
      <div>
        <p>articles</p>
        <ul>
          { createContributorArticlesLinks() }
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  contributor: getContributorFromSlug(state, ownProps),
  articles: getArticlesByContributor(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(ContributorPage));