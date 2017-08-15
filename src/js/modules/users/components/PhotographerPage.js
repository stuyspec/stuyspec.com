import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getPhotographerFromSlug } from "../selectors";
import { getArticlesByContributor } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

const styles = {
  PhotogrpherPage: {
    marginTop: '50px',
  },
};

const PhotographerPage = ({ classes, role, photographer, articles, sections }) => {
  const createLinksToArticlesByContributor = () => {
    return Object.keys(articles).map(articleSlug => {
      const article = articles[ articleSlug ];
      return (
        <li key={`contributorArticleListItem${article.id}`}>
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
  photographer: getPhotographerFromSlug(state, ownProps),
  articles: getArticlesByContributor(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(PhotographerPage));