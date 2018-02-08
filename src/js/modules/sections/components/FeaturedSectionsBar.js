import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import humps from 'humps';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import { Search } from '../../core/icons';
import { openSubscriptionModal } from '../../accounts/actions';

const FeaturedSectionsQuery = gql`
  query FeaturedSectionsQuery {
    featuredSections {
      id
      permalink
      name
    }
  }
`;

const styles = {
  FeaturedSectionsBar: {
    fontFamily: 'Circular Std',
    listStyleType: 'none',
    padding: '6px',
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 13px',
  },
  navSearchButton: {
    top: '-1px',
    position: 'relative',
  },
  sectionLink: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 300,
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    '&:active, &:focus': {
      color: '#000',
      textDecoration: 'none',
    },
  },
};

const FeaturedSectionsBar = ({
  classes,
  openSubscriptionModal,
  data,
  omitSearch,
}) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const { featuredSections } = data;
  return (
    <ul className={classes.FeaturedSectionsBar}>
      {featuredSections.map(section => {
        return (
          <li key={section.id} className={classes.sectionListItem}>
            <Link to={section.permalink} className={classes.sectionLink}>
              {section.name}
            </Link>
          </li>
        );
      })}
      <li key={-1} className={classes.sectionListItem}>
        <span onClick={openSubscriptionModal} className={classes.sectionLink}>
          Newsletter
        </span>
      </li>
      {/*
        <li key={-2} className={classes.sectionListItem}>
          <Link to={"/paper"} className={classes.sectionLink}>
            The Paper
          </Link>
        </li>
      */}
      {!omitSearch && (
        <li key={-3} className={classes.sectionListItem}>
          <Link to="/search" className={classes.sectionLink}>
            <Search className={classes.navSearchButton} />
          </Link>
        </li>
      )}
    </ul>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ openSubscriptionModal }, dispatch);
};

export default compose(
  graphql(FeaturedSectionsQuery),
  connect(null, mapDispatchToProps),
  injectSheet(styles),
)(FeaturedSectionsBar);
