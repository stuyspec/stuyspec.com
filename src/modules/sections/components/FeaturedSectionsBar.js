import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: '6px',
    width: '100%',
  },
  sectionListItem: {
    display: 'inline',
    margin: '0px 13px',
  },
  navSearchButton: {
    top: '2px',
    position: 'relative',
  },
  sectionLink: {
    color: '#000',
    fontSize: '1.5rem',
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
      outline: 'none',
    },
  },
};

function FeaturedSectionsBar({
  classes,
  openSubscriptionModal,
  data,
  omitSearch,
}) {
  if (data.loading) {
    return null;
  }
  const { featuredSections } = data;
  return (
    <div className={classes.FeaturedSectionsBar}>
      {featuredSections.map(section => (
        <div key={section.id} className={classes.sectionListItem}>
          <Link to={section.permalink} className={classes.sectionLink}>
            {section.name}
          </Link>
        </div>
      ))}
      <div key={-2} className={classes.sectionListItem}>
        <Link to="/recruitments" className={classes.sectionLink}>
          Recruitments
        </Link>
      </div>
      <div key={-3} className={classes.sectionListItem}>
        <Link to="/spec-games" className={classes.sectionLink}>
          SpecGames
        </Link>
      </div>
      {/*
      <div key={-1} className={classes.sectionListItem}>
        <span onClick={openSubscriptionModal} className={classes.sectionLink}>
          Newsletter
        </span>
      </div> */}
      {!omitSearch && (
        <div key={-3} className={classes.sectionListItem}>
          <Link to="/search" className={classes.sectionLink}>
            <Search className={classes.navSearchButton} />
          </Link>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({ openSubscriptionModal }, dispatch);

export default compose(
  graphql(FeaturedSectionsQuery),
  connect(null, mapDispatchToProps),
  injectSheet(styles),
)(FeaturedSectionsBar);
