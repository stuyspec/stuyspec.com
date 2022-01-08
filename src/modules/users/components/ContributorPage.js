import React from 'react';
import injectSheet from 'react-jss';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Helmet } from 'react-helmet';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { ArticleList } from '../../articles/components';
import { NotFoundPage } from '../../core/components';

const ContributorBySlug = gql`
  query ContributorPageQuery($slug: String!) {
    userBySlug(slug: $slug) {
      first_name
      last_name
      email
      description
      profile_pic_url
      articles {
        id
        slug
        title
        preview
        created_at
        contributors {
          slug
          first_name
          last_name
        }
        section {
          id
          permalink
        }
        media {
          media_type
          title
          attachment_url
        }
      }
    }
  }
`;

const styles = {
  name: {
    color: '#000',
    fontFamily: 'Canela',
    fontSize: '48px',
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: '11px',
    '@media screen and (max-width: 760px)': {
      textAlign: 'center',
    },
  },
  email: {
    color: '#3084df',
    display: 'block',
    fontFamily: 'Minion Pro',
    fontSize: '17px',
    marginBottom: '7px',
    '@media screen and (max-width: 760px)': {
      textAlign: 'center',
    },
  },
  latest: {
    borderTop: '1px solid #000',
    borderBottom: '1px solid #ddd',
    borderStyle: 'solid none',
    color: '#000',
    fontFamily: 'Circular Std',
    fontSize: '13px',
    fontWeight: 300,
    marginBottom: '22px',
    padding: '4px 0px',
  },
  description: {
    fontFamily: 'Minion Pro',
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '26px',
  },
  image: {
    marginBottom: '20px',
    display: 'block',
    margin: '0 auto',
    width: 'auto',
    '@media screen and (max-width: 760px)': {
      transform: 'translate(5%, 0%)',
    },
  },
};

function ContributorPage({ classes, data }) {
  if (data.loading) {
    return null;
  }
  const contributor = data.userBySlug;
  if (contributor === null) {
    return <NotFoundPage />;
  }
  const hasImage = contributor.profile_pic_url !== '';
  return (
    <Grid>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${contributor.first_name} ${contributor.last_name}`}</title>
        <meta />
      </Helmet>
      <Row>
        {hasImage
        && (
        <Col xs={50} sm={3} md={2} lg={2}>
          <img className={classes.image} src={contributor.profile_pic_url} height={120} width={120} alt={`${contributor.first_name} ${contributor.last_name}`} />
        </Col>
        )}
        <Col xs={20} sm={30} md={10} lg={10}>

          <p className={classes.name}>
            {`${contributor.first_name} ${contributor.last_name}`}
          </p>
          <a href={`mailto:${contributor.email}`} className={classes.email}>
            {contributor.email}
          </a>
          <p className={classes.description}>{contributor.description}</p>
        </Col>
      </Row>
      <Row>
        <ArticleList
          articles={contributor.articles}
          label="Latest Articles"
        />
      </Row>
    </Grid>
  );
}

export default graphql(ContributorBySlug, {
  options: ({ match }) => ({
    variables: { slug: match.params.contributor_slug },
  }),
})(injectSheet(styles)(ContributorPage));
