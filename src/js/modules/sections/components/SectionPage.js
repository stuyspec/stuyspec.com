import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { getArticlesWithinSectionTree } from '../../articles/selectors';
import { getSections, getDirectChildrenOfSection } from '../../sections/selectors';

const styles = {
  SectionPage: {
    marginTop: '50px',
  }
};

const SectionPage = ({ classes, articlesWithinSectionTree, directSubsectionChildren, section, sections }) => {
  const createLinksToDirectSubsectionChildren = () => {
    return Object.keys(directSubsectionChildren).map((subsectionSlug) => {
      const subsection = directSubsectionChildren[ subsectionSlug ];
      return (
        <li key={`subsectionListItem${subsection.id}`}>
          <Link to={subsection.permalink}>{subsection.name}</Link>
        </li>
      );
    });
  };
  const createLinksToArticlesWithinSectionTree = () => {
    return Object.keys(articlesWithinSectionTree).map((articleSlug) => {
      const article = articlesWithinSectionTree[ articleSlug ];
      return (
        <li key={`articleListItem${article.id}`}>
          <Link to={`${sections[ article.sectionSlug ].permalink}/${article.slug}`}>
            {article.title}
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={classes.SectionPage}>
      <h1>{section.name}</h1>
      <p>description: {section.description}</p>
      <hr/>
      <p>subsections</p>
      <ul>
        {createLinksToDirectSubsectionChildren()}
      </ul>
      <hr/>
      <p>articles</p>
      <ul>
        {createLinksToArticlesWithinSectionTree()}
      </ul>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  articlesWithinSectionTree: getArticlesWithinSectionTree(state, ownProps),
  directSubsectionChildren: getDirectChildrenOfSection(state, ownProps),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null
)(injectSheet(styles)(SectionPage));
