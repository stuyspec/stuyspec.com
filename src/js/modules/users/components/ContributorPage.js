import React from "react";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import { ArticleList } from "../../articles/components";
import { NotFoundPage } from "../../core/components";

const ContributorBySlug = gql`
  query ContributorPageQuery($slug: String!) {
    userBySlug(slug: $slug) {
      first_name
      last_name
      email
      description
      articles {
        id
        slug
        title
        summary
        contributors {
          slug
          first_name
          last_name
        }
        section {
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
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  email: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    marginBottom: "7px",
  },
  latest: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    borderStyle: "solid none",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    marginBottom: "22px",
    padding: "4px 0px",
  },
  description: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "26px",
  },
};

const ContributorPage = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  data = humps.camelizeKeys(data);
  const contributor = data.userBySlug;
  if (contributor === null) {
    return <NotFoundPage />;
  }
  return (
    <Grid >
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${contributor.firstName} ${contributor.lastName}`}</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {`${contributor.firstName} ${contributor.lastName}`}
          </p>
          <a href={`mailto:${contributor.email}`} className={classes.email}>
            {contributor.email}
          </a>
          <p className={classes.description}>{contributor.description}</p>
          <div className={classes.latest}>Latest</div>
          <ArticleList articles={contributor.articles} />
        </Col>
      </Row>
    </Grid>
  );
};

export default graphql(ContributorBySlug, {
  options: ({ match }) => ({
    variables: { slug: match.params.contributor_slug },
  }),
})(injectSheet(styles)(ContributorPage));
